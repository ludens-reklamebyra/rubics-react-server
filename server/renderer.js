import RequestUtil from "./util.js";

class RendererHandler {
  static render(req, res) {
    let body = "";

    req.on("data", function (data) {
      body += data;

      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on("end", function () {
      try {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const json = JSON.parse(body);
        res.end(JSON.stringify(json));
      } catch (error) {
        RequestUtil.badRequest(400, "Bad JSON")(req, res);
      }
    });
  }
}

export default RendererHandler;
