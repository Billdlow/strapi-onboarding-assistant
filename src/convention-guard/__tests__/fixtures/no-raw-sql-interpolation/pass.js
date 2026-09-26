// fixture: passes no-raw-sql-interpolation — parameterized query
const rows = await db.raw('SELECT * FROM ?? WHERE id = ?', [table, id]);
export {};
