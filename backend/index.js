// "use strict";
//
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const helmet = require("helmet");
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
//   origin: "http://localhost:3000", // Allow requests from frontend
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
//   allowedHeaders: ["Content-Type"], // Allow these headers
// };
//
// const app = express();
//
// // Use Helmet to set security headers
// app.use(helmet());
// app.use(helmet.hsts({
//   maxAge: 31536000, // 1 year in seconds
//   includeSubDomains: true,
//   preload: true
// }));
// app.use(helmet.contentSecurityPolicy({
//   useDefaults: true,
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//     imgSrc: ["'self'", "data:"],
//     connectSrc: ["'self'"]
//   }
// }));
// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
// app.use(helmet.xssFilter());
//
// // Use CORS middleware
// app.use(cors(corsOptions));
//
// app.use(express.json());
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
const rateLimit = require("express-rate-limit");

// Define the rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 login attempts per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes"
});

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
  allowedHeaders: ["Content-Type"], // Allow these headers
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

// Apply the rate limiter to the login route
app.use("/api/user/login", loginLimiter);

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

