const http = require("http");
const requestIp = require("request-ip");

// Function to handle incoming requests
const requestListener = (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    console.log(clientIp);
    console.log(req.headers);
    if (req.url === "/webhook") {
        let body = "";

        // Collect data chunks
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        // Handle the end of data collection
        req.on("end", () => {
            console.log("Received webhook data:", body);

            // Respond to the webhook request
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({ message: "Webhook received successfully" }),
            );
        });
    } else {
        // Handle other routes
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
    }
};

// Create the HTTP server
const server = http.createServer(requestListener);

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
