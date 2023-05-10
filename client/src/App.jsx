import './App.css';
import AppRouter from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from './utils/socket';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer theme='dark' hideProgressBar />
    </>
  );
}

export default App;
