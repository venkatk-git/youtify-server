const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
    vedioLengthPreferenceEnum,
    refreshFrequencyEnum,
} = require("./lib/constants");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    details: {
        contentPreferences: {
            type: [String],
            default: [],
            required: true,
        },
        favoriteChannels: {
            type: [String],
            default: [],
        },
        languagePreference: {
            type: String,
            default: "en",
            required: true,
        },
        videoLengthPreference: {
            type: String,
            enum: vedioLengthPreferenceEnum,
            default: "any",
        },
        timeLimit: {
            type: Number,
            default: 30,
        },
        goal: {
            type: String,
            required: true,
        },
        refreshFrequency: {
            type: String,
            enum: refreshFrequencyEnum,
            default: "daily",
        },
        dislikedTopics: {
            type: [String],
            default: [],
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    smartPlaylist: {
        type: [String],
        default: [],
    },

    smartHistory: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema);
