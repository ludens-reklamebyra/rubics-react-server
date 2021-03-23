import crypto from "crypto";
import { SECRET } from "../lib/constants.js";
import Renderer from "./renderer.js";
import RequestUtil from "./util.js";

class Router {
  constructor() {
    return this.#createRouter();
  }

  #createRouter() {
    return (req, res) => {
      if (!this.#validateRequest(req)) {
        RequestUtil.badRequest(401, "Bad secret")(req, res);
        return;
      }

      switch (req.url) {
        case "/render":
          if (req.method === "POST") {
            Renderer.render(req, res);
          } else {
            RequestUtil.badRequest(400, "Must be POST")(req, res);
          }

          break;
        default:
          RequestUtil.badRequest(404, "Bad endpoint")(req, res);
          break;
      }
    };
  }

  #validateRequest(req) {
    const secret = req.headers["x-rubics-secret"] || "";

    try {
      return crypto.timingSafeEqual(Buffer.from(secret), Buffer.from(SECRET));
    } catch (error) {
      return false;
    }
  }
}

export default Router;
