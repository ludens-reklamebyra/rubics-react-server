import Server from "./server/server.js";
import { PORT } from "./lib/constants.js";

const server = new Server();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
