const { keyStores } = require('near-api-js');
const homedir = require("os").homedir();
require('dotenv');

const keyStorePath = require("path").join(homedir, ".near-credentials");
const logsFilePath = require("path").join(__dirname + "/../", "log-tail");

const accountConfigs = {
    keyStore: new keyStores.UnencryptedFileSystemKeyStore(keyStorePath),
    deployerAccount: process.env.DEPLOYER_ACCOUNT,
    deployedContract: process.env.CONTRACT_NAME,
    deployedContractMethods: {
        write: ['trigger_tenant_executable'],
        readable: ['get_tenant_id_for_account', 'get_email_for_account'],
    }
};

const nearConfigs = {
    nodeUrl: {
        testnet: "https://rpc.testnet.near.org",
        mainnet: "https://rpc.mainnet.near.org",
    },
};

module.exports = {
    accountConfigs,
    nearConfigs,
    logsFilePath,
};
