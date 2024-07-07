import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import theme from './theme';

const customTheme = extendTheme(theme);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={customTheme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
