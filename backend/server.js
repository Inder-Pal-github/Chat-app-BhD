const express = require("express");

const app = express();

const room = ["general", "tech", "finance", "crypto"];
const cors = require("cors");
const { connection } = require("./config/db");
const {  router } = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user",router);

const server = require("http").createServer(app);

const PORT = 5000;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Listening on port" + PORT);
  } catch (error) {}
});
