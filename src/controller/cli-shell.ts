import { Context } from "koa";

var exec = require("child_process").exec;

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
