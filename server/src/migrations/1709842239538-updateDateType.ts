import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateType1709842239538 implements MigrationInterface {
    name = 'UpdateDateType1709842239538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "startDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "endDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "endDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectManagerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe" FOREIGN KEY ("projectManagerId") REFERENCES "project_manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectManagerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe" FOREIGN KEY ("projectManagerId") REFERENCES "project_manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "startDate"`);
    }

}
