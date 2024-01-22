// knexfile.js
export const development = {
    client: 'pg',
    connection: 'postgresql://postgres:root@123@localhost:5432/FastChatt',
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};
  