var API_URL = 'https://private-b2e6827-robustatask.apiary-mock.com';
var API_PATH_SIGNUP = '/auth/register';
var API_PATH_SIGNIN = '/auth/login';

//get elements
const form = document.getElementById('form');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const username = document.getElementById('username');

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

firstName.addEventListener('focusout', () => ErrorIfEmpty(firstName));
lastName.addEventListener('focusout', () => ErrorIfEmpty(lastName));
username.addEventListener('focusout', () => ErrorIfEmpty(username));
email.addEventListener('focusout', () => ErrorIfEmpty(email));
password.addEventListener('focusout', () => ErrorIfEmpty(password));
confirmPassword.addEventListener('focusout', () =>
  ErrorIfEmpty(confirmPassword),
);

function ErrorIfEmpty(element) {
  const elementValue = element.value.trim();
  if (elementValue === '') {
    setError(element, `${element.name} can not be empty`);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
}

function setError(field, message) {
  const formGroup = field.parentElement; // .form-group
  const small = formGroup.querySelector('small');

  small.innerText = message;

  formGroup.className = 'form-group error';
}

function setSuccess(field) {
  const formGroup = field.parentElement; // .form-group
  formGroup.className = 'form-group success';
}
