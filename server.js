const app = require("./app.js");
const { PORT } = require("./config/variables.js");

app.listen(PORT || 7000, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
