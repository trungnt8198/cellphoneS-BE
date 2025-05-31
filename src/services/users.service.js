const usersModel = require("@/models/users.model");
class UsersService {
  async getAll() {
    const users = await usersModel.findAll();
    return users;
  }

  async getById(id) {
    const user = await usersModel.findById(id);
    return user;
  }

  async create(data) {
    const user = await usersModel.create(data);
    return user;
  }

  async update(id, data) {
    const user = await usersModel.update(id, data);
    return user;
  }

  async remove(id) {
    const user = await usersModel.remove(id);
    return user;
  }

  async isExistUsername(username) {
    const result = await usersModel.isExistUsername(username);
    return result;
  }

  async isExistEmail(username) {
    const result = await usersModel.isExistEmail(username);
    return result;
  }

  async isExistPhone(username) {
    const result = await usersModel.isExistPhone(username);
    return result;
  }

  async isExistUsernameExceptId(username, id) {
    const result = await usersModel.isExistUsernameExceptId(username, id);
    return result;
  }

  async isExistEmailExceptId(email, id) {
    const result = await usersModel.isExistEmailExceptId(email, id);
    return result;
  }

  async isExistPhoneExceptId(phone, id) {
    const result = await usersModel.isExistPhoneExceptId(phone, id);
    return result;
  }
}

module.exports = new UsersService();
