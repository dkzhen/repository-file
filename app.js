const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const downloadFolderPath = path.join(__dirname, "download"); // Specify the folder path

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(downloadFolderPath, filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

app.get("/", (req, res) => {
  fs.readdir(downloadFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res.status(500).send("Error reading folder");
    } else {
      const fileList = files.map((file) => ({
        filename: file,
        downloadUrl: `/download/${file}`,
      }));

      const fileLinks = fileList
        .map((file) => `<a href="${file.downloadUrl}">${file.filename}</a>`)
        .join("<br>");

      res.send(`Files available for download:<br>${fileLinks}`);
    }
  });
});

app.listen(2023, () => {
  console.log("Server is running on port 3000");
});
