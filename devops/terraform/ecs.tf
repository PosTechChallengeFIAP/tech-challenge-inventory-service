resource "aws_ecs_cluster" "ecs_cluster" {
  name = "tc-inventory-service"
}

resource "aws_ecs_service" "app_service" {
  name                    = "tc-inventory-service"
  cluster                 = aws_ecs_cluster.ecs_cluster.id
  task_definition         = aws_ecs_task_definition.app_task.arn
  desired_count           = 2
  launch_type             = "EC2"
  force_new_deployment    = true

  network_configuration {
    subnets          = [aws_subnet.private.id]
    security_groups  = [data.terraform_remote_state.network.outputs.main_sg_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_target_group.arn
    container_name   = "tc-inventory-service"
    container_port   = 3000
  }

  deployment_controller {
    type = "ECS"
  }

  depends_on = [aws_db_instance.postgres, aws_instance.ecs_instance]
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "tc-inventory-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]

  container_definitions = jsonencode([
    {
      name      = "tc-inventory-service"
      image     = "loadinggreg/tech-challenge-inventory-service:${var.tc_image_tag}"
      cpu       = 256
      memory    = 512
      essential = true

      healthCheck = {
        command = ["CMD-SHELL", "curl -f http://localhost:3000/inventory-api/health/liveness || exit 1"]
        interval = 30
        retries  = 5
        start_period = 60
        timeout = 5
      }

      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/tc-inventory-service"
          "awslogs-region"        = "us-west-2"
          "awslogs-stream-prefix" = "app-ecs"
        }
      }
      
      environment = [
        {
          name  = "POSTGRES_HOST"
          value = aws_db_instance.postgres.address
        },
        {
          name  = "POSTGRES_PORT"
          value = "5432"
        },
        {
          name  = "POSTGRES_USER"
          value = var.db_username
        },
        {
          name  = "POSTGRES_PASS"
          value = var.db_password
        },
        {
          name  = "POSTGRES_DB"
          value = "TechChallengeInventory"
        },
        {
          name  = "POSTGRES_SCHEMA"
          value = "inventory-schema"
        },
        {
          name  = "APP_NAME"
          value = "inventory-api"
        },
        {
          name  = "AWS_ACCESS_KEY_ID"
          value = var.aws_access_key_id
        },
        {
          name  = "AWS_SECRET_ACCESS_KEY"
          value = var.aws_secret_access_key
        },
        {
          name  = "AWS_SESSION_TOKEN"
          value = var.aws_session_token
        },
        {
          name  = "ENVIRONMENT"
          value = "production"
        },
        {
          name = "HOST"
          value = "0.0.0.0"
        }
      ]
    }
  ])
}

resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name = "/ecs/tc-inventory-service"
}