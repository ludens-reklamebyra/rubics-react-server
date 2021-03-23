class RequestUtil {
  static badRequest(code, error) {
    return function badRequestHandler(_, res) {
      res.writeHead(code);
      res.end(error);
    };
  }
}

export default RequestUtil;
