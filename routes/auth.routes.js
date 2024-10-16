const router = require("express").Router();
const passport = require("passport");
const { CLIENT_ORIGIN } = require("../config/variables");
const { scope } = require("../utils/constants");

router.get("/login/success", (req, res) => {
    const { user } = req;

    if (!user) {
        res.status(403).json({
            error: true,
            message: "Forbidden",
        });

        return;
    }

    res.status(200).json({
        error: false,
        message: "Successfully logged in",
        user,
    });
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure :(",
    });
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_ORIGIN,
        failureRedirect: "/login/failed",
    })
);

router.get(
    "/google",
    passport.authenticate("google", [
        "profile",
        "email",
        "https://www.googleapis.com/auth/youtube.readonly",
    ])
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_ORIGIN);
});

module.exports = router;
