import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { ConfigsStack } from "./stacks/ConfigsStack";

export default {
  config(_input) {
    return {
      name: "my-graphql-app-backend",
      region: "us-east-1",
      stage: 'neel' //TODO: set it as a key
    };
  },
  stacks(app) {
    app.stack(ConfigsStack);
    app.stack(API);
  }
} satisfies SSTConfig;