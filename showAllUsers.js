import db from "./database.js";

async function showAllUsers(res, page_no, page_size) {
  const user_start = (page_no - 1) * page_size;
  const result = await db.query(
    "SELECT * FROM public.user WHERE id > ($1) LIMIT ($2)",
    [user_start, page_size]
  );
  res.json(result.rows);
}

export default showAllUsers;
