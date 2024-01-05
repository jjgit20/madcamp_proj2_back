import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTable1704421622438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tb_users",
        columns: [
          { name: "userId", type: "bigint", isPrimary: true },
          { name: "password", type: "string", isPrimary: true },
          { name: "firstName", type: "string", isPrimary: true },
          { name: "lastName", type: "string", isPrimary: true },
          { name: "phone", type: "string", isPrimary: true },
          { name: "email", type: "string", isPrimary: true },
          { name: "image", type: "string", isPrimary: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
