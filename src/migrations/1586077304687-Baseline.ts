import { MigrationInterface, QueryRunner } from 'typeorm';

export class Baseline1586077304687 implements MigrationInterface {
  name = 'Baseline1586077304687';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" DROP CONSTRAINT "groups_users_group_id_fkey"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" DROP CONSTRAINT "groups_users_user_id_fkey"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."users" DROP CONSTRAINT "users_age_check"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ADD CONSTRAINT "PK_87bc2bfd18a821e0436a70d6813" PRIMARY KEY ("group_id", "user_id")`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "node"."users" DROP COLUMN "age"`, undefined);
    await queryRunner.query(`ALTER TABLE "node"."users" ADD "age" integer NOT NULL`, undefined);
    await queryRunner.query(`ALTER TABLE "node"."groups" DROP COLUMN "permissions"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "node"."groups" ADD "permissions" text array NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ALTER COLUMN "group_id" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ALTER COLUMN "user_id" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5e0ffc791a58a8ab6a8f36d624" ON "node"."groups_users" ("group_id") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_034a40de6a5e2470a57eabd883" ON "node"."groups_users" ("user_id") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."users" ADD CONSTRAINT "CHK_a94c2b064c61ef947efea03673" CHECK ("age" >= 4 "AND" "age" <= 130)`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ADD CONSTRAINT "FK_5e0ffc791a58a8ab6a8f36d6241" FOREIGN KEY ("group_id") REFERENCES "node"."groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ADD CONSTRAINT "FK_034a40de6a5e2470a57eabd8830" FOREIGN KEY ("user_id") REFERENCES "node"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" DROP CONSTRAINT "FK_034a40de6a5e2470a57eabd8830"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" DROP CONSTRAINT "FK_5e0ffc791a58a8ab6a8f36d6241"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."users" DROP CONSTRAINT "CHK_a94c2b064c61ef947efea03673"`,
      undefined,
    );
    await queryRunner.query(`DROP INDEX "node"."IDX_034a40de6a5e2470a57eabd883"`, undefined);
    await queryRunner.query(`DROP INDEX "node"."IDX_5e0ffc791a58a8ab6a8f36d624"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ALTER COLUMN "user_id" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ALTER COLUMN "group_id" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "node"."groups" DROP COLUMN "permissions"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "node"."groups" ADD "permissions" permission array NOT NULL`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "node"."users" DROP COLUMN "age"`, undefined);
    await queryRunner.query(`ALTER TABLE "node"."users" ADD "age" numeric NOT NULL`, undefined);
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" DROP CONSTRAINT "PK_87bc2bfd18a821e0436a70d6813"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."users" ADD CONSTRAINT "users_age_check" CHECK (((age >= (4)::numeric) AND (age <= (130)::numeric)))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ADD CONSTRAINT "groups_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "node"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "node"."groups_users" ADD CONSTRAINT "groups_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "node"."groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
  }
}
