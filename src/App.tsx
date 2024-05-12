import './App.css';
import Journaling from './pages/Journaling';
import Landing from './pages/Landing';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/journaling" element={<Journaling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
