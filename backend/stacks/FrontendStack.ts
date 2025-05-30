import { StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function Frontend({ stack, app}: StackContext) {
    const { api } = use(API);
    const site = new StaticSite(stack, 'Frontend', {
        path: "../frontend",
        buildOutput: "dist",
        environment: {
            VITE_APP_GRAPHQL_URL: api.url,
            VITE_APP_API_KEY: api.cdk.graphqlApi.apiKey || ''
        }
    });

    stack.addOutputs({
        FrontendUrl: site.url
    })
}