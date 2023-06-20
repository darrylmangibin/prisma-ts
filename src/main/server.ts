import "dotenv/config";

import App from "@main/app";
import AuthRoutes from "@resources/auth/auth.routes";
import UserRoutes from "@resources/user/user.routes";
import PostRoutes from "@resources/post/post.routes";

const PORT = Number(process.env.PORT || 5000);

export const server = new App(PORT, [
  new AuthRoutes(),
  new UserRoutes(),
  new PostRoutes(),
]);

export const app = server.express;
