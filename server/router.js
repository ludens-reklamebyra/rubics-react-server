import crypto from "crypto";
import finalhandler from "finalhandler";
import serveStatic from "serve-static";
import { SECRET } from "../constants.js";
import RendererHandler from "./renderer.js";
import RequestUtil from "./util.js";

const fileServer = serveStatic("public");

class Router {
  constructor() {
    return this.#createRouter();
  }

  #createRouter() {
    return (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Request-Method", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
      res.setHeader("Access-Control-Allow-Headers", "*");

      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
      }

      if (["/render"].includes(req.url)) {
        if (!this.#validateRequest(req)) {
          RequestUtil.badRequest(401, "Bad secret")(req, res);
          return;
        }

        if (req.method === "POST") {
          RendererHandler.render(req, res);
        } else {
          RequestUtil.badRequest(400, "Must be POST")(req, res);
        }
      } else {
        fileServer(req, res, finalhandler(req, res));
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
