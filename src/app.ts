import Koa from "koa";
import KoaLogger from "koa-logger";
import dayjs from "dayjs";
import bodyParser from "koa-body";
import KoaJwt from "koa-jwt";
// 配置
import { JWT_SECRET } from "./config/constant";
// 中间件
import parseToken from "./middleware/parseToken";
import tokenError from "./middleware/tokenError";

import router from "./router/index";

// 定时任务
// import scheduleStock from './schedule/stock'


const app: Koa = new Koa();

const logger = KoaLogger((str) => {
  console.log(dayjs().format("YYYY-MM-DD HH:mm:ss") + str);
});

app.use(logger);
// koa-body会自动解析application/json的body
app.use(bodyParser());

app.use(tokenError);
app.use(parseToken);

app.use(
  KoaJwt({ secret: JWT_SECRET }).unless({
    path: [/^\/api\/auth\/login/, /^\/api\/cliShell/, /^\/api\/open/,],
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`success start server`);
  console.log(`local: http://127.0.0.1:${port}`);
});

// scheduleStock()