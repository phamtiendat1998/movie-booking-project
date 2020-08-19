import * as React from 'react';
import { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';

// Scss
import './Home.page.scss';
// Components
import NavComponent from '../../common/nav/Nav.component';
import NewOnScreensPage from './newOnScreens/NewOnScreens.page';
import ShowTimesPage from './showTimes/ShowTimes.page';
import CommingSoonPage from './comingSoon/CommingSoon.page';
import { LoginPage } from '../login/Login.page';
import { RegisterPage } from '../register/Register.page';

export function HomePage() {
    return (
        <BrowserRouter>
            {/* <div className="home"> */}
                <Fragment>
                    <NavComponent></NavComponent>
                    <Switch>
                        <Route exact path="/" component={NewOnScreensPage} />
                        <Route path="/showtimes" component={ShowTimesPage} />
                        <Route path="/comingsoon" component={CommingSoonPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </Fragment>

            {/* </div> */}
        </BrowserRouter>
    );
}
