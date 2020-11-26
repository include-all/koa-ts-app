const schedule = require('node-schedule')
const axios = require('axios')
const iconv = require('iconv-lite');


const scheduleStock = () => {
  // 按照规则执行定时任务
  const rule = new schedule.RecurrenceRule();
  const dayOfWeekRule = [1, 2, 3, 4, 5]
  const hourRule = [9, 10, 11, 13, 14, 15]
  const secondRule = [1, 30];
  rule.dayOfWeek = dayOfWeekRule
  rule.hour = hourRule
  rule.second = secondRule;

  schedule.scheduleJob(rule, async () => {
    await getStockInfo()
  })
}

const getStockInfo = async () => {
  const res = await axios.get('http://hq.sinajs.cn/list=sh601006', {
    responseType: 'arraybuffer'
  })
  // 转义数据
  const data = iconv.decode(Buffer.from(res.data), 'gbk');
  console.log(data)
}


export default scheduleStock