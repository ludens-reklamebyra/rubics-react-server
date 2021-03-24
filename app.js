import Server from "./server/server.js";
import { PORT } from "./constants.js";
import bootstrapper from "./bootstrapper.js";

(async function start() {
  await bootstrapper.bootstrap();

  const server = new Server();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
