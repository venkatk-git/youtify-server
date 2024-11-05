const express = require("express");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";

router.get("/getVideoTitle", async (req, res) => {
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

router.get("/getChannelInfo", async (req, res) => {
    const videoId = req.query.videoId;

    const url = `${YOUTUBE_API_URL}?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error fetching channel info: ${response.statusText}`
            );
        }
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const snippet = data.items[0].snippet;
            res.status(200).json({
                channelName: snippet.channelTitle,
                channelLogo: snippet.thumbnails.default.url, // Use "default", "medium", or "high" based on the desired size
            });
        } else {
            res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to get channel info" });
        console.error("Error fetching channel info:", error);
        throw error;
    }
});

module.exports = router;
