import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
let newFeedback = {};

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('submit', useFormSubmit);
formEl.addEventListener('input', throttle(getDataFromForm, 500));

setDataFromForm();

function getDataFromForm(e) {
  const targetName = e.target.name;
  const targetValue = e.target.value;
  setDataToStorage(targetName, targetValue);
}
function setDataToStorage(name, value) {
  newFeedback[name] = value;
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(newFeedback));
}
function setDataFromForm() {
  const savedFeedback = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
  if (savedFeedback) {
    formEl.email.value = savedFeedback.email;
    formEl.message.value = savedFeedback.message;
  }
}
function useFormSubmit(e) {
  e.preventDefault();
  console.log(newFeedback);
  localStorage.removeItem(FEEDBACK_KEY);
  e.target.reset();
}
