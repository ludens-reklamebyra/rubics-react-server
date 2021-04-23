import fs from "fs";
import path from "path";

class SeederHandler {
  static #seedDefinitions = SeederHandler.#readDefinitions();

  static serve(_, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(SeederHandler.#seedDefinitions);
  }

  static #readDefinitions() {
    const definitionsFile = fs.readFileSync(
      path.join(path.resolve(), "seeder.json")
    );

    return definitionsFile.toString("utf-8");
  }
}

export default SeederHandler;
