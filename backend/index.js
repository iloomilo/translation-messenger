const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { Server } = require("socket.io");
const http = require("http");
const bcrypt = require("bcrypt");
require("dotenv").config();

//middleware
const app = express();
app.use(cors());
app.use(express.json());
// server needed for Socket.io
const server = http.createServer(app);

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// to connect the database to this backend
const { SQL_USER, SQL_PASS, SQL_HOST, SQL_PORT, SQL_DATABASE } = process.env;
if (!SQL_USER || !SQL_PASS || !SQL_HOST || !SQL_PORT || !SQL_DATABASE) {
  throw new Error("Incomplete database configuration.");
}
const pool = new Pool({
  user: SQL_USER,
  password: SQL_PASS,
  host: SQL_HOST,
  port: SQL_PORT,
  database: SQL_DATABASE,
  ssl: {
    require: true,
  },
});

// to test database connection to the server
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Successfully connected to the database:", res.rows[0]);
  }
});

// to check the database to make sure they are valid credentials logging in
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Received login request for username:", username);

    const result = await pool.query(
      "SELECT * FROM translatorusers WHERE username = $1",
      [username]
    );
    console.log("Result from database query:", result.rows);

    if (result.rows.length === 0) {
      console.log("User not found");
      return res
        .status(401)
        .json({ ok: false, message: "Invalid username or password" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid Password");
      return res
        .status(401)
        .json({ ok: false, message: "Invalid username or password" });
    }

    console.log("Login successful for user:", username);
    return res.status(200).json({
      ok: true,
      message: "Login Successful",
      userInfo: {
        username: username,
        pictureUrl: "https://img.jpg",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
});

// to create a user
app.post("/registeruser", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if username already exists
    const userCheck = await pool.query(
      "SELECT username FROM translatorusers WHERE username = $1",
      [username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        ok: false,
        error: "Username already exists",
      });
    }

    // check password format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        ok: false,
        error:
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
      });
    }

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // store the username and hashed password in the database
    const newUser = await pool.query(
      "INSERT INTO translatorusers (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    return res.status(200).json({
      ok: true,
      user: newUser.rows[0],
      message: "User successfully created",
      userInfo: {
        username: username,
        pictureUrl: "https://img.jpg",
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// to search for a friend from the database
app.get("/searchusers", async (req, res) => {
  try {
    const query = req.query;

    if (!query) {
      return res.status(400).json({
        ok: false,
        error: "Search query is required.",
      });
    }

    const users = await pool.query(
      "SELECT username FROM translatorusers WHERE username ILIKE $1",
      [`%${query}%`]
    );

    return res.status(200).json({
      ok: true,
      users: users.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// to add the friend request to the database
app.post("/friendrequest", async (req, res) => {
  try {
    const { from, to, accepted } = req.body;

    const friendRequest = await pool.query(
      "INSERT INTO friendrequests (recipient, sender, accepted) VALUES ($1, $2, $3)",
      [from, to, accepted]
    );
    return res.status(200).json({
      ok: true,
      user: friendRequest.rows[0],
      message: "User successfully created",
      friendRequestInfo: {
        from: sender,
        to: recipient,
        accepted: accepted,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Socket.io connection between frontend and backend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("chat_message", (msg) => {
    io.emit("chat_message", msg);
    pool.query("INSERT INTO savedmessages (author, message) VALUES ($1, $2)", [
      msg.author,
      msg.message,
    ]);
  });
});

server.listen(5174, () => {
  console.log("Server is running on port 5174");
});
