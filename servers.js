import http from "node:http";
import { readFileSync } from "node:fs";
import dotenv from "dotenv";

dotenv.config();

const data = JSON.parse(readFileSync("./Data/students.json", "utf8"));
const { students } = data;

const server = http.createServer((req, res) => {
  //html
  if (req.url === "/") {
    const htmlContent = readFileSync("./view/home.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  } else if (req.url === "/users") {
    const htmlContent = readFileSync("./view/users.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  }
  //css
  else if (req.url === "/css/style.css") {
    const cssContent = readFileSync("./assets/css/styles.css", "utf8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(cssContent);
  }
  //json
  else if (req.url === "/students") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const studentsJSON = JSON.stringify(students);
    res.end(studentsJSON);
  }

  //form
  else if (req.url === "/add-user" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const name = formData.get("name");
      const birth = formData.get("birth");

      students.push({ name, birth });
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  }
  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = process.env.APP_PORT || process.env.APP_LOCALHOST;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
