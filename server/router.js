import crypto from "crypto";
import nodeStatic from "node-static";
import { SECRET } from "../lib/constants.js";
import ConfigHandler from "./config.js";
import RendererHandler from "./renderer.js";
import RequestUtil from "./util.js";

const fileServer = new nodeStatic.Server("./build");

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

      if (["/config", "/render"].includes(req.url)) {
        if (!this.#validateRequest(req)) {
          RequestUtil.badRequest(401, "Bad secret")(req, res);
          return;
        }

        switch (req.url) {
          case "/config":
            ConfigHandler.serve(req, res);
            break;
          case "/render":
            if (req.method === "POST") {
              RendererHandler.render(req, res);
            } else {
              RequestUtil.badRequest(400, "Must be POST")(req, res);
            }

            break;
        }
      } else {
        req
          .addListener("end", function () {
            fileServer.serve(req, res);
          })
          .resume();
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
