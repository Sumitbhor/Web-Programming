function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

function requireShopkeeper(req, res, next) {
  if (!req.session || !req.session.userId || req.session.role !== 'shopkeeper') {
    req.session.error = 'Shopkeeper access only.';
    return res.redirect('/login');
  }
  next();
}

function requireCustomer(req, res, next) {
  if (!req.session || !req.session.userId || req.session.role !== 'customer') {
    req.session.error = 'Customer access only.';
    return res.redirect('/login');
  }
  next();
}

function attachUser(req, res, next) {
  res.locals.user = req.session?.user || null;
  res.locals.role = req.session?.role || null;
  res.locals.success = req.session?.success || null;
  res.locals.error = req.session?.error || null;
  if (req.session) {
    delete req.session.success;
    delete req.session.error;
  }
  next();
}

module.exports = { requireAuth, requireShopkeeper, requireCustomer, attachUser };
