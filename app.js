import express from "express";
import cors from "cors";
import reportRouter from "./routes/UserRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", reportRouter);

export default app;
