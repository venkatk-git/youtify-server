const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const SmartPlaylist = require("../models/smartPlaylist.model");

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

        const playlists = await SmartPlaylist.find({
            _id: { $in: userPlaylistIds },
        })
            .populate("owner", "username email")
            .select("title description owner")
            .lean();

        res.status(200).json({ playlists });
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/playlists/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const playlist = await SmartPlaylist.findById(id)
            .populate("owner", "username email")
            .lean();

        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/create", async (req, res) => {
    const { email, title, description } = req.body;

    if (!email || !title) {
        return res.status(400).json({ error: "Email and title are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newPlaylist = await SmartPlaylist.create({
            title,
            description: description || "",
            owner: user._id,
        });

        user.smartPlaylist.push(newPlaylist._id);
        await user.save();

        res.status(201).json({
            message: "Playlist created successfully",
            playlist: newPlaylist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/addItem", async (req, res) => {
    const { playlistId, type, referenceId } = req.body;

    if (!playlistId || !type || !referenceId) {
        return res
            .status(400)
            .json({ error: "playlistId, type, and referenceId are required" });
    }

    try {
        const playlist = await SmartPlaylist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        playlist.items.push({
            type,
            referenceId,
        });

        await playlist.save();

        res.status(200).json({
            message: "Item added to playlist successfully",
            playlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
