import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import EventState from "./context/event/EventState";
import PrivateRoute from "./components/routing/PrivateRoute";
import Loading from "./components/Loading";
import setAuthToken from "./utils/setAuthToken";
import history from "./utils/history";
import Navigation from "./components/Navigation/index"
import Home from "./pages/Home";
import User from "./pages/User/index";
import EditEvent from "./pages/EditEvent/index"
import CreateEvent from "./pages/CreateEvent/index";
import SearchEvent from "./pages/SearchEvent";
import ViewEvent from "./pages/ViewEvent";

// import UserReview from "./pages/UserReview";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <AuthState>
            <EventState>
                <Router history={history}>
                    <Navigation />
                    <div id="content">
                        <React.Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute exact path="/user" component={User} />
                                <PrivateRoute exact path="/create" component={CreateEvent} />
                                <Route exact path="/search" component={SearchEvent} />
                                <PrivateRoute exact path="/view/:id" component={ViewEvent} />
                                <PrivateRoute exact path="/edit/:id" component={EditEvent} />
                                {/* <PrivateRoute exact path="/review" component={UserReview} /> */}
                                <Route render={() => <h1>404 Page not found.</h1>} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </Router>
            </EventState>
        </AuthState>
    );
}

export default App;
