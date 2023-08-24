import React, { useEffect, Fragment } from "react";
import "material-icons/iconfont/material-icons.css";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/content_page.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing";
import Content from "./components/Content";
import NotFound from "./components/NotFound";
import Navbar from "./components/layouts/Navbar";
import Resources from "./components/Resources";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import CreateUserProfile from "./components/Forms/CreateUserProfile";
import EditProfile from "./components/Forms/EditProfile";
import EditStaffProfile from "./components/Forms/EditStaffProfile";
import CreateStaffProfile from "./components/Forms/CreateStaffProfile";
import { ToastContainer } from "react-toastify";
import Appointments from "./components/appointments/Appointments";
import Dashboard from "./components/Dashboard";
import ProfileView from "./components/ProfileView";
import Messages from "./components/messaging/Messages";
import Conversation from "./components/messaging/Conversation";
import Alerts from "./components/layouts/Alerts";
import PrivateRoute from "./components/layouts/PrivateRoute";

import { loadUser } from "./Actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    M.AutoInit();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Alerts />
          <Switch>
          <Route exact path="/" component={Landing} />
            <div className="container">
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateUserProfile}
              />
              <PrivateRoute
                exact
                path="/create-staff-profile"
                component={CreateStaffProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile/:id"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/edit-staff-profile/:id"
                component={EditStaffProfile}
              />
              <Route exact path="/content" component={Content} />
              <Route exact path="/profile/:id" component={ProfileView} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/appointments"
                component={Appointments}
              />
              <PrivateRoute exact path="/messages" component={Messages} />
              <PrivateRoute
                exact
                path="/messages/:id"
                component={Conversation}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/not-found" component={NotFound} />

              <ToastContainer />
            </div>
              <Redirect to="/not-found" />

          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
