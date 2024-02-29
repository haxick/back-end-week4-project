const fs = require("fs").promises;
const wordCount = require("word-count");
const http = require("http");

const files = ["file1.txt", "file2.txt", "file3.txt", "file4.txt"];

const server = http.createServer(async (req, res) => {
  try {
    const results = [];
    for (const file of files) {
      const data = await fs.readFile(file, "utf8");
      const numWords = wordCount(data);
      results.push(`${file}: ${numWords} words`);
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(results.join("\n"));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
