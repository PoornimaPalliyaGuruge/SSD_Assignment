// "use strict";
//
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const config = require("./config");
// const busRoutes = require("./routes/bus-routes");
// const driverRoutes = require("./routes/driver-routes");
// const rootRoutes = require("./routes/routes-routes");
// const scheduleRoutes = require("./routes/mondayschedule");
// const tuesdayRoute = require("./routes/tuesday-routes");
// const wednesdayRoute = require("./routes/wednesday-route");
// const thursdayRoute = require("./routes/thursday-route");
// const fridayRoute = require("./routes/friday-routes");
// const userRoute = require("./routes/user-routes");
//
// const corsOptions = {
//   origin: "http://localhost:3000",
// };
//
// const app = express();
//
// app.use(express.json());
//
// app.use(cors(corsOptions));
//
// app.use(bodyParser.json());
//
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
//
// app.use("/api/buses", busRoutes.routes);
// app.use("/api/drivers", driverRoutes.routes);
// app.use("/api/roots", rootRoutes.routes);
// app.use("/api/monday", scheduleRoutes.routes);
// app.use("/api/tuesday", tuesdayRoute.routes);
// app.use("/api/wednesday", wednesdayRoute.routes);
// app.use("/api/friday", fridayRoute.routes);
// app.use("/api/thursday", thursdayRoute.routes);
// app.use("/api/user", userRoute.routes);
//
// app.listen(config.port, () =>
//   console.log("App is listening on url http://localhost:" + config.port)
// );








//
// "use strict";
//
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const helmet = require("helmet"); // Import helmet for security headers
// const config = require("./config");
// const busRoutes = require("./routes/bus-routes");
// const driverRoutes = require("./routes/driver-routes");
// const rootRoutes = require("./routes/routes-routes");
// const scheduleRoutes = require("./routes/mondayschedule");
// const tuesdayRoute = require("./routes/tuesday-routes");
// const wednesdayRoute = require("./routes/wednesday-route");
// const thursdayRoute = require("./routes/thursday-route");
// const fridayRoute = require("./routes/friday-routes");
// const userRoute = require("./routes/user-routes");
//
// const corsOptions = {
//   origin: "http://localhost:3000",
// };
//
// const app = express();
//
// // Use Helmet to set security headers
// app.use(helmet());
//
// // Additional Helmet configurations if needed
// app.use(helmet.hsts({
//   maxAge: 31536000, // 1 year in seconds
//   includeSubDomains: true, // Apply to all subdomains
//   preload: true // Preload this HSTS policy
// }));
//
// app.use(helmet.contentSecurityPolicy({
//   useDefaults: true,
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'"], // Adjust as needed for your app
//     styleSrc: ["'self'", "'unsafe-inline'"], // Adjust as needed for your app
//     imgSrc: ["'self'", "data:"],
//     connectSrc: ["'self'"]
//   }
// }));
//
// app.use(helmet.frameguard({
//   action: 'deny'
// }));
//
// app.use(helmet.referrerPolicy({
//   policy: 'no-referrer'
// }));
//
// app.use(helmet.xssFilter());
//
// // Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
//
// app.use("/api/buses", busRoutes.routes);
// app.use("/api/drivers", driverRoutes.routes);
// app.use("/api/roots", rootRoutes.routes);
// app.use("/api/monday", scheduleRoutes.routes);
// app.use("/api/tuesday", tuesdayRoute.routes);
// app.use("/api/wednesday", wednesdayRoute.routes);
// app.use("/api/friday", fridayRoute.routes);
// app.use("/api/thursday", thursdayRoute.routes);
// app.use("/api/user", userRoute.routes);
//
// app.listen(config.port, () =>
//     console.log("App is listening on url http://localhost:" + config.port)
// );








"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
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

// Use Helmet to set security headers
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true,
  preload: true
}));
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"]
  }
}));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.xssFilter());

// Use CORS middleware
app.use(cors(corsOptions));

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
