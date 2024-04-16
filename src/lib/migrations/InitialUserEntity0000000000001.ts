
import { Table, type MigrationInterface, type QueryRunner } from "typeorm";

const ian = {
    age: 28,
    firstName: "Ian",
    lastName: "Hogers"

}

export class InitialUserEntity0000000000001 implements MigrationInterface {
    name: 'InitialUserEntity0000000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'firstName', type: 'text' },
                { name: 'lastName', type: 'text' },
                { name: 'age', type: 'int' }
            ]
        }), true);
        await queryRunner.manager.createQueryBuilder().insert().into('user').values(ian).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().delete().from('user').where(ian).execute();

    }
}