import "dotenv/config";
import { connectDB } from "./src/config/connectDatabase.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";
import fastifySocketIO from "fastify-socket.io";
import { registerRoutes } from "./src/routes/index.js";

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  const app = fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

  await registerRoutes(app);

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log("Error occurred : ", err);
    } else {
      console.log(`Grocery App server is running at PORT ${3000}`);
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A user is connected");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`User joined roome with orderId ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });
  });
};

start();
