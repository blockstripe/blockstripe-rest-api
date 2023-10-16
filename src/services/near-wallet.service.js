const { Contract, connect } = require('near-api-js');

const { accountConfigs } = require('../app-configs');

class NearWalletService {
    static getConfigs(networkId = 'testnet') {
        return {
            networkId,
            keyStore: accountConfigs.keyStore,
            nodeUrl: `https://rpc.${networkId}.near.org`,
            walletUrl: `https://wallet.${networkId}.near.org`,
            explorerUrl: `https://explorer.${networkId}.near.org`,
        };
    }

    static getAccount(connection) {
        return connection.account(accountConfigs.deployerAccount);
    }

    static async getContract() {
        const connection = await NearWalletService.connect();

        return new Contract(
            await NearWalletService.getAccount(connection),
            accountConfigs.deployedContract,
            {
                viewMethods: accountConfigs.deployedContractMethods.readable,
                changeMethods: accountConfigs.deployedContractMethods.write,
            }
        );
    }

    static connect() {
        return connect(NearWalletService.getConfigs());
    }
}

module.exports = NearWalletService;
