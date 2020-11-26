import { Context } from "koa";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt-secret";
import User from "../model/user"

// const path = require("path");
// const fs = require("fs");

interface UserInfo {
  id?: number;
  username: string;
  password: string;
}

class Auth {
  async login(ctx: Context) {
    const loginInfo: UserInfo = ctx.request.body;
    console.log(loginInfo);

    // const userFilePath = path.join(__dirname, "../../static/json/user.json");
    // const userList = JSON.parse(fs.readFileSync(userFilePath).toString());
    // const userInfo: UserInfo | undefined = userList.filter((user: UserInfo) => {
    //   return user.username === loginInfo.username;
    // })[0];

    try{
      const userInfo: UserInfo = await User.getUserLoginInfo(loginInfo.username)
      console.log(userInfo)

      // 用户不存在
      if (!userInfo) {
        ctx.body = {
          errCode: 1003,
          errMsg: "该用户不存在",
        };
        return;
      }

      // 密码错误
      if (loginInfo.password !== userInfo.password) {
        ctx.body = {
          errCode: 1004,
          errMsg: "密码错误",
        };
        return;
      }

      const token = jsonwebtoken.sign(
        // payload
        {
          username: loginInfo.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h
        },
        JWT_SECRET
      );
      ctx.cookies.set("app_token", token, {
        maxAge: 60 * 60 * 1000,
        overwrite: true,
        httpOnly: false,
      });
      ctx.body = {
        success: true,
        token,
      };
    }catch(err){
      console.log(err)
    }
  }
  
  async testLogin(ctx: Context) {
    // 经过koa-jwt后，会将payload放在crx.state.user中
    ctx.body = { data: ctx.state.user };
  }
}

export default new Auth();
