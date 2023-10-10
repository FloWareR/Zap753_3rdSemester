import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/AppRouter.tsx'
import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
)
