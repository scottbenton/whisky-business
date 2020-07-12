export function passwordValidator(password?: string) {
  if (!password || password.length === 0) {
    return "Password is required";
  }

  const numberRegex = /(?=.*\d)/;
  const lowerCaseRegex = /(?=.*[a-z])/;
  const upperCaseRegex = /(?=.*[A-Z])/;

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  } else if (!lowerCaseRegex.test(password)) {
    return "Password must have at least one lowercase letter";
  } else if (!upperCaseRegex.test(password)) {
    return "Password must have at least one uppercase letter";
  } else if (!numberRegex.test(password)) {
    return "Password must have at least one number";
  }
}

export function emailValidator(email?: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !re.test(email.toLowerCase())) {
    return "Invalid Email";
  }
}
