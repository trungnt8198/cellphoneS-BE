const sessionsService = require("@/services/sessions.service");

async function handleSession(req, res, next) {
  let sid = req.cookies.sid;
  let session = sid && (await sessionsService.getById(sid));
  if (!session) {
    sid = crypto.randomUUID();
    session = await sessionsService.create(sid);
    res.set(
      "Set-Cookie",
      `sid=${sid}; path=/; expires=${session.expires_at}; httpOnly; secure;`
    );
  }

  const sessionData = JSON.parse(session.data ?? null) || {};

  res.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    async set(key, value) {
      sessionData[key] = value;
      await sessionsService.update(sid, JSON.stringify(sessionData));
    },
  };
  next();
}

module.exports = handleSession;
