import { StackContext, Function } from "sst/constructs";
import * as sst from 'sst/constructs';

export const ConfigsStack = ({stack, app}: StackContext) => {
    const ODDS_API_KEY = new sst.Config.Secret(stack, 'ODDS_API_KEY');
    const ODDS_API_URL = new sst.Config.Secret(stack, 'ODDS_API_URL');

    return {
        ODDS_API_KEY,
        ODDS_API_URL
    };
}