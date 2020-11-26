const Sequelize = require('sequelize')
const dbSecret = require('./db_secret')

const db = {
  database: 'db_koa_ts_app', // 使用哪个数据库
  username: 'xxx', // 用户名
  password: 'xxxxxx', // 口令
  host: 'xxx.xx.xxx.xxx', // 主机名
  port: 3306, // 端口号，MySQL默认3306
  ...dbSecret.db_mysql
}

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  //解决中文输入问题
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  }
})

module.exports = { sequelize }
