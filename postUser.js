import db from "./database.js";
import {
  checkAge,
  checkAlphabets,
  checkContact,
  checkGender,
  checkValidString,
} from "./functions.js";

async function postUser(newUser, res) {
  let valid = true;
  newUser.forEach((user) => {
    valid = valid && checkValidString(user);
  });
  if (newUser[0].length > 50) {
    return res.json(`Name cannot be more than 50 characters.`);
  }
  if (!checkGender(newUser[1])) {
    return res.json(`Gender should be male, female, m or f.`);
  }
  if (newUser[2].length > 3 || !checkAge(newUser[2])) {
    return res.json(`Invalid Age`);
  }
  if (newUser[3].length > 100) {
    return res.json(`Address cannot be more than 100 characters`);
  }
  if (newUser[4].length > 16 || !checkContact(newUser[4])) {
    return res.json(`Invalid contact number`);
  }
  if (!checkAlphabets(newUser[0])) {
    return res.json(`Name should only contain alphabets.`);
  }
  if (valid) {
    await db.query(
      "INSERT INTO public.user (name, gender, age, address, mobile) VALUES (($1), ($2), ($3), ($4), ($5))",
      newUser
    );
    res.status(201);
    return res.json(newUser);
  }
  res.json("All fields are mandatory.");
}

export default postUser;
