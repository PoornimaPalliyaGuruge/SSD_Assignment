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

// Using https
const https = require('https');
const fs = require('fs');

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



// Define paths to your certificate files
const privateKey = fs.readFileSync('./certs/private-key.pem', 'utf8');
const certificate = fs.readFileSync('./certs/certificate.pem', 'utf8');
// Optionally include CA bundle if provided
// const ca = fs.readFileSync('path/to/ca_bundle.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca: ca // Uncomment if you have a CA bundle
};


const corsOptions = {
  origin: "https://localhost:3000", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
  allowedHeaders: ["Content-Type"], // Allow these headers
  credentials: true // Allow cookies if needed
};

const app = express();

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
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

// app.listen(config.port, () =>
//     console.log("App is listening on url https://localhost:" + config.port)
// );


// Create an HTTPS server
https.createServer(credentials, app).listen(config.port, () => {
  console.log("App is listening on url https://localhost:" + config.port);
});
