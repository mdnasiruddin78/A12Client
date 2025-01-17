import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/router';
import Authprovider from './Provider/Authprovider';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Authprovider>
          <RouterProvider router={router} />
        </Authprovider>
      </QueryClientProvider>
      <Toaster containerStyle={{ top: 100 }} toastOptions={{ position: "top-right" }} />
    </HelmetProvider>
  </StrictMode>,
)

