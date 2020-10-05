import Router from "koa-router";

// import controller
import Hello from "../controller/hello";
import CliShell from "../controller/cli-shell";
import Auth from "../controller/auth";

const router: Router = new Router();

router.prefix("/api");

// auth,登录权限
router.post("/auth/login", Auth.login);
router.get("/auth/testLogin", Auth.testLogin);

router.get("/hello", Hello.say);

router.post("/updateFeModule", CliShell.updateFeModule);
router.post("/updateFeModuleByUserAgent", CliShell.updateFeModuleByUserAgent);

export default router;
