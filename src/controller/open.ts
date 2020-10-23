import { Context } from "koa";

class Open {
  async hello(ctx: Context) {
    ctx.body = {
      data: {
        msg: "hello world, test webhooks-script, count 3",
      },
    };
  }
}

export default new Open();
