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
  async updateFeModule(ctx: Context) {
    const payload = JSON.parse(ctx.request.body.payload);
    console.log(payload.repository.owner.node_id);
    if (payload.repository.owner.node_id !== "MDQ6VXNlcjE2MzQ5ODg1") {
      ctx.body = "id error";
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
