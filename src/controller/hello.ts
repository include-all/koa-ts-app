import { Context } from "koa";

class Hello {
  async say(ctx: Context) {
    ctx.body = "hello world";
  }
}

export default new Hello();
