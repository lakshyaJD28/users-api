import db from "./database.js";
import itemSchema from "./itemSchema.js";

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
  const updatedUser = {
    name: req.body.name || result[0].name,
    gender: req.body.gender || result[0].gender,
    age: req.body.age || result[0].age,
    address: req.body.address || result[0].address,
    mobile: req.body.mobile || result[0].mobile,
  };
  const validInfo = itemSchema.validate(updatedUser);
  if (validInfo.error) {
    return res.json(`Invalid Information`);
  }
  await db.query(
    "UPDATE public.user SET name=($1), gender=($2), age=($3), address=($4), mobile=($5) WHERE id=($6)",
    [
      updatedUser.name,
      updatedUser.gender,
      updatedUser.age,
      updatedUser.address,
      updatedUser.mobile,
      id
    ]
  );
  res.json(updatedUser);
}

export default patchUser;