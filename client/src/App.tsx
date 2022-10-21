import './App.css';
import useAuth from './hooks/useAuth';
//Routes
import Router from './routes'

function App() {
  const { isInitialized } = useAuth();
  return (
    <div className="App">
       {isInitialized ? <Router/> : null}
    </div>
  );
}

export default App;
