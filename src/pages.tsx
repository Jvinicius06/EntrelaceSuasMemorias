import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/home';
import SelectSizePage from './pages/size';
import ArteProvider from './components/arte';
import UploaderPage from './pages/uploader';
import EditePage from './pages/edite';
import ResultPage from './pages/results';


// eslint-disable-next-line @typescript-eslint/ban-types
const App: React.FC<{}> = () => {

    useEffect(() => {
        const appHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${ window.innerHeight }px`);
        }
        window.addEventListener('resize', appHeight);
        appHeight();
        return () => {
            window.removeEventListener('resize', appHeight);
        }
    }, []);

    return (
        <>
            <Router>
                <ArteProvider>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/size">
                            <SelectSizePage />
                        </Route>
                        <Route path="/uploader">
                            <UploaderPage />
                        </Route>
                        <Route path="/edit">
                            <EditePage />
                        </Route>
                        <Route path="/results">
                            <ResultPage />
                        </Route>
                    </Switch>
                </ArteProvider>
            </Router>
        </>
    );
}

export default App;
