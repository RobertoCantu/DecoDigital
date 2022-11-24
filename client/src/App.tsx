import './App.css';
import useAuth from './hooks/useAuth';
//Routes
import Router from './routes';

// Compoennts
import LoadingScreen from './components/LoadingScreen';

function App() {
	const { isInitialized } = useAuth();
	return <div>{isInitialized ? <Router /> : <LoadingScreen />}</div>;
}

export default App;
