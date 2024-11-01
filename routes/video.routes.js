const express = require("express");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";

router.get("/gettitle", async (req, res) => {
    const videoId = req.query.videoId;

    const url = `${YOUTUBE_API_URL}?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error fetching video title: ${response.statusText}`
            );
        }
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            if (data.items && data.items.length > 0) {
                res.status(200).json({
                    title: data.items[0].snippet.title,
                });
            }
        } else {
            res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to get title" });
        console.error("Error fetching video title:", error);
        throw error;
    }
});

module.exports = router;
