import * as oddsAPI from '../../packages/integrations/odds-api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

function handleError(e: any, lambdaResponseHeaders: any) {
    return {
        statusCode: 500,
        headers: lambdaResponseHeaders,
        body: JSON.stringify({
            errorMessage: `Error: ${e.message}, ${e.stack}`,
        }),
    };
}

dayjs.extend(utc);

export const handler = async (event: any) => {
    const lambdaResponseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    };

    try {
        
        // Fetch in-season sports
        const currentMonth = dayjs().month();
        const inSeasonSports = Object.entries(oddsAPI.sportSeasonMonths)
                                        .filter(([, months]) => months.includes(currentMonth))
                                        .map(([sport]) => sport);
        
        let games: any[] = [];
        for (let sport of inSeasonSports) {
            const sportKey = oddsAPI.SPORTS_KEY_MAP[sport];
            if (!sportKey) {
                console.error('Invalid in-season sport: ', sport);
                return { error: 'Invalid sport' };
            }
            const start = dayjs().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const end= dayjs().utc().endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const rawGamesList = await oddsAPI.getGames(sportKey, start, end);
            games.push(...games, rawGamesList?.data);
        }
        return games;
    } catch (error) {
        return handleError(error, lambdaResponseHeaders);
    }
}