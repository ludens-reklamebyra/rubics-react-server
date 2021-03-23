import fs from "fs";
import path from "path";

const _configFileContent = parseConfig();

class ConfigHandler {
  static serve(_, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(_configFileContent);
  }
}

function parseConfig() {
  const configFile = fs.readFileSync(path.join(path.resolve(), "config.json"));
  return configFile.toString("utf-8");
}

export default ConfigHandler;
