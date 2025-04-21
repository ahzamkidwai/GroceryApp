import "dotenv/config";
import { connectDB } from "./src/config/connectDatabase.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  const app = fastify();

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log("Error occurred : ", err);
    } else {
      console.log(`Grocery App server is running at PORT ${3000}`);
    }
  });
};

start();
