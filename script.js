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
const { fnContainer, lnContainer, unContainer, cpContainer } = {
  fnContainer: document.getElementById('first-name-container'),
  lnContainer: document.getElementById('last-name-container'),
  unContainer: document.getElementById('username-container'),
  cpContainer: document.getElementById('confirm-password-container'),
};

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

// loader elements
const loader = document.getElementById('loader');
const spinner = document.getElementById('spinner');
const registered = document.getElementById('registered');

// *********************************************************************

//event listeners

//to handle input change
form.addEventListener('keyup', () => (submit.disabled = !isFormValid()));

//to handle click on the page
body.addEventListener('click', () => (submit.disabled = !isFormValid()));

window.onload = function (event) {
  firstName.onkeyup = checkFirstName;
  lastName.onkeyup = checkLastName;
  username.onkeyup = checkUsername;
  email.onkeyup = checkEmail;
  password.onkeyup = checkPassword;
  confirmPassword.onkeyup = checkConfirmPassword;
  signInTab.onclick = checkWhichTab;
  signUpTab.onclick = checkWhichTab;
  submit.onclick = onSubmit;
};
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
  }
}

function checkPassword() {
  const passwordPattern = /^[A-Za-z]\w{7,19}$/;

  //password is empty => error
  if (password.value === '') {
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
    else if (!(password.value.length > 8 && password.value.length < 20)) {
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
  }

  //password was changed after confirm password was filled
  if (confirmPassword.value.length !== 0) {
    checkConfirmPassword();
  }
}

function checkConfirmPassword() {
  //confirm password is empty => error
  if (confirmPassword.value === '') {
    setError(confirmPassword, `Password confirmation can not be empty`);
    formIsValid.confirmPassword = false;
  }
  //confirm password != password => error
  else if (password.value != confirmPassword.value) {
    setError(confirmPassword, `Password confirmation and password don't match`);
    formIsValid.confirmPassword = false;
  }
  //confirm password is not empty, and matches password => success
  else {
    setSuccess(confirmPassword);
    formIsValid.confirmPassword = true;
  }
}

function checkWhichTab(e) {
  if (e.target.id === 'tab-sign-in') {
    mode = 'sign-in';

    URL = API_URL + API_PATH_SIGNIN;
    console.log({ URL });

    showSignInFields();
  } else if (e.target.id === 'tab-sign-up') {
    mode = 'sign-up';

    URL = API_URL + API_PATH_SIGNUP;
    console.log({ URL });

    showSignUpFields();
  } else {
    alert(`check radio buttons' id's you broke something`);
  }
}

function showSignUpFields() {
  fnContainer.style.display = 'block';
  lnContainer.style.display = 'block';
  unContainer.style.display = 'block';
  cpContainer.style.display = 'block';
}

function showSignInFields() {
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
  } else if (mode === 'sign-up') {
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
  } else alert('you broke something, check sign-up/in conditions');
}

function responseSuccessful() {
  spinner.style.display = 'none';
  registered.style.display = 'block';
  registered.children[1].innerHTML =
    mode === 'sign-up'
      ? 'You have signed up successfully, Welcome!'
      : mode === 'sign-in'
      ? 'Welcome back, you are now logged in'
      : 'you have broke something check your sign-up/in conditions';
}

function onSubmit(e) {
  loader.style.display = 'flex';

  e.preventDefault();
  const ajax = new XMLHttpRequest();
  const method = 'POST';
  const asynchronous = true;

  const signUpData = {
    name: `${firstName.value} ${lastName.value}`,
    email: email.value,
    username: username.value,
    password: password.value,
  };

  const signInData = {
    email: email.value,
    password: password.value,
  };

  ajax.open(method, URL, asynchronous);

  ajax.setRequestHeader('Content-type', 'application/json');

  mode === 'sign-up' && ajax.send(JSON.stringify(signUpData));

  mode === 'sign-in' && ajax.send(JSON.stringify(signInData));

  ajax.onload = () => {
    console.log(ajax.response);
  };

  ajax.onreadystatechange = e => {
    if (e.currentTarget.status === 200) {
      responseSuccessful();
    } else console.log('fail');
  };
}
