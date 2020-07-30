import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Scss
import './Home.page.scss';
// Components
import NavComponent from '../../common/nav/Nav.component';
import NewOnScreensPage from './newOnScreens/NewOnScreens.page';
import ShowTimesPage from './showTimes/ShowTimes.page';

export function HomePage() {
    return (
        <Router>
            <div className="home">
                <NavComponent></NavComponent>
                <Switch>
                    <Route exact path="/" component={NewOnScreensPage} />
                    <Route path="/showtimes" component={ShowTimesPage} />
                </Switch>
            </div>
        </Router>
    );
}
