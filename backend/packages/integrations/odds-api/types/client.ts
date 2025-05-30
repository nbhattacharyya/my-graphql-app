export const SPORTS_KEY_MAP: Record<string, string> = {
    football: 'americanfootball_nfl',
    basketball: 'basketball_nba',
    baseball: 'baseball_mlb',
    hockey: 'icehockey_nhl'
};

export const sportSeasonMonths: Record<string, number[]> = {
  basketball: [9, 10, 11, 0, 1, 2, 3, 4], // October–May
  baseball: [2, 3, 4, 5, 6, 7, 8, 9],     // March–October
  hockey: [9, 10, 11, 0, 1, 2, 3, 4], // October–May
  football: [8, 9, 10, 11, 1],    // September–February (include SB)
};