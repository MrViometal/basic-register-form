export function isNumber(char) {
  return !isNaN(char - parseInt(char));
}

export function ErrorIfEmpty(element) {
  const elementValue = element.value.trim();
  if (elementValue === '') {
    setError(element, `${element.name} can not be empty`);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
}

export function setError(field, message) {
  const formGroup = field.parentElement; // .form-group
  const small = formGroup.querySelector('small');

  small.innerText = message;

  formGroup.className = 'form-group error';
}

export function setSuccess(field) {
  const formGroup = field.parentElement; // .form-group
  formGroup.className = 'form-group success';
}

export function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}
