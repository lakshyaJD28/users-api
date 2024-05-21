function checkAlphabets(input) {
  for (const char of input) {
    if (!(char >= "a" && char <= "z") && !(char >= "A" && char <= "Z")) {
      return false;
    }
  }
  return true;
}

function checkValidString(input) {
  if (input.length === 0) {
    return false;
  }
  for (const char of input) {
    if (char !== " ") {
      return true;
    }
  }
  return false;
}

function checkNumeric(input) {
  return !isNaN(parseFloat(input)) && !isNaN(input);
}

function checkGender(input) {
  const gender = input.toLowerCase();
  if (
    gender === "male" ||
    gender === "female" ||
    gender === "m" ||
    gender === "f"
  ) {
    return true;
  }
  return false;
}

function checkAge(input) {
  return (
    !isNaN(input) &&
    !isNaN(parseFloat(input)) &&
    (parseFloat(input) >= 0 ? true : false)
  );
}

function checkContact(input) {
  let i = 0;
  let noOfDashes = 0;
  if (input[i] === "+") {
    i++;
  }
  while (i < input.length) {
    if (input[i] === "-" && input[i - 1] !== "-") {
      noOfDashes++;
      i++;
    } else if (input[i] === "-" && input[i - 1] === "-") {
      return false;
    }
    if (noOfDashes > 3) {
      return false;
    }
    if (!checkNumeric(input[i])) {
      return false;
    }
    i++;
  }
  return true;
}

export {
  checkAlphabets,
  checkGender,
  checkValidString,
  checkAge,
  checkNumeric,
  checkContact,
};
