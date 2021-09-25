import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1622299665807 implements MigrationInterface {
    name = 'createPostsTable1622299665807';

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query('DROP TABLE posts');
    }
}
