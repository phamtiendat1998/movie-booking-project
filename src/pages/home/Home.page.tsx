import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
// Scss
import './Home.page.scss';
// Components
import NavComponent from '../../common/nav/Nav.component';
import NewOnScreensPage from './newOnScreens/NewOnScreens.page';

export function HomePage() {
    return (
        <div className="home">
            <NavComponent></NavComponent>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={NewOnScreensPage} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}
