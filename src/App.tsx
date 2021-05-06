import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SommerJobb from "./SommerJobb";
import ContextProvider from './ContextProvider';


function App() {
    useEffect(() => {
        fetch('http://localhost:3001/tiltak/innhold').then(res => res.json()
        ).then(res => console.log('result: ', res)).catch(err => console.warn('error: ', err));
    }, [])

    return (
        <BrowserRouter>
            <ContextProvider>
            <div>
                <Switch>
                    <Route path="/" exact={true}>
                        <SommerJobb />
                    </Route>
                </Switch>
            </div>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
