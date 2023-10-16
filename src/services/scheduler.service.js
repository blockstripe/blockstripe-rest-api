const nodeSchedule = require('node-schedule');

// const notifierService = require('./notifier.service');
const nearWalletService = require('./near-wallet.service');

const RULE_DEFAULT = '0 * * * *';

class SchedulerService {
    blockStripeCoreContract;
    executionQueue;

    constructor() {
        nearWalletService.getContract().then(instance => {
            this.blockStripeCoreContract = instance;
        });
        this.executionQueue = {};
    }

    transformRecurrenceRule(configsAsString) {
        let { dateOrMonth, frequency } = configsAsString;
        let dayOfMonth = 0;
        let dayOfWeek = 0;
        let monthOfYear = 0;

        if (dateOrMonth === undefined) {
            dateOrMonth = 0;
        }

        if (frequency === 'week') {
            monthOfYear = '*';
            dayOfWeek = (dateOrMonth === 0 ? 1 : dateOrMonth);
        } else if (frequency === 'month') {
            dayOfMonth = dateOrMonth;
            monthOfYear = '*';
        } else {
            dayOfMonth = dateOrMonth;
        }

        const rule = new nodeSchedule.RecurrenceRule(RULE_DEFAULT);

        return rule;
    }

    async onExecuteTriggered(executableId, ownerAccountId) {
        try {
            const txOutcome = await this.blockStripeCoreContract.trigger_tenant_executable({
                tenant_executable_id: executableId
            });
            const tenantId = await this.blockStripeCoreContract.get_tenant_id_for_account({
                tenant_account_id: ownerAccountId,
            });
            const tenantEmail = await this.blockStripeCoreContract.get_email_for_account({
                tenant_account_id: ownerAccountId,
            });

            // Temporary solution due to luck of time.
            console.log('Executable triggered: ', txOutcome, tenantId, tenantEmail);

            // notifierService.notify(tenantEmail, tenantId, null, JSON.stringify(txOutcome));
        } catch (err) {
            console.error('Opps, some error on the way', err.message);
        }
    }

    schedule(name, recurrence, executionCallback) {
        this.executionQueue[name] = nodeSchedule.scheduleJob(name, recurrence, executionCallback);
    }

    cancel(nameOfExecution) {
        if (this.executionQueue[nameOfExecution]) {
            this.executionQueue[nameOfExecution].cancel();
        }
    }
}

module.exports = new SchedulerService();
