import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from 'layouts'
import Dashborad from 'pages/Dashboard'
import Token from 'pages/Token'
import Permission from 'pages/Permission'
const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path='/'>
              <Dashborad />
          </Route>
          <Route exact path='/token'>
              <Token />
          </Route>
          <Route exact path='/permission'>
              <Permission />
          </Route>
        </Layout>
      </Switch>
    </Router>
  )
}

export default App