import './App.css';
import { Switch, Route } from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';
import UploadFiles from "./components/upload-files.component";

function App() {

  return (
      <div>
        <div className='container-fluid'>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/read" className="navbar-brand">
              Home
            </a>
          </nav>
        </div>

        <div className="container message">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do elusmod tempor incididunt ut labore et dolore magna alíqua</p>
        </div>
        <div className="upload">
          <UploadFiles />
        </div>
        <div className="main">
          <div className='container'>            
            <div className='container'>
              <Switch>
                <Route exact path='/create' component={Create} />
                <Route exact path={["/", "/read"]} component={Read} />
                <Route path="/update" component={Update} />
              </Switch>
            </div>
          </div>
          
        </div>
      </div>
  );
}

export default App;
