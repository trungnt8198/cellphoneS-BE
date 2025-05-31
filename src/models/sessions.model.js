const db = require("@/configs/db");

exports.findById = async (id) => {
  const [sessions] = await db.query(`select * from sessions where id = ?`, [
    id,
  ]);
  return sessions[0];
};

exports.create = async (id) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  const expiresAt = expires.toISOString().slice(0, 19).replace("T", " ");
  const query = `insert into sessions (id, expires_at) values (?, ?)`;
  await db.query(query, [id, expiresAt]);
  const session = await this.findById(id);
  return session;
};

exports.update = async (id, data) => {
  const query = `UPDATE sessions SET data = ? WHERE id = ?`;
  await db.query(query, [data, id]);
};

exports.remove = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  await db.query(query, [id]);
};
