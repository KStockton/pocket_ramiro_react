import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../NotFound';
import Nav from '../Nav';
import Dashboard from '../Dashboard'
import CreateTask from '../CreateTask';
import TicketForm from '../TicketForm';
import UserLogin from '../UserLogin/';

class App extends Component {


  render() {
    let user = undefined;
    return (
      <main>
        <Nav name={user}/>
         <Switch>
          <Route exact path='/' render={() => <Redirect to="/tickets"/>} />
          <Route path='/tickets' component={Dashboard}/>
          <Route path='/assets' component={Dashboard}/>
          <Route path='/task' component={CreateTask} />
          <Route path='/login' component={UserLogin} />
          <Route component={NotFound}/>
        </Switch>
        <TicketForm/>
      </main>
    )
  }
}

export default App;
