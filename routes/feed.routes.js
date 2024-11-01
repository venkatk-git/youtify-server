const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/user.model");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchUserDetails(req, res, next) {
    const email = req.query.email; 

    console.log(email);

    if (!email) {
        return res
            .status(400)
            .json({ error: "Email query parameter is required" });
    }

    try {
        const user = await User.findOne({ email }, "details"); 

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("Error fetching user details:", error); 
        res.status(500).json({ error: "Error fetching user details" });
    }
}

router.get("/generic", fetchUserDetails, async (req, res) => {
    try {
        const { languagePreference } = req.user.details;

        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: YOUTUBE_API_KEY,
                    type: "video",
                    videoCaption: "any",
                    regionCode: "US",
                    maxResults: 6,
                },
            }
        );

        res.json(response.data.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch generic feed" });
    }
});

router.get("/content-channels", fetchUserDetails, async (req, res) => {
    try {
        const { contentPreferences, favoriteChannels } = req.user.details;
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: YOUTUBE_API_KEY,
                    type: "video",
                    q: "meme" + "pewdiepie, mr beast, speed",
                    maxResults: 6,
                },
            }
        );

        res.json(response.data.items);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch content and channels feed",
        });
    }
});

router.get("/goal", fetchUserDetails, async (req, res) => {
    try {
        const { goal } = req.user.details;
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: YOUTUBE_API_KEY,
                    type: "video",
                    q: goal,
                    maxResults: 6,
                },
            }
        );
        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goal-based feed" });
    }
});

module.exports = router;
