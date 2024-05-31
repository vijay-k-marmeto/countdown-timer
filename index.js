class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.timerId;
  
      this.parentContainer = document.querySelector("#countdown-timer-container");
      this.inputDate = this.dataset.dateInput;
      this.inputTime = this.dataset.timeInput || "00:00"; // Default to "00:00" if time is not provided
      this.hideOnComplete = this.dataset.hideOnComplete === 'true';
  
      // section timer elements
      this.daysElement = this.querySelector("#countdown-days");
      this.hoursElement = this.querySelector("#countdown-hours");
      this.minutesElement = this.querySelector("#countdown-minutes");
      this.secondsElement = this.querySelector("#countdown-seconds");
  
      this.startTimer();
    }
  
    replaceTime() {
      const dateArray = this.inputDate.split("/");
      const timeArray = this.inputTime.split(":");
  
      this.targetDate = new Date(
        parseInt(dateArray[2]),
        parseInt(dateArray[1]) - 1,
        parseInt(dateArray[0]),
        parseInt(timeArray[0]),
        parseInt(timeArray[1])
      );
      this.currentDate = new Date();
  
      if (this.targetDate > this.currentDate) {
        let diffDuration = this.targetDate.getTime() - this.currentDate.getTime();
  
        const remainingDays = Math.floor(diffDuration / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diffDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diffDuration % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((diffDuration % (1000 * 60)) / 1000);
  
        // updating section timer elements with zero-padding
        this.daysElement.innerText = String(remainingDays).padStart(2, '0');
        this.hoursElement.innerText = String(remainingHours).padStart(2, '0');
        this.minutesElement.innerText = String(remainingMinutes).padStart(2, '0');
        this.secondsElement.innerText = String(remainingSeconds).padStart(2, '0');
      } else {
        clearInterval(this.timerId);
        if (this.hideOnComplete) {
          this.parentContainer.classList.add("hide");
        }
      }
    }
  
    startTimer() {
      clearInterval(this.timerId);
      this.timerId = setInterval(this.replaceTime.bind(this), 1000);
    }
}
  
customElements.define("timer-element", CountdownTimer);
