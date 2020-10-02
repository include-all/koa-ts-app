import Router from "koa-router";

// import controller
import Hello from "../controller/hello";
import CliShell from "../controller/cli-shell";

const router: Router = new Router();

router.prefix("/api");

router.get("/hello", Hello.say);

router.get("/updateFeModule", CliShell.updateFeModule);
export default router;
