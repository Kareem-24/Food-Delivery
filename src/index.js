import { createRoot } from 'react-dom/client';
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./context/stateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";


const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App tab='home'/>
    </StateProvider>
  </Router>
);
