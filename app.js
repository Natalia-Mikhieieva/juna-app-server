// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

//ADDED BY NATALIA
const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT

const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
//  ADDED ROUTES HERE by Natalia

const catalogRoutes = require("./routes/catalog.routes");
app.use("/api", catalogRoutes);

const itemRoutes = require("./routes/item.routes");
app.use("/api", itemRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/api", commentRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
