import {
  isNumber,
  isEmail,
  setError,
  setSuccess,
  ErrorIfEmpty,
} from './helperFunctions.js';
// *********************************************************************

var API_URL = 'https://private-b2e6827-robustatask.apiary-mock.com';
var API_PATH_SIGNUP = '/auth/register';
var API_PATH_SIGNIN = '/auth/login';
// ---------------------------------------------------------------------
let URL = API_URL + API_PATH_SIGNUP;
var mode = 'sign-up';

let formIsValid = {
  firstName: false,
  lastName: false,
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

// *********************************************************************

//get elements

// general elements
const body = document.getElementsByTagName('BODY')[0];
const containers = {
  fnContainer: document.getElementById('first-name-container'),
  lnContainer: document.getElementById('last-name-container'),
  unContainer: document.getElementById('username-container'),

  cpContainer: document.getElementById('confirm-password-container'),
};
const { fnContainer, lnContainer, unContainer, cpContainer } = containers;

//form elements
const form = document.getElementById('form');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const username = document.getElementById('username');

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const submit = document.getElementById('submit-btn');

// header elements
const signUpTab = document.getElementById('tab-sign-up');
const signInTab = document.getElementById('tab-sign-in');

// *********************************************************************

//event listeners

firstName.addEventListener('focusout', checkFirstName);
lastName.addEventListener('focusout', checkLastName);
username.addEventListener('focusout', checkUsername);
email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPassword);
confirmPassword.addEventListener('focusout', checkConfirmPassword);

//to handle input change
form.addEventListener('keyup', () => (submit.disabled = !isFormValid()));

//to handle click on the page
body.addEventListener('click', () => (submit.disabled = !isFormValid()));

signUpTab.addEventListener('click', () => {
  URL = API_URL + API_PATH_SIGNUP;
  showSignUpFields();
  console.log(`sign up, url: ${URL}`);
});

signInTab.addEventListener('click', () => {
  URL = API_URL + API_PATH_SIGNIN;
  showSignInFields();
  console.log(`sign in, url: ${URL}`);
});

// **********************************************************************

//functions

function checkFirstName() {
  ErrorIfEmpty(firstName);

  if (ErrorIfEmpty(firstName)) formIsValid.firstName = true;
  else formIsValid.firstName = false;
}
function checkLastName() {
  ErrorIfEmpty(lastName);

  if (ErrorIfEmpty(lastName)) formIsValid.lastName = true;
  else formIsValid.lastName = false;
}
function checkUsername() {
  ErrorIfEmpty(username);

  if (ErrorIfEmpty(username)) formIsValid.username = true;
  else formIsValid.username = false;
}

function checkEmail() {
  const value = email.value.trim();

  //email field is empty => error
  if (value === '') {
    setError(email, 'Email can not be empty');
    formIsValid.email = false;
  }
  //email is not valid => error
  else if (!isEmail(email)) {
    setError(email, 'Email not valid');
    formIsValid.email = false;
  }
  //email is not empty and is valid => success
  else {
    setSuccess(email);
    formIsValid.email = true;
    return true;
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();
  const passwordPattern = /^[A-Za-z]\w{7,19}$/;

  //password is empty => error
  if (passwordValue === '') {
    setError(password, 'Password can not be empty');
    formIsValid.password = false;
  }
  //password doesn't match pattern => error
  else if (!password.value.match(passwordPattern)) {
    //first character != letter => error
    if (isNumber(password.value.charAt(0))) {
      setError(password, `first character must be a letter`);
      formIsValid.password = false;
    }
    //password is less than 8 chars or more than 20 chars
    else if (password.value.length < 8 || password.value.length > 20) {
      setError(password, `password must be between 8 and 20 characters long`);
      formIsValid.password = false;
    }
    //password has special characters => error
    else {
      setError(
        password,
        `password can only contain letters, numbers, and underscores`,
      );
      formIsValid.password = false;
    }
  }
  //password is not empty, matches pattern, between 8 and 20 chars, and has no special chars => success
  else {
    setSuccess(password);
    formIsValid.password = true;

    return true;
  }
}

function checkConfirmPassword() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  //confirm password is empty => error
  if (confirmPasswordValue === '') {
    setError(confirmPassword, `Password confirmation can not be empty`);
    formIsValid.confirmPassword = false;
  }
  //confirm password != password => error
  else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, `Password confirmation and password don't match`);
    formIsValid.confirmPassword = false;
  }
  //confirm password is not empty, and matches password => success
  else {
    setSuccess(confirmPassword);
    formIsValid.confirmPassword = true;

    return true;
  }
}

function showSignUpFields() {
  mode = 'sign-up';
  fnContainer.style.display = 'block';
  lnContainer.style.display = 'block';
  unContainer.style.display = 'block';
  cpContainer.style.display = 'block';
}

function showSignInFields() {
  mode = 'sign-in';
  fnContainer.style.display = 'none';
  lnContainer.style.display = 'none';
  unContainer.style.display = 'none';
  cpContainer.style.display = 'none';
}

function isFormValid() {
  console.log('change');
  if (mode === 'sign-in') {
    if (formIsValid.email && formIsValid.password) {
      return true;
    } else return false;
  } else {
    if (
      formIsValid.firstName &&
      formIsValid.lastName &&
      formIsValid.username &&
      formIsValid.email &&
      formIsValid.password &&
      formIsValid.confirmPassword
    ) {
      return true;
    } else return false;
  }
}
