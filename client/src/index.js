import React from "react";
import App from "./components/App";
import { DarkModeContextProvider } from './components/DarkModeContext';
import { createRoot } from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
    </BrowserRouter>
    
);
