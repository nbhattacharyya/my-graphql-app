import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
import createClient from "graphql-request"
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Button } from './components/ui/button'

const API_URL = '';
const API_KEY = '';

// Send a GraphQL Document to the server for execution
const graphqlClient = createClient({
  url: API_URL,
  requestHeaders: {
    'x-api-key': API_KEY
  }
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
