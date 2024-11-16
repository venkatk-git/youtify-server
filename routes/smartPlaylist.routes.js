const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/playlists", async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userPlaylistIds = user.smartPlaylist || [];

        res.status(200).json({ playlists: userPlaylistIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
