const app = require("./app.js");
const mongoose = require("mongoose");
const { PORT, DB_ATLAS } = require("./config/variables.js");

mongoose
    .connect(DB_ATLAS)
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT || 7000, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
