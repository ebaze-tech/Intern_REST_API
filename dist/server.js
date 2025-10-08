"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const users_1 = require("./routes/users");
const blogs_1 = require("./routes/blogs");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/users", users_1.router);
app.use("/blogs", blogs_1.router);
app.get("/", (req, res) => res.json({ message: "In-memory REST API running" }));
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
