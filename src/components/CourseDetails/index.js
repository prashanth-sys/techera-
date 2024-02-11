import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    console.log(response.status)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickCourse = () => {
    this.getCourseDetails()
  }

  renderCoursesDetails = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div className="course-container">
        <img src={imageUrl} alt={name} className="course-image" />
        <div>
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <div className="products-details-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailure = () => {
    console.log('failure view')
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>

        <button type="button" onClick={this.onClickCourse}>
          Retry
        </button>
      </div>
    )
  }

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderDetails()}</div>
      </>
    )
  }
}

export default CourseDetails
