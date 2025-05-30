import { StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function Frontend({ stack, app}: StackContext) {
    const { api } = use(API);
    const site = new StaticSite(stack, 'Frontend', {
        path: "../frontend",
        buildOutput: "dist",
        buildCommand: 'npm run build',
        environment: {
            VITE_APP_GRAPHQL_URL: 'https://qkz2xm54ibapzp7y5mw42rgzim.appsync-api.us-east-1.amazonaws.com/graphql',
            VITE_APP_API_KEY: 'da2-hiqe7tjspfhkfntgq7t46wjnye'
        }
    });

    stack.addOutputs({
        FrontendUrl: site.url
    })
}