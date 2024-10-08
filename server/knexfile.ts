// Update with your config settings.

export default {
	client: "pg",
	connection: process.env.DATABASE_URL,
	useNullAsDefault: true,
	migrations: {
		extension: "ts",
		directory: "migrations",
		tableName: "knex_migrations",
	},
	seeds: {
		extension: "ts",
		directory: "seeds",
	},
};
