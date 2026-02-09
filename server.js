const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();
const rootDir = __dirname;

app.use(express.static(rootDir, { extensions: ["html"] }));

app.get("/api/html-files", async (req, res) => {
  try {
    const entries = await fs.readdir(rootDir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const name = entry.name;
      if (name.startsWith(".")) continue;
      if (name === "node_modules" || name === "server.js" || name === "package.json") continue;

      if (entry.isFile() && name.toLowerCase().endsWith(".html")) {
        files.push({
          name: name.replace(/\.html$/i, ""),
          path: name,
          type: "file"
        });
        continue;
      }

      if (entry.isDirectory()) {
        const indexPath = path.join(rootDir, name, "index.html");
        try {
          await fs.access(indexPath);
          files.push({
            name,
            path: `${name}/index.html`,
            type: "dir"
          });
        } catch {
          // Ignore directories without index.html
        }
      }
    }

    files.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Failed to read files" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
