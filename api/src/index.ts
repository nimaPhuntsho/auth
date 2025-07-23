import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await fetch("http://localhost:3001/user");
  const resultJson = await result.json();
  console.log(resultJson);

  const authResult = await fetch("http://localhost:3002/login");
  const authJson = await authResult.json();
  console.log(authJson);

  res.json(resultJson);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
