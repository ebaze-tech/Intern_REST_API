import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as userRouter } from "./routes/users";
import { router as blogRouter } from "./routes/blogs";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => res.json({ message: "In-memory REST API running" }));

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
