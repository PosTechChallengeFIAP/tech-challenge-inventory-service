import { MigrationInterface, QueryRunner } from "typeorm";

export class InitailStructure1746586278682 implements MigrationInterface {
    name = 'InitailStructure1746586278682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "inventory-schema"."products_category_enum" AS ENUM('FOOD', 'DRINK')`);
        await queryRunner.query(`CREATE TABLE "inventory-schema"."products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "inventory-schema"."products_category_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "inventory-schema"."pocs_category_enum" AS ENUM('RESTAURANT', 'BAR', 'CAFE', 'NIGHTCLUB')`);
        await queryRunner.query(`CREATE TABLE "inventory-schema"."pocs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "inventory-schema"."pocs_category_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a217290d006d1a78992ecdb28ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory-schema"."stocks" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pocId" integer, "productId" integer, CONSTRAINT "PK_b5b1ee4ac914767229337974575" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" ADD CONSTRAINT "FK_d84e801e8254e271355e4e5fd66" FOREIGN KEY ("pocId") REFERENCES "inventory-schema"."pocs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" ADD CONSTRAINT "FK_3024bbca6232c8b6efa3ff51028" FOREIGN KEY ("productId") REFERENCES "inventory-schema"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" DROP CONSTRAINT "FK_3024bbca6232c8b6efa3ff51028"`);
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" DROP CONSTRAINT "FK_d84e801e8254e271355e4e5fd66"`);
        await queryRunner.query(`DROP TABLE "inventory-schema"."stocks"`);
        await queryRunner.query(`DROP TABLE "inventory-schema"."pocs"`);
        await queryRunner.query(`DROP TYPE "inventory-schema"."pocs_category_enum"`);
        await queryRunner.query(`DROP TABLE "inventory-schema"."products"`);
        await queryRunner.query(`DROP TYPE "inventory-schema"."products_category_enum"`);
    }

}
