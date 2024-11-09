module.exports = {
  jwtSecret: process.env.JWT_SECRET || "i_am_secret",
  jwtSession: {
    session: false,
  },
};
