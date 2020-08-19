const router = require('express').Router();

// brings in api/index.js
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// prefixes routes in api/index.js with /api
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
