const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport");
const { CLIENT_ORIGIN } = require("./config/variables");
const app = express();

// Routes
const authRoutes = require("./routes/auth.routes");

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        credentials: true,
        origin: CLIENT_ORIGIN,
    })
);

app.use("/auth", authRoutes);

module.exports = app;
