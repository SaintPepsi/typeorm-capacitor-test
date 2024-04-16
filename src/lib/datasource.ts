import { UserEntity } from "$lib/entity/UserEntity";
import { InitialUserEntity0000000000001 } from "$lib/migrations/InitialUserEntity0000000000001";
import sqliteParams from "$lib/sqliteparams";
import { DataSource } from "typeorm";

export const capacitorDataSource = new DataSource({
    name: 'userConnection',
    type: "capacitor",
    driver: sqliteParams.connection,
    database: "TYPEORM_CAPACITOR_TEST",
    mode: 'no-encryption',
    logging: true,
    entities: [UserEntity],
    synchronize: false,
    subscribers: [],
    migrations: [InitialUserEntity0000000000001],
    migrationsRun: false
})