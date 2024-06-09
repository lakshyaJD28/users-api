import db from "./database.js";
import itemSchema from "./itemSchema.js";

async function postUser(newUser, res) {
  const validInfo = itemSchema.validate(newUser);

  if (validInfo.error) {
    return res.json(validInfo?.error?.details[0]?.message);
  }
  await db.query(
    "INSERT INTO public.user (name, gender, age, address, mobile) VALUES (($1), ($2), ($3), ($4), ($5))",
    [newUser.name, newUser.gender, newUser.age, newUser.address, newUser.mobile]
  );
  res.status(201);
  return res.json(newUser);
}

export default postUser;
