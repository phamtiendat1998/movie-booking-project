import * as React from 'react';
import { Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// Protected Route
import { ProtectedRoute } from '../../auth/protected.route';

// Components
const NavComponent = React.lazy(() => import('../../common/nav/Nav.component'));
const NewOnScreensPage = React.lazy(() => import('./newOnScreens/NewOnScreens.page'));
const ShowTimesPage = React.lazy(() => import('./showTimes/ShowTimes.page'));
const ComingSoonPage = React.lazy(() => import('./comingSoon/ComingSoon.page'));
const ReviewsPage = React.lazy(() => import('./newAndReviews/Reviews.page'));
const ContactUsPage = React.lazy(() => import('./contactUs/ContactUs.page'));
const MovieDetailPage = React.lazy(() => import('../movie/detail/MovieDetail.page'));
const BookSeatPage = React.lazy(() => import('../movie/seat/BookSeat.page'));
const LoginPage = React.lazy(() => import('../login/Login.page'));
const RegisterPage = React.lazy(() => import('../register/Register.page'));
const LoadingComponent = React.lazy(() => import('../../common/loading/Loading.component'));

export interface HomePageProps {
    userlogin: string;
}

const HomePage = (props: HomePageProps) => {
    return (
        <BrowserRouter>
            <Fragment>
                <NavComponent />
                <Suspense fallback={<LoadingComponent />}>
                    <Switch>
                        <Route exact path="/" component={NewOnScreensPage} />
                        <Route path="/showtimes" component={ShowTimesPage} />
                        <Route path="/comingsoon" component={ComingSoonPage} />
                        <Route path="/reviews" component={ReviewsPage} />
                        <Route path="/contactus" component={ContactUsPage} />
                        <Route path="/movie-detail/:id" component={MovieDetailPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <ProtectedRoute authed={`${props.userlogin}`} path="/seat/:id" component={BookSeatPage} />
                    </Switch>
                </Suspense>
            </Fragment>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: any = {}) => {
    return {
        userlogin: state.userManagerReducer.user,
    }
}

export default connect(mapStateToProps)(HomePage);


