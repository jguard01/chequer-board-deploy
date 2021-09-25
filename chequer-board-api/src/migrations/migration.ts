import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1622299665806 implements MigrationInterface {
    name = 'Migration1622299665806';
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

        await queryRunner.query(`CREATE TABLE posts
                                 (
                                     post_id   INT AUTO_INCREMENT primary key NOT NULL,
                                     created_at TIMESTAMP NOT NULL DEFAULT now(),
                                     updated_at TIMESTAMP NOT NULL DEFAULT now(),
                                     title  VARCHAR(100),
                                     description  TEXT,
                                     created_by  VARCHAR(50),
                                     views      INT,
                                     deleted      INT,
                                     FOREIGN KEY(created_by)
                                     REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT
                                 )`);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users');
        await queryRunner.query('DROP TABLE posts');
    }
}
