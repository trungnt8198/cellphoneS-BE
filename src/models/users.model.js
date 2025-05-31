const db = require("@/configs/db");

exports.findAll = async () => {
  const [users] = await db.query("select * from users order by id desc");
  return users;
};

exports.findById = async (id) => {
  const [users] = await db.query(
    `select * from users where id = ? or username = ?`,
    [id, id]
  );
  return users[0];
};

exports.create = async (data) => {
  const fields = Object.keys(data);
  const columns = fields.map((field) => `\`${field}\``).join(", ");
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => data[field]);

  const query = `insert into users (${columns}) values (${placeholders})`;
  const [{ insertId }] = await db.query(query, values);
  return {
    id: insertId,
    ...data,
  };
};

exports.update = async (id, data) => {
  const fields = Object.keys(data);
  const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  const query = `UPDATE users SET ${setClause} WHERE id = ?`;
  values.push(id);

  await db.query(query, values);
  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  await db.query(query, [id]);
  return { id };
};

exports.isExistUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  const [users] = await db.query(query, [username]);
  return users.length > 0;
};

exports.isExistUsernameExceptId = async (username, id) => {
  const query = `SELECT * FROM users WHERE username = ? and id != ?`;
  const [users] = await db.query(query, [username, id]);
  return users.length > 0;
};

exports.isExistEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [users] = await db.query(query, [email]);
  return users.length > 0;
};

exports.isExistEmailExceptId = async (email, id) => {
  const query = `SELECT * FROM users WHERE email = ? and id != ?`;
  const [users] = await db.query(query, [email, id]);
  return users.length > 0;
};

exports.isExistPhone = async (phone) => {
  const query = `SELECT * FROM users WHERE phone = ?`;
  const [users] = await db.query(query, [phone]);
  return users.length > 0;
};

exports.isExistPhoneExceptId = async (phone, id) => {
  const query = `SELECT * FROM users WHERE phone = ? and id != ?`;
  const [users] = await db.query(query, [phone, id]);
  return users.length > 0;
};
