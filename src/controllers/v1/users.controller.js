const schedulerService = require('../../services/scheduler.service');

// TODO: Fetch storage data from smart contract.
class UsersControllerV1 {
    static getTenantsForAccount(_, res) {
        res.json([]).status(200);
    }

    static getExecutablesForTenant(_, res) {
        res.json([]).status(200);
    }

    static scheduleExecutable(req, res) {
        /**
         * req.body
         * @Object {
            * recurrence_rule_config {
                * @Object {
                *     dateOrMonth: Number,
                *     frequency: 'month' | 'year'
                * }
            * }
            * @String tenant_executable_id
         * }
        */

        // Temporary solution due to luck of time.
        const tenant_executable_id = "marianna-dev3.testnet_141892554";
        const owner_account_id = tenant_executable_id.split('_')[0];
        const recurrence_rule_config = "";
        schedulerService.onExecuteTriggered(tenant_executable_id, owner_account_id);

        /*
            const {tenant_executable_id, recurrence_rule_config} = req.body;
            schedulerService.schedule(
                tenant_executable_id,
                schedulerService.transformRecurrenceRule(recurrence_rule_config),
                () => schedulerService.onExecuteTriggered(tenant_executable_id)
            );
        */

        res.json({}).status(201);
    }
}

module.exports = UsersControllerV1;
