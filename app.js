const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport");
const { CLIENT_ORIGIN } = require("./config/variables");
const app = express();

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const feedRoutes = require("./routes/feed.routes");
const videoRoutes = require("./routes/video.routes");
const smartPlaylistRoutes = require("./routes/smartPlaylist.routes.js");

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

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/smartPlaylists", smartPlaylistRoutes);

module.exports = app;
