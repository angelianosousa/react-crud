import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';
import UploadFiles from "./components/upload-files.component";
import { Container, Button } from '@material-ui/core';

function App() {

  return (
      <div>
        <nav className='navbar2'>
          <Button variant='outlined' color='default' href='/read'>
            Logo
          </Button >
        </nav>

        <nav className='navbar'>
          <Link to='/read'>
            Home
          </Link >
        </nav>

        <Container>
          <div className="message">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do elusmod tempor incididunt ut labore et dolore magna alíqua</p>
          </div>
        </Container>

        <div className="upload">
          <UploadFiles />
        </div>

        <div className="main">
          <div>
            <Switch>
              <Route exact path='/create' component={Create} />
              <Route exact path={["/", "/read"]} component={Read} />
              <Route path="/update" component={Update} />
            </Switch>
          </div>
        </div>
      </div>
  );
}

export default App;
