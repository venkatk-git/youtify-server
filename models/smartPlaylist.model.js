const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { playListItemsEnum } = require("./lib/constants");

const playlistItemSchema = new Schema({
    type: {
        type: String,
        enum: playListItemsEnum,
        required: true,
    },
    referenceId: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const smartPlaylistSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [playlistItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

smartPlaylistSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const SmartPlaylist = mongoose.model("SmartPlaylist", smartPlaylistSchema);

module.exports = SmartPlaylist;
