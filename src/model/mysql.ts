import { Sequelize } from 'sequelize'
import { db_mysql } from '../config/mysql_secret'

const db = {
  database: 'db_koa_ts_app', // 使用哪个数据库
  ...db_mysql
}

const mysql = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  //解决中文输入问题
  define: {
    charset: 'utf8',
  },
  dialectOptions: {
    collate: 'utf8_general_ci'
  }
})

export { mysql }