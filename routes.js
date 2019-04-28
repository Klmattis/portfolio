const routes = require('next-routes')();

routes
	.add('/underconstruction', '/underconstruction')

	.add('/campaign', '/campaign/campaign')
	.add('/campaign/new', '/campaign/new')
	.add('/campaign/:address', '/campaign/show')
	.add('/campaign/:address/requests', '/campaign/requests/index')
	.add('/campaign/:address/requests/new', '/campaign/requests/new')

	.add('/vitae', '/vitae/vitae');

module.exports = routes;