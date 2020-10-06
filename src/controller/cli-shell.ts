import { Context } from "koa";

var exec = require("child_process").exec;
var crypto = require("crypto");

class CliShell {
  // 封装exec为promise形式
  public static async execCommander(
    commander: String
  ): Promise<{ error: Error; stdout: String }> {
    return new Promise((resolve) => {
      exec(commander, (error: Error, stdout: String) => {
        resolve({ error, stdout });
      });
    });
  }

  // 根据密钥签名
  public static async signatureSecret(body: {}) {
    const SECRET = "github-webhooks-secret";
    return (
      "sha1=" +
      crypto
        .createHmac("sha1", SECRET)
        .update(JSON.stringify(body))
        .digest("hex")
    );
  }

  // 执行命令，开始升级
  public static async execUpdate(ctx: Context) {
    const { error, stdout } = await CliShell.execCommander(
      "cli-shell update-module main"
    );
    if (error) {
      console.log(error);
      ctx.body = {
        errCode: 1002,
        errMsg: error,
      };
    } else {
      console.log(stdout);
      ctx.body = {
        data: {
          msg: stdout,
        },
      };
    }
  }

  // 根据签名验签
  async updateFeModule(ctx: Context) {
    console.log(ctx.request.body);
    // 简单的鉴权
    const signature = await CliShell.signatureSecret(ctx.request.body);
    console.log(`signature: ${signature}`);
    console.log(
      `ctx.headers["x-hub-signature"]: ${ctx.headers["x-hub-signature"]}`
    );
    if (signature !== ctx.headers["x-hub-signature"]) {
      ctx.body = {
        errCode: 1001,
        errMsg: "secret error",
      };
      return;
    }
    await CliShell.execUpdate(ctx);
  }

  // 根据userAgent验证
  async updateFeModuleByUserAgent(ctx: Context) {
    console.log(ctx.request.body);
    if (
      !ctx.headers["User-Agent"] ||
      !ctx.headers["User-Agent"].includes("GitHub-Hookshot")
    ) {
      ctx.body = "user-agent error";
      return;
    }
    await CliShell.execUpdate(ctx);
  }
}

export default new CliShell();
