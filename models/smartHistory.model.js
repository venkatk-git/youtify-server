const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoId: {
        type: String,
        required: true,
    },
    watchedAt: {
        type: Date,
        default: Date.now,
    },
});

const smartHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    maxHistorySize: {
        type: Number,
        min: 5,
        max: 15,
        required: true,
    },
    history: {
        type: [videoSchema],
        validate: {
            validator: function (v) {
                return v.length <= this.maxHistorySize;
            },
            message: (props) =>
                `History size exceeds the maximum allowed value of ${props.maxHistorySize}`,
        },
    },
});

smartHistorySchema.methods.addVideo = function (videoId) {
    const videoEntry = { videoId };
    this.history.unshift(videoEntry);

    if (this.history.length > this.maxHistorySize) {
        this.history.pop();
    }

    return this.save();
};

const SmartHistory = mongoose.model("SmartHistory", smartHistorySchema);

module.exports = SmartHistory;
