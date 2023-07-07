import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1664151582109 implements MigrationInterface {
  name = 'default1664151582109'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_job_enum" AS ENUM('delegado', 'agente de policia', 'escrivao de policia', 'coordenador', 'chefe de secao', 'generico', 'comissionado', 'estagiario', 'superintendente')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('administrador', 'gerente', 'basico', 'consulta')`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying, "username" character varying NOT NULL, "job" "public"."user_job_enum" NOT NULL DEFAULT 'generico', "role" "public"."user_role_enum" NOT NULL DEFAULT 'basico', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP,"temporarypassword" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
    await queryRunner.query(`DROP TYPE "public"."user_job_enum"`)
  }
}
