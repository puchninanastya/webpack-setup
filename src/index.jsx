import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from './modules/home';
import About from './modules/about';

import styles from './styles';

function App() {
  return (
    <Router>
      <div className={ styles.container }>
        <nav>
          <ul className={ styles.nav }>
            <li className={ styles.item }>
              <Link to="/" className={ styles.link }>Home</Link>
            </li>
            <li className={ styles.item }>
              <Link to="/about" className={ styles.link }>About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
