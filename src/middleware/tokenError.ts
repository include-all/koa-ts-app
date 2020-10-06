import { Context, Next } from "koa";

const tokenError = async (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        errCode: 401,
        errMsg: err.message,
      };
    }
  });
};

export default tokenError;
