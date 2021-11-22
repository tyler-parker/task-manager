import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { UserProvider } from './context/UserProvider.js';
import { CommentProvider } from './context/CommentProvider.js';
import { ChakraProvider } from '@chakra-ui/react'



ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CommentProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </CommentProvider>
    </UserProvider>
  </BrowserRouter>, document.getElementById('root')
);

