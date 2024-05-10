import './App.css';
import Landing from './pages/Landing';
import TableStore from './store/csvStore';

function App() {
  return (
    <TableStore>
        <Landing />
    </TableStore>
  );
}

export default App;
