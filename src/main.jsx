import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error.jsx'
import Home from './components/home.jsx'
import Customer from './components/customer.jsx'
import Training from './components/training.jsx'
import Charts from './components/Charts.jsx'
import Calendar from './components/Calendar.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customer",
        element: <Customer />
      },
      {
        path: "training",
        element: <Training />
      },
      {
        path: "calendar",
        element: <Calendar />
      },
      {
        path: "charts",
        element: <Charts />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
