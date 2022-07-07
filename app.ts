import express  from "express";
import cors from "cors";
import { newBattle } from "./controllers/battleControllers.js";
import {existsUsers} from "./middlewares/userMiddleware.js";


const app = express();

app.use(express.json());
app.use(cors())

app.post("/battle", existsUsers, newBattle);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

