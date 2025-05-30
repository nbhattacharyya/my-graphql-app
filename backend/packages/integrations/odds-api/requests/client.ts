import axios from 'axios';
import * as configs from '../configs'

axios.defaults.baseURL = configs.ODDS_API_URL

export const getSports = () => {
    return axios.get(`/v4/sports?apiKey=${configs.ODDS_API_KEY}`);
}

export const getGames = (sport: string, startTimestamp: any, endTimestamp: any) => {
    return axios.get(`/v4/sports/${sport}/events?apiKey=${configs.ODDS_API_KEY}&commenceTimeFrom=${startTimestamp}&commenceTimeTo=${endTimestamp}`);
}