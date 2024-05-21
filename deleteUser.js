import db from "./database.js";

async function deleteUser(id, res) {
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
  await db.query("DELETE FROM public.user WHERE id = ($1)", [id]);
  res.json(`Successfully deleted user with ID ${id}`);
}

export default deleteUser;
