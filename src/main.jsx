import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Css/index.css';
import './Css/Theme.css';
import AuthContextProvider from './Context/AuthContext';

import router from './Router/Routes';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider from './Context/ThemeContext';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
