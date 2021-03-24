import fs from "fs";
import path from "path";

class Bootstrapper {
  components;
  css;

  async bootstrap() {
    this.components = await this.#readComponents();
    this.css = await this.#readCss();
  }

  async #readComponents() {
    const map = {};
    const files = fs.readdirSync(
      path.join(path.resolve(), "client-build/components")
    );

    for (const file of files) {
      if (file.endsWith(".js")) {
        const module = await import(
          path.join(path.resolve(), "client-build/components", file)
        );

        map[path.basename(file, ".js")] = module.default;
      }
    }

    return map;
  }

  #readCss() {
    const map = {};
    const files = fs.readdirSync(path.join(path.resolve(), "client/css"));

    for (const file of files) {
      if (file.endsWith(".css") && file !== "base.css") {
        const css = fs
          .readFileSync(path.join(path.resolve(), "client/css", file))
          .toString("utf-8");

        map[path.basename(file, ".css")] = css;
      }
    }

    return map;
  }
}

export default new Bootstrapper();
