
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Upload folder path
const uploadDir = path.join(
  process.cwd(),
  "uploads",
  "profiles"
);

// Check if folder exists; create it if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("Upload folder created successfully");
} else {
//   console.log("Upload folder already exists");
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}` +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  },
});

// Allow image files only
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
});

module.exports = upload;

