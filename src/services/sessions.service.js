const sessionModel = require("@/models/sessions.model");
class SessionsService {
  async getById(id) {
    const session = await sessionModel.findById(id);
    return session;
  }

  async create(id) {
    const sessions = await sessionModel.create(id);
    return sessions;
  }

  async update(id, data) {
    await sessionModel.update(id, data);
  }

  async remove(id) {
    await sessionModel.remove(id);
  }
}

module.exports = new SessionsService();
