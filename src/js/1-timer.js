import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonStart = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const slotDays = document.querySelector('[data-days]');
const slotHours = document.querySelector('[data-hours]');
const slotMinutes = document.querySelector('[data-minutes]');
const slotSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: 'white',
        messageSize: '16',
        close: false,
        closeOnClick: true,
      });
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

buttonStart.addEventListener('click', handleClick);

let intervalId = null;

function handleClick() {
  buttonStart.disabled = true;
  inputEl.disabled = true;

  let remainingTime = calcTime();
  inputMarkup(remainingTime);

  intervalId = setInterval(() => {
    remainingTime = calcTime();
    inputMarkup(remainingTime);

    stopTimer(remainingTime);
  }, 1000);
}

function calcTime() {
  const diff = userSelectedDate - Date.now();
  return diff;
}

function inputMarkup(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  slotDays.textContent = days;
  slotHours.textContent = hours;
  slotMinutes.textContent = minutes;
  slotSeconds.textContent = seconds;
}

function stopTimer(time) {
  if (time < 1000) {
    clearInterval(intervalId);
    inputEl.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
