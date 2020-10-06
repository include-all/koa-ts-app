import { Context } from "koa";

class Hello {
  async hello(ctx: Context) {
    ctx.body = {
      data: {
        msg: "hello world",
      },
    };
  }
}

export default new Hello();
