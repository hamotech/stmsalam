module.exports = {
  rateLimiter: (deps) => require('../rateLimiter.cjs')({ admin: deps.admin }),
  idempotencyService: (deps) => require('../idempotencyService.cjs')({ admin: deps.admin }),
};

