import db from "./database.js";

async function showUser(id, res) {
  if (!id) {
    res.status(404);
    return res.json("Invalid ID");
  }
  const userId = await db.query("SELECT * FROM public.user WHERE id = ($1)", [
    id,
  ]);
  const result = userId.rows;
  if (result.length === 0) {
    res.status(404);
    result = `User with ID ${id} not found!`;
  }
  return res.json(result);
}
export default showUser;
