import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/database.js";

dotenv.config({ path: "./config/node.env" });
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Project is running on ${process.env.PORT} Port`);
});
