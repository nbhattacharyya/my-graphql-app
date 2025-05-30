
import './App.css'
import { useState, useEffect, use } from 'react'
import { GraphQLClient } from "graphql-request"
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Button } from './components/ui/button'

const API_URL = import.meta.env.VITE_APP_GRAPHQL_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

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
  date: string;
  sport: string;
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await graphqlClient.request<{ listGamesToday: Game[] }>(LIST_GAMES_QUERY);
        setGames(data.listGamesToday);
      } catch (err: any) {
        console.error('Error fetching games: ', err);
        setError(err.message || 'failed to fetch games');
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const sports = [...new Set(games?.map(game => game.sport))];
  const filteredGames = games?.filter((game: Game) => game.sport === selectedSport);

  return (
    <>
      <div className='container mx-auto p-4 max-w-4xl'>
        <h1 className='text-4xl font-bold text-center mb-8'>Today's Ganes</h1>
      </div>
    </>
  )
}

export default App
