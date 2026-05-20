import React from 'react'
import { RouterProvider, useRoutes } from 'react-router-dom'
import { routes } from './routes'
const App = () => {
  return (
   <RouterProvider router={routes}/>
  )
}

export default App