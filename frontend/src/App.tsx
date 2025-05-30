
import './App.css'
import { useState, useEffect } from 'react'
import { GraphQLClient } from "graphql-request"
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

const API_URL = import.meta.env.VITE_APP_GRAPHQL_URL || 'https://qkz2xm54ibapzp7y5mw42rgzim.appsync-api.us-east-1.amazonaws.com/graphql'
const API_KEY = import.meta.env.VITE_APP_API_KEY || 'da2-hiqe7tjspfhkfntgq7t46wjnye';
console.log('api url: ', API_URL);

// Send a GraphQL Document to the server for execution
const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'x-api-key': API_KEY
  }
});

const LIST_GAMES_QUERY = `
  query ListSportsGamesToday {
    listGamesToday {
      id
      homeTeam
      awayTeam
      datetime
      sport
    }
  }
`;

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  datetime: string;
  sport: string;
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [activeSport, setActiveSport] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await graphqlClient.request<{ listGamesToday: Game[] }>(LIST_GAMES_QUERY);
        setGames(data.listGamesToday);

        // set first sport as active tab
        if (data.listGamesToday,length > 0) {
          const sports = [...new Set(data.listGamesToday.map(game => game.sport))];
          setActiveSport(sports[0]);
        }
      } catch (err: any) {
        console.error('Error fetching games: ', err);
      }
    }
    fetchGames();
  }, []);

  const sports = [...new Set(games?.map(game => game.sport))];

  return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <h1 className='text-4xl font-bold text-center mb-8'>Today's Games</h1>
        
        {sports.length > 0 ? (
          <Tabs value={activeSport} onValueChange={setActiveSport}>
            <TabsList className="grid grid-cols-4 mb-8">
              {sports.map(sport => (
                <TabsTrigger key={sport} value={sport}>
                  {sport}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sports.map(sport => (
              <TabsContent key={sport} value={sport}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {games
                    .filter(game => game.sport === sport)
                    .map(game => (
                      <Card key={game.id} className="overflow-hidden">
                        <CardHeader className="bg-slate-100 pb-2">
                          <CardTitle className="text-lg font-bold">
                            {game.awayTeam} @ {game.homeTeam}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="text-sm text-gray-500 text-right">
                            {new Date(game.datetime).toLocaleString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-gray-500">Loading games...</div>
        )}
      </div>
  )
}

export default App
