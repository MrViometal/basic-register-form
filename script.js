var API_URL = 'https://private-b2e6827-robustatask.apiary-mock.com';
var API_PATH_SIGNUP = '/auth/register';
var API_PATH_SIGNIN = '/auth/login';
import {isNumber, ErrorIfEmpty, setError, setSuccess, isEmail} from './helperFunctions.js'

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
email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPassword);
confirmPassword.addEventListener('focusout', checkConfirmPassword);



function checkEmail() {
  const value = email.value.trim();

  //email field is empty => error
  if (value === '') setError(email, 'Email can not be empty');
  //email is not valid => error
  else if (!isEmail(email.value)) setError(email, 'Email is not valid');
  //email is not empty and is valid => success
  else {
    setSuccess(email);
    return true;
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();
  const passwordPattern = /^[A-Za-z]\w{7,19}$/;

  //password is empty => error
  if (passwordValue === '') {
    setError(password, 'Password can not be empty');
  }
  //password doesn't match pattern => error
  else if (!password.value.match(passwordPattern)) {
    //first character != letter => error
    if (isNumber(password.value.charAt(0))) {
      setError(password, `first character must be a letter`);
    }
    //password is less than 8 chars or more than 20 chars
    else if (password.value.length < 8 || password.value.length > 20) {
      setError(password, `password must be between 8 and 20 characters long`);
    }
    //password has special characters => error
    else {
      setError(
        password,
        `password can only contain letters, numbers, and underscores`,
      );
    }
  }
  //password is not empty, matches pattern, between 8 and 20 chars, and has no special chars => success
  else {
    setSuccess(password);
    return true;
  }
}

function checkConfirmPassword() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  //confirm password is empty => error
  if (confirmPasswordValue === '') {
    setError(confirmPassword, `Password confirmation can not be empty`);
  }
  //confirm password != password => error
  else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, `Password confirmation and password don't match`);
  }
  //confirm password is not empty, and matches password => success
  else {
    setSuccess(confirmPassword);
    return true;
  }
}

