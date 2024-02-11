import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import TechEra from './components/TechEra'
import NotFount from './components/NotFound'
import CourseDetails from './components/CourseDetails'
import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TechEra} />
      <Route path="/not-found" component={NotFount} />
      <Route path="/courses/:id" component={CourseDetails} />
      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
)

export default App
