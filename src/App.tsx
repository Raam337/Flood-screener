import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:catchment" element={<LandingPage />} />
          <Route path="/:catchment/:town" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      
    </QueryClientProvider>
  )
}

export default App
