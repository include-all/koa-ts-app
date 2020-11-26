import { Context } from "koa";
const axios = require('axios')

class Open {
  async hello(ctx: Context) {
    const res = await axios.get('http://hq.sinajs.cn/list=sh601006', {
      headers:{
        "Content-Type": "application/javascript; charset=utf8"
      }
    })
    ctx.body = {
      data: {
        msg: res.data
      },
    };
  }
}

export default new Open();
