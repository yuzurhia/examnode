import http from "node:http";
import { readFileSync } from "node:fs";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();

const data = JSON.parse(readFileSync("./Data/students.json", "utf8"));
const { students } = data;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const htmlContent = readFileSync("./view/home.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  } else if (req.url === "/students") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const studentsJSON = JSON.stringify(students);
    res.end(studentsJSON);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = process.env.APP_PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
