import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SommerJobb from './SommerJobb';
import ContextProvider from './ContextProvider';
import UrlAppend from './UrlAppend';

// main
function App() {
    return (
        <BrowserRouter>
            <ContextProvider>
                <div>
                    <Switch>
                        <Route path="/tiltak/sommerjobb/" exact={true}>
                            <UrlAppend>
                                <SommerJobb />
                            </UrlAppend>
                        </Route>
                    </Switch>
                </div>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
