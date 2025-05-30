import * as oddsAPI from '../../packages/integrations/odds-api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface Game {
    id: string,
    homeTeam: string,
    awayTeam: string,
    datetime: string
}

export const handler = async (event: any) => {

    try {
        
        // Fetch in-season sports
        const currentMonth = dayjs().month();
        const inSeasonSports = Object.entries(oddsAPI.sportSeasonMonths)
                                        .filter(([, months]) => months.includes(currentMonth))
                                        .map(([sport]) => sport);
        
        let rawGames: any[] = [];
        for (let sport of inSeasonSports) {
            const sportKey = oddsAPI.SPORTS_KEY_MAP[sport];
            if (!sportKey) {
                console.warn(`Invalid in-season sport: ${sport} - skipping.`);
                return { error: 'Invalid sport' };
            }
            const start = dayjs().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const end= dayjs().utc().endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const rawGamesList = await oddsAPI.getGames(sportKey, start, end);
            rawGames.push(rawGamesList?.data);
        }

        const transformGames: Game[] = rawGames.map((rawGame: any) => ({
            id: rawGame.id,
            homeTeam: rawGame.home_team,
            awayTeam: rawGame.away_team,
            datetime: rawGame.commence_time
        }));
        return transformGames;
    } catch (error) {
        console.error("Error in fetchGamesLambda: ", error);
        throw new Error(`Failed to fetch games: ${error instanceof Error ? error.message : String(error)}`);
    }
}