import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddNewContact from './components/AddNewContact';
import EditContact from './components/EditContact';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className="col-md-12">
            <Switch>
              <Route path="/" component={ContactList} exact={true}></Route>
              <Route path="/addcontact" component={AddNewContact}></Route>
              <Route path="/editcontact" component={EditContact}></Route>
              {/* Default route if wrong path is hit....  */}
              <Route render={() => (<div className="content"><h4 style={{ color: 'red' }}>Page Not Found....</h4></div>)}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}