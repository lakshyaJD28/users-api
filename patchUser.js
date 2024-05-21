import {
  checkAge,
  checkAlphabets,
  checkContact,
  checkGender,
  checkValidString,
} from "./functions.js";
import db from "./database.js";

async function patchUser(id, req, res) {
  if (!id) {
    res.status(404);
    return res.json("Invalid ID");
  }
  const existingUser = await db.query(
    "SELECT * FROM public.user WHERE id = ($1)",
    [id]
  );
  const result = existingUser.rows;
  if (!result[0]) {
    res.status(404);
    return res.json(`No user with ID ${id} found!`);
  }
  const updatedUser = [
    req.body.name || result[0].name,
    req.body.gender || result[0].gender,
    req.body.age || result[0].age,
    req.body.address || result[0].address,
    req.body.mobile || result[0].mobile,
    id,
  ];
  let valid = true;
  updatedUser.forEach((user, index) => {
    if (index !== 5) {
      valid = valid && checkValidString(user);
    }
  });
  if (updatedUser[0].length > 50) {
    return res.json(`Name cannot be more than 50 characters.`);
  }
  if (!checkGender(updatedUser[1])) {
    return res.json(`Gender should be male, female, m or f.`);
  }
  if (updatedUser[2].length > 3 || !checkAge(updatedUser[2])) {
    return res.json(`Invalid Age`);
  }
  if (updatedUser[3].length > 100) {
    return res.json(`Address cannot be more than 100 characters`);
  }
  if (updatedUser[4].length > 16 || !checkContact(updatedUser[4])) {
    return res.json(`Invalid contact number`);
  }
  if (!checkAlphabets(updatedUser[0])) {
    return res.json(`Name should only contain alphabets.`);
  }
  if (valid) {
    await db.query(
      "UPDATE public.user SET name=($1), gender=($2), age=($3), address=($4), mobile=($5) WHERE id=($6)",
      updatedUser
    );
    return res.json(updatedUser);
  }
  res.json(`Invalid inputs.`);
}

export default patchUser;
