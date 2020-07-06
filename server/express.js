import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import devBundle from "./devBundle";

// comment out before production
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.json(CURRENT_WORKING_DIR, "dist")));

const app = express();

// only durring development
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ":" + err.message });
  }
});

export default app;
