import http from "http";
import Router from "./router.js";

class Server {
  constructor() {
    return this.#createServer();
  }

  #createServer() {
    return http.createServer(new Router());
  }
}

export default Server;
