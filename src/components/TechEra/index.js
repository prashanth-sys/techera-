import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Courses from '../Courses'

import './index.css'

class TechEra extends Component {
  state = {courseData: [], isLoader: false}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({isLoader: true})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({courseData: updatedData, isLoader: false})
    }
  }

  renderCourses = () => {
    const {courseData} = this.state
    return (
      <>
        <div>
          <h1 className="courses-heading">Courses</h1>
          <ul className="list-item">
            {courseData.map(eachCourse => (
              <Courses key={eachCourse.id} courseDetails={eachCourse} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <div className="products-details-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {isLoader} = this.state
    return (
      <>
        <Header />
        <div className="bg-container">
          {isLoader ? this.renderLoaderView() : this.renderCourses()}
        </div>
      </>
    )
  }
}

export default TechEra
