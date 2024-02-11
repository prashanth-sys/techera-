import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseDetails} = props
  const {name, logoUrl, id} = courseDetails
  return (
    <li className="list-items">
      <Link to={`/courses/${id}`} className="link">
        <div className="list-container">
          <img src={logoUrl} alt={name} className="course-logo" />
          <p className="logo-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default Courses
