import {Switch, Route, Redirect} from 'react-router-dom'

import TechEra from './components/TechEra'
import NotFount from './components/NotFound'
import CourseDetails from './components/CourseDetails'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route path="/courses/:id" component={CourseDetails} />
    <Route path="/not-found" component={NotFount} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
