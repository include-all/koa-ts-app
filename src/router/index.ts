import Router from "koa-router";

// import controller
import Hello from "../controller/hello";
import CliShell from "../controller/cli-shell";

const router: Router = new Router();

router.prefix("/api");

router.get("/hello", Hello.say);

router.post("/updateFeModule", CliShell.updateFeModule);
router.post("/updateFeModuleByUserAgent", CliShell.updateFeModuleByUserAgent);

export default router;
