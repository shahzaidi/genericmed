// middleware/blockIndianIPs.js

const axios = require("axios");

// Function to extract client's IP address
const getClientIp = (req) => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    return ips[0].trim();
  }
  return req.connection.remoteAddress || req.socket.remoteAddress;
};

const blockIndianIPs = async (req, res, next) => {
  let clientIP = getClientIp(req);

  // For local testing purposes, consider IPv4-mapped IPv6 addresses
  if (clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.split(":").reverse()[0];
  }

  // Ignore local addresses for testing purposes
  const localAddresses = ["127.0.0.1", "::1"];
  if (localAddresses.includes(clientIP)) {
    console.log("Local testing IP detected:", clientIP);
    return next();
  }

  console.log("Client IP:", clientIP);

  try {
    const response = await axios.get(`http://ip-api.com/json/${clientIP}`);

    if (response.data.status === "fail") {
      console.error("Geolocation API error:", response.data.message);
      return next();
    }
    console.log(`response.data`, response.data);
    const country = response.data.country;

    if (country === "India") {
      return res.status(403).send("Access from India is restricted.");
    }

    next();
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    next();
  }
};

module.exports = blockIndianIPs;
