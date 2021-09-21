import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Posts from './pages/posts/Posts';
import Links from './pages/links/Links';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/links">
          <Links />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
