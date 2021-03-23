import RequestUtil from "./util.js";

class Renderer {
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
        const json = JSON.parse(body);
        res.end(JSON.stringify(json));
      } catch (error) {
        RequestUtil.badRequest(400, "Bad JSON")(req, res);
      }
    });
  }
}

export default Renderer;
