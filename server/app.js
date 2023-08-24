import express from "express";
import cors from "cors";
import sql from "./db.js";

const port = 3000;
const app = express();
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user/:id", (req, res) => {
  sql.query(
    `SELECT * FROM users WHERE id = "${req.params.id}" LIMIT 1`,
    (uErr, user) => {
      if (uErr) {
        console.log("Error while fetching user by id", uErr);
        res.send(uErr);
      }
      console.log("User fetched successfully");

      sql.query(
        `SELECT location, date FROM visits WHERE userId = "${req.params.id}" ORDER BY date DESC`,
        (vErr, visits) => {
          if (vErr) {
            console.log("Error while fetching visits by id", vErr);
            res.send(vErr);
          }
          console.log("Visits fetched successfully");
          res.send({ user: user.length > 0 ? user[0] : user, visits });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
