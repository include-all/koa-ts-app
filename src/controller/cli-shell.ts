import { Context } from "koa";

var exec = require("child_process").exec;
var crypto = require("crypto");

class CliShell {
  public static async execCommander(
    commander: String
  ): Promise<{ error: Error; stdout: String }> {
    return new Promise((resolve) => {
      exec(commander, (error: Error, stdout: String) => {
        resolve({ error, stdout });
      });
    });
  }
  public static async signatureSecret(body: {}) {
    const SECRET = "github-webhooks-secret";
    return (
      "sha1=" +
      crypto.createHmac("sha1", SECRET).update(body.toString()).digest("hex")
    );
  }
  async updateFeModule(ctx: Context) {
    console.log(ctx.request.body);
    // 简单的鉴权
    const signature = await CliShell.signatureSecret(ctx.request.body);
    console.log(signature);
    if (signature !== ctx.headers["x-hub-signature"]) {
      ctx.body = "secret error";
      return;
    }
    const { error, stdout } = await CliShell.execCommander(
      "cli-shell update-module main"
    );
    if (error) {
      console.log(error);
      ctx.body = error;
    } else {
      console.log(stdout);
      ctx.body = stdout;
    }
  }
}

export default new CliShell();
