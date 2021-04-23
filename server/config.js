import fs from "fs";
import path from "path";

class ConfigHandler {
  static #configFile = ConfigHandler.#readConfig();

  static serve(_, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(ConfigHandler.#configFile);
  }

  static #readConfig() {
    const configFile = fs.readFileSync(
      path.join(path.resolve(), "config.json")
    );

    return configFile.toString("utf-8");
  }
}

export default ConfigHandler;
