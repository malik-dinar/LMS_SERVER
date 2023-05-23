const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const connectDb = require("./Config/dbConnection");
const errorHandler = require("./Middleware/errorHandler");
const compression = require("./Middleware/compression");
const { initializeSocket } = require("./socket/socket");

const userRoute = require("./Routes/userRoutes");
const tutorRoute = require("./Routes/tutorRoutes");
const adminRoute = require("./Routes/adminRoutes");
const chatRoute = require("./Routes/chatRoute");

connectDb();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(compression);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);

initializeSocket(server);

app.use("/api/users", userRoute);
app.use("/api/tutors", tutorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/chat", chatRoute);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`server is  running in ${port}`);
});
