#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.log("Usage: npx easy-backend-setup <project-name>");
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);
const packageRoot = path.resolve(__dirname, "..");

if (fs.existsSync(projectPath)) {
  console.error(`Folder already exists: ${projectName}`);
  process.exit(1);
}

const filesToCopy = [
  "index.js",
  "config",
  "controller",
  "middleware",
  "model",
  "routes"
];

fs.mkdirSync(projectPath, { recursive: true });

for (const item of filesToCopy) {
  const source = path.join(packageRoot, item);
  const destination = path.join(projectPath, item);

  if (fs.existsSync(source)) {
    fs.cpSync(source, destination, { recursive: true });
  }
}

const generatedPackage = {
  name: projectName.toLowerCase().replace(/[^a-z0-9._-]/g, "-"),
  version: "1.0.0",
  main: "index.js",
  scripts: {
    start: "node index.js",
    dev: "nodemon index.js"
  },
  dependencies: {
    express: "^5.2.1",
    mongoose: "^9.10.2",
    cors: "^2.8.6",
    dotenv: "^18.0.3",
    bcrypt: "^6.0.0",
    multer: "^2.4.0",
    jsonwebtoken: "^9.0.3"
  },
  devDependencies: {
    nodemon: "^3.1.14"
  }
};

fs.writeFileSync(
  path.join(projectPath, "package.json"),
  JSON.stringify(generatedPackage, null, 2)
);

console.log(`\nBackend project created: ${projectPath}`);
console.log("\nNext steps:");
console.log(`  cd "${projectName}"`);
console.log("  npm install");
console.log("  npm run dev");
console.log("\nConfigure your .env file before starting the server.");
