const db = require("@/configs/db");
const md5 = require("md5");

exports.login = async (data) => {
  const [users] = await db.query(
    "select * from users where email = ? and password = ?",
    [data.email, md5(data.password)]
  );
  return users[0];
};

exports.register = async (data) => {
  await db.query(
    `insert into users (first_name, last_name, email, password) values (?, ?, ?, ?)`,
    [data.first_name, data.last_name, data.email, md5(data.password)]
  );
};
