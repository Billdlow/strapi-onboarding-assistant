// fixture: fails no-raw-sql-interpolation — interpolated SQL
const rows = await db.raw(`SELECT * FROM ${table} WHERE id = ${id}`);
export {};
