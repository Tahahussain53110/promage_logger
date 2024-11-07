import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1709757632691 implements MigrationInterface {
    name = 'InitialMigration1709757632691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_manager" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_14a9a6e2dbe451fe6f136f440f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('completed', 'started', 'not-started', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'not-started', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, "projectManagerId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_project_managers_project_manager" ("projectId" integer NOT NULL, "projectManagerId" integer NOT NULL, CONSTRAINT "PK_ec0a7a5623fc4f4a7e55a42f59e" PRIMARY KEY ("projectId", "projectManagerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_529dab6ee5dd71a541d81221f7" ON "project_project_managers_project_manager" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_017c3f3e549151414964dd73b5" ON "project_project_managers_project_manager" ("projectManagerId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe" FOREIGN KEY ("projectManagerId") REFERENCES "project_manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_project_managers_project_manager" ADD CONSTRAINT "FK_529dab6ee5dd71a541d81221f7f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_project_managers_project_manager" ADD CONSTRAINT "FK_017c3f3e549151414964dd73b57" FOREIGN KEY ("projectManagerId") REFERENCES "project_manager"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_project_managers_project_manager" DROP CONSTRAINT "FK_017c3f3e549151414964dd73b57"`);
        await queryRunner.query(`ALTER TABLE "project_project_managers_project_manager" DROP CONSTRAINT "FK_529dab6ee5dd71a541d81221f7f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f4c8f963d14f9ece5dd26ee0fbe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_017c3f3e549151414964dd73b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_529dab6ee5dd71a541d81221f7"`);
        await queryRunner.query(`DROP TABLE "project_project_managers_project_manager"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_manager"`);
    }

}
