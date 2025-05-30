import { StackContext, Function, use, AppSyncApi } from "sst/constructs";
import { ConfigsStack } from "./ConfigsStack";
import { AuthorizationType } from "aws-cdk-lib/aws-appsync";

export function API({ stack, app }: StackContext) {

    const { ODDS_API_KEY, ODDS_API_URL } = use(ConfigsStack);

    // Lambda definition for fetching today's games via the Odds API
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

    // AppSync GraphQL API Definition
    const api = new AppSyncApi(stack, 'MyGraphQLApi', {
        schema: "graphql/schema.graphql",
        // Link defined lambda
        dataSources: {
            GamesLambdaDS: {
                type: 'function',
                function: fetchGamesLambda
            }
        },
        // map graphql query to the DS
        resolvers: {
            "Query listGamesToday": "GamesLambdaDS"
        },
        cdk: {
            graphqlApi: {
                authorizationConfig: {
                    defaultAuthorization: {
                        authorizationType: AuthorizationType.API_KEY
                    }
                }
            }
        }
    })
    
    stack.addOutputs({
        ApiEndpoint: api.url,
        ApiKey: api.cdk.graphqlApi.apiKey || "No API Key Found"
    });
    
    return {
        api
    }
}