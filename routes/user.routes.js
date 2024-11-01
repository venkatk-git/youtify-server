const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, email, details, smartPlaylist, smartHistory } =
            req.body;

        // Create a new user document
        const user = new User({
            username,
            email,
            details: {
                contentPreferences: details.contentPreferences || [],
                favoriteChannels: details.favoriteChannels || [],
                languagePreference: details.languagePreference || ["en"],
                videoLengthPreference: details.videoLengthPreference || ["any"],
                timeLimit: details.timeLimit || 30,
                goal: details.goal,
                refreshFrequency: details.refreshFrequency || "daily",
                dislikedTopics: details.dislikedTopics || [],
            },
            smartPlaylist: smartPlaylist || [],
            smartHistory: smartHistory || [],
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
});

module.exports = router;
