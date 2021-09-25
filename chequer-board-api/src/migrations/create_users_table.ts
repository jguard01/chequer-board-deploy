import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
    name = 'createUsersTable1622299665807';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE users
                                 (
                                     id        VARCHAR(50),
                                     created_at TIMESTAMP NOT NULL DEFAULT now(),
                                     updated_at TIMESTAMP NOT NULL DEFAULT now(),
                                     fullname  VARCHAR(100),
                                     username  VARCHAR(100),
                                     email      VARCHAR(100),
                                     password   VARCHAR(100),
                                     phone      VARCHAR(100),
                                     CONSTRAINT UC_username UNIQUE (username),
                                     PRIMARY KEY (id)
                                 )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users');
    }
}
