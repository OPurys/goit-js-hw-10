import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const inputEl = document.querySelector('input[name="delay"]');

  const makePromise = delay => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        selectedRadio.value === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    });
  };

  makePromise(inputEl.value)
    .then(delay =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '16',
        position: 'topRight',
        backgroundColor: '#59a10d',
        close: false,
        closeOnClick: true,
      })
    )
    .catch(delay =>
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '16',
        position: 'topRight',
        backgroundColor: '#ef4040',
        close: false,
        closeOnClick: true,
      })
    );
}
