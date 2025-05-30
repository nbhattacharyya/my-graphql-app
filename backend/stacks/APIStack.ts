import { StackContext, Api, EventBus, Function, use } from "sst/constructs";
import { ConfigsStack } from "./ConfigsStack";

export function API({ stack, app }: StackContext) {

    const { ODDS_API_KEY, ODDS_API_URL } = use(ConfigsStack);


    const fetchGamesLambda = new Function(stack, 'fetchGamesLambda', {
        functionName: `${app.stage}-${app.name}-fetch-games`,
        handler: 'services/fetch-games/index.handler',
        timeout: '5 minutes',
        logRetention: 'one_month',
        tracing: 'active',
        bind: [
            ODDS_API_KEY,
            ODDS_API_URL
        ],
        environment: {}
    });
}