import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750485933748 implements MigrationInterface {
    name = 'Migration1750485933748'
    

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('М', 'Ж')`);
        await queryRunner.query(`
            UPDATE "user"
            SET "gender" = CASE
                WHEN "gender" ilike 'М%' THEN 'М'
                ELSE 'Ж'
            END
        `);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" TYPE "public"."user_gender_enum" USING gender::text::user_gender_enum`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "images" text array, "ownerId" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorite_skills_skill" ("userId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_4591b04d49d8f1279a7f16e459b" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2447914b111b14e825c03b3159" ON "user_favorite_skills_skill" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b27f75d42117b7c773bcd2d779" ON "user_favorite_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wantToLearn"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "favoriteSkills"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_ed56eae08a494394cbab254bf56" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorite_skills_skill" ADD CONSTRAINT "FK_2447914b111b14e825c03b31590" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_skills_skill" ADD CONSTRAINT "FK_b27f75d42117b7c773bcd2d779b" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "gender" TYPE varchar`);
        await queryRunner.query(`
        UPDATE "user"
        SET "gender" = CASE
            WHEN "gender" = 'М' THEN 'Мужской'
            ELSE 'Женский'
        END
        `);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_skills_skill" DROP CONSTRAINT "FK_b27f75d42117b7c773bcd2d779b"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_skills_skill" DROP CONSTRAINT "FK_2447914b111b14e825c03b31590"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_ed56eae08a494394cbab254bf56"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "favoriteSkills" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wantToLearn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "skills" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b27f75d42117b7c773bcd2d779"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2447914b111b14e825c03b3159"`);
        await queryRunner.query(`DROP TABLE "user_favorite_skills_skill"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }
}
