import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SommerJobb from "./SommerJobb";
import ContextProvider from "./ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div>
          <Switch>
            <Route path="/tiltak/sommerjobb" exact={true}>
              <SommerJobb />
            </Route>
          </Switch>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
