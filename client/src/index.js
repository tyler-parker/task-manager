import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { UserProvider } from './context/UserProvider.js';
import { CommentProvider } from './context/CommentProvider.js';
import { ProjectProvider } from './context/ProjectProvider'
import { ChakraProvider } from '@chakra-ui/react'



ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ProjectProvider>
        <CommentProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </CommentProvider>
      </ProjectProvider>
    </UserProvider>
  </BrowserRouter>, document.getElementById('root')
);

