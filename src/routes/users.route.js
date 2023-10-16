const usersRouter = require('express').Router();
const UsersController = require('../controllers/v1/users.controller');

/**
 * @openapi
 * /tenants/:accountId:
 *   get:
 *     description: Return all tenants for account.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error on client side.
  * /executables/:tenantId:
 *   get:
 *     description: Return all executables for tenant.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error on client side.
 *     parameters:
 *         name: accountId
 *         in: path
 *         description: Tenant ID
 *         required: true
 */
usersRouter.get('/tenants/:accountId', UsersController.getTenantsForAccount);
usersRouter.get('/executables/:tenantId', UsersController.getExecutablesForTenant);
usersRouter.post('/', UsersController.scheduleExecutable);

module.exports = usersRouter;
