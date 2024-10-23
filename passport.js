const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const {
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
} = require("./config/variables");
const { scope } = require("./utils/constants");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope,
        },
        function (accessToken, refreshToken, profile, callback) {
            profile.accessToken = accessToken;
            callback(null, profile);
        }
    )
);
