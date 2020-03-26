// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
// getTime() always uses UTC for time representation
const getTimestamp = () => new Date().getTime();

module.exports = class ExecuteFunctionResponse {
  constructor({ logger }) {
    this.logger = logger;
    this.startTime = getTimestamp();
    this.endTime = null;
    this.stopped = false;
  }

  start() {
    this.startTime = getTimestamp();
  }

  stop() {
    this.endTime = getTimestamp();
    this.stopped = true;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    if (!this.stopped) {
      this.logger.debug('Timer was never stopped. Forcing stop now');
      this.stop();
    }
    return this.endTime;
  }

  getDuration() {
    return this.getEndTime() - this.getStartTime();
  }
};
