import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnValue1747110574251 implements MigrationInterface {
    name = 'ChangeColumnValue1747110574251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" ADD "unitPrice" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "inventory-schema"."stocks" ADD "unitPrice" integer NOT NULL`);
    }

}
