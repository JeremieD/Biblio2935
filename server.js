const http = require("http");
const fs = require("fs").promises;
fs.readFileSync = require("fs").readFileSync;
const uri = require("./server/util/uri.js");
const static = require("./server/web/static.js");
const config = require("./server/util/config.js");

const api = require("./server/app/api.js");

const requestListener = (req, res) => {
  const path = new uri.URIPath(req.url);
  const pathname = path.pathname;
  const parameters = path.parameters;

  switch (req.method) {
    case "GET":
      // Request for client interface
      if (pathname === "/") {
        static.serveFile(req, res, "/index.html");

      // Client requests files
      } else if (req.url.startsWith("/resources/") || req.url.startsWith("/shared/")) {
        static.serveFile(req, res);

      // API Request
      } else if (req.url.startsWith("/api")) {
        api.processRequest(req, res);

      // Serve 404 error
      } else {
        static.serveError(res);
      }

      break;

    // Protocol is unsupported
    default:
      static.serveError(res, "", 405);
  }
};

const server = http.createServer(requestListener);

const localHostname = "0.0.0.0";
const localPort = 8200;
server.listen(localPort, localHostname, () => {
  console.log(`Server is running.`);
});
