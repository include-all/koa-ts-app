import Router from "koa-router";

// import controller
import Open from "../controller/open";
import CliShell from "../controller/cli-shell";
import Auth from "../controller/auth";

const router: Router = new Router();

router.prefix("/api");

// auth,登录权限
router.post("/auth/login", Auth.login);
router.get("/auth/testLogin", Auth.testLogin);

// hello,测试
router.get("/open/hello", Open.hello);

// cliShell
router.post("/cliShell/updateFeModule", CliShell.updateFeModule);
router.post(
  "/cliShell/updateFeModuleByUserAgent",
  CliShell.updateFeModuleByUserAgent
);

export default router;
