import express from "express";
import bodyParser from "body-parser";
import showAllUsers from "./showAllUsers.js";
import showUser from "./showUser.js";
import postUser from "./postUser.js";
import patchUser from "./patchUser.js";
import deleteUser from "./deleteUser.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users/list/:page_no?/:page_size?", async (req, res) => {
  let page_no = (req.params.page_no);
  let page_size = (req.params.page_size);
  if (!page_no) {
    page_no = 1;
  }
  if (!page_size) {
    page_size = 10;
  }
  page_size = parseInt(page_size);
  page_no = parseInt(page_no);
  if (!page_no || !page_size) {
    return res.json(`Invalid page number or size`);
  }
  showAllUsers(res, page_no, page_size);
});

app.get("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  showUser(id, res);
});

app.post("/user", async (req, res) => {
  const newUser = [
    req.body.name,
    req.body.gender,
    req.body.age,
    req.body.address,
    req.body.mobile,
  ];
  postUser(newUser, res);
});

app.patch("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  patchUser(id, req, res);
});

app.delete("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  deleteUser(id, res);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});