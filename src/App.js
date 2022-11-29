import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
// import LoginButton from './Login.js';
import Profile from './Profile.js';
// import LogoutButton from './Logout.js';

class App extends React.Component {
  render() {
    return (
      <>
          <Router>
            <Header />
            <Routes>
              <Route
                exact path="/"
                element=
                {this.props.auth0.isAuthenticated ? <BestBooks/> :<h2>Please Log in</h2>}
              >
              </Route>
              <Route
                exact path="/about"
                element={<About />}>
              </Route>
              <Route
                exact path="/profile"
                element={<Profile />}>
              </Route>
            </Routes>
        <Footer />
      </Router>
      </>
    )
  }
}

export default withAuth0(App);
