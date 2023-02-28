// Write your code here
import {Component} from 'react'
import './index.css'

const playUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseUrl = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

const initialState = {
  isTimerStart: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onTimerLimitInMinutesDecrement = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onTimerLimitInMinutesIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitControllerSection = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="bottom-section">
        <p className="limit-text">Set Timer Limit</p>
        <div className="btn-container">
          <button
            onClick={this.onTimerLimitInMinutesDecrement}
            type="button"
            className="minus"
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <button className="limit-btn" type="button">
            <p className="number-text">{timerLimitInMinutes}</p>
          </button>
          <button
            onClick={this.onTimerLimitInMinutesIncrement}
            type="button"
            className="minus"
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerComplete = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerStart: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds, isTimerStart} = this.state
    const isTimerComplete = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerComplete) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerStart) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({
      isTimerStart: !prevState.isTimerStart,
    }))
  }

  renderTimeControllerSection = () => {
    const {isTimerStart} = this.state
    const startOrPause = isTimerStart ? 'Pause' : 'Start'
    const playOrPauseUrl = isTimerStart ? pauseUrl : playUrl
    const playOrPauseAltText = isTimerStart ? 'pause icon' : 'play icon'

    return (
      <div className="top-section">
        <button
          className="timer-controlled-btn"
          onClick={this.onClickStartOrPause}
          type="button"
        >
          <img
            className="play-img"
            src={playOrPauseUrl}
            alt={playOrPauseAltText}
          />

          <p className="start-text">{startOrPause}</p>
        </button>
        <button
          onClick={this.onClickReset}
          className="timer-controlled-btn"
          type="button"
        >
          <img
            className="play-img"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />

          <p className="start-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerStart} = this.state

    const timerStatus = isTimerStart ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="content-container">
          <div className="timer-image-container">
            <div className="timer-container">
              <div>
                <h1 className="timer">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="pause-text">{timerStatus}</p>
              </div>
            </div>
          </div>

          <div className="time-setting-container">
            {this.renderTimeControllerSection()}
            {this.renderTimerLimitControllerSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
