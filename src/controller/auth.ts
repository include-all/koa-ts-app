import { Context } from "koa";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt-secret";

class Auth {
  async login(ctx: Context) {
    const userInfo: { username: string; password: string } = ctx.request.body;
    console.log(userInfo);
    const token = jsonwebtoken.sign(
      // payload
      {
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      JWT_SECRET
    );
    ctx.cookies.set("app_token", token, {
      maxAge: 60 * 60 * 1000,
      overwrite: true,
      httpOnly: false,
    });
    ctx.body = {
      token,
    };
  }
  async testLogin(ctx: Context) {
    // 经过koa-jwt后，会将payload放在crx.state.user中
    ctx.body = ctx.state.user;
  }
}

export default new Auth();
