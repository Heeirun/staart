const fs = require("fs-extra");
const path = require("path");

const incrementVersion = async () => {
  const pkg = JSON.parse(
    (await fs.readFile(path.join(__dirname, "..", "package.json"))).toString()
  );
  const newVersion = pkg.version
    .split(".")
    .map((a, i) => (i === 2 ? parseInt(a) + 1 : a))
    .join(".");
  pkg.version = newVersion;
  await fs.writeFile(
    path.join(__dirname, "..", "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  await fs.writeFile(
    path.join(__dirname, "..", "src", "internal", "staart-version"),
    newVersion
  );
};

incrementVersion()
  .then(() => {})
  .catch(error => console.log("ERROR", error))
  .then(() => process.exit(0));
