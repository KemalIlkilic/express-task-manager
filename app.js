const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

// middleware
app.use(express.static("./public"));
app.use(express.json());

/* 
Middleware Order: In Express, the order of middleware and route handlers is crucial.
They are executed in the order they are defined.
Route Matching: When a request comes in,
Express goes through the middleware and routes in order, looking for a match.
app.use() without a path: When app.use() is called without a specific path (like in app.use(notFound)),
it applies to every request, regardless of the URL.
*/
// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
start();
