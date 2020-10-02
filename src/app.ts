import Koa from "koa";
import bodyParser from "koa-body";
import router from "./router/index";

const app: Koa = new Koa();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

const port: number = 3000;
app.listen(port, () => {
  console.log(`success start server`);
  console.log(`local: http://127.0.0.1:${port}`);
});
