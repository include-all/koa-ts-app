import { Context } from "koa";
import axios from "axios"

class Open {
  async hello(ctx: Context) {
    const res = await axios.get('http://hq.sinajs.cn/list=sh601006', {
      headers: {
        "Content-Type": "application/javascript; charset=utf8"
      }
    })
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = {
      data: {
        msg: res.data
      },
    };
  }
}

export default new Open();
