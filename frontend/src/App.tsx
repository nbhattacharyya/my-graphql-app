
import './App.css'
import { useState, useEffect } from 'react'
import { GraphQLClient } from "graphql-request"

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await graphqlClient.request<{ listGamesToday: Game[] }>(LIST_GAMES_QUERY);
        setGames(data.listGamesToday);
      } catch (err: any) {
        console.error('Error fetching games: ', err);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <h1 className='text-4xl font-bold text-center mb-8'>Today's Games</h1>
      <div>
        {games.map(game => (
          <div key={game.id} className="border p-4 mb-2">
            {game.homeTeam} vs {game.awayTeam} - {game.sport}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
