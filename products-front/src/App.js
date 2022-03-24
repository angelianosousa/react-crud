import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/read" className="navbar-brand">
            React CRUD
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/create"} className="btn btn-light">
                Create
              </Link>
            </li>
          </div>
        </nav>
        <div className="main">
          <div className='container mb-3'>
            <h2 className="main-header">React Crud Operations</h2>

            <Switch>
              <Route exact path='/create' component={Create} />
              <Route exact path="/read" component={Read} />
              <Route path="/Update" component={Update} />
            </Switch>
          </div>
        </div>
      </div>
  );
}

export default App;
