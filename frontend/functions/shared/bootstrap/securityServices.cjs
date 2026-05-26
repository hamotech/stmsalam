module.exports = {
  appCheckGuard: (deps) =>
    require('../security/appCheckGuard.cjs')({
      HttpsError: deps.HttpsError,
    }),
};

