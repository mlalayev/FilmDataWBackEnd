const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const filmRoutes = require("./routes/filmRoutes");

// Enable CORS for all routes
app.use(cors({
  origin: 'http://127.0.0.1:5500'  // Allow requests from your frontend domain
}));

// Middleware for parsing JSON
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", filmRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/filmsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
