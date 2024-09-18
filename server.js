const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/crud-users")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

const userRoutes = require("./routes/userRoutes.js");
app.use("/users", userRoutes);
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
