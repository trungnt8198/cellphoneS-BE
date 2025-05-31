const authModel = require("@/models/auth.model");
class AuthService {
  async login(data) {
    const user = await authModel.login(data);
    return user;
  }

  async register(data) {
    const user = await authModel.register(data);
    return user;
  }
}

module.exports = new AuthService();
