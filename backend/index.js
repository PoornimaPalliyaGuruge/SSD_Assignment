"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const busRoutes = require("./routes/bus-routes");
const driverRoutes = require("./routes/driver-routes");
const rootRoutes = require("./routes/routes-routes");
const scheduleRoutes = require("./routes/mondayschedule");
const tuesdayRoute = require("./routes/tuesday-routes");
const wednesdayRoute = require("./routes/wednesday-route");
const thursdayRoute = require("./routes/thursday-route");
const fridayRoute = require("./routes/friday-routes");
const userRoute = require("./routes/user-routes");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ['Content-Type', 'X-CSRF-TOKEN'],// Allow CSRF token header
}));

app.use(express.json());

app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// Set up CSRF protection
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection globally (for POST, PUT, DELETE requests)
app.use(csrfProtection);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Middleware to handle CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('Invalid CSRF token');
  }
  next();
});

// Route to send CSRF token to frontend
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use("/api/buses", busRoutes.routes);
app.use("/api/drivers", driverRoutes.routes);
app.use("/api/roots", rootRoutes.routes);
app.use("/api/monday", scheduleRoutes.routes);
app.use("/api/tuesday", tuesdayRoute.routes);
app.use("/api/wednesday", wednesdayRoute.routes);
app.use("/api/friday", fridayRoute.routes);
app.use("/api/thursday", thursdayRoute.routes);
app.use("/api/user", userRoute.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
