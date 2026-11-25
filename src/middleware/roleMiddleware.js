const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Access denied: insufficient role permissions');
    }
    next();
  };
};

const checkStoreScope = (getTargetStoreId) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized');
    }

    if (req.user.role === 'system_admin' || req.user.role === 'driver') {
      return next();
    }

    const targetStoreId =
      typeof getTargetStoreId === 'function'
        ? getTargetStoreId(req)
        : req.body.storeId || req.params.storeId || req.query.storeId;

    if (targetStoreId && req.user.storeId && targetStoreId !== req.user.storeId) {
      res.status(403);
      throw new Error('Access denied: outside your assigned store scope');
    }

    next();
  };
};

module.exports = { authorize, checkStoreScope };