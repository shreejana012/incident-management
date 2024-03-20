import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

function App () {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}


export default App
