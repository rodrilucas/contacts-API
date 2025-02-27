import cors from "cors";

export = cors({
  origin: process.env.ORIGIN_URL,
  credentials: true,
});
