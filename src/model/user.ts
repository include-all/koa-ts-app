import * as Sequelize from "sequelize"
import { mysql } from './mysql'
const modelName = 'user'
const schema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '用户id',
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户名',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户密码',
  }
}

const options = {
  createdAt: 'create_time',
  updatedAt: 'update_time',
  freezeTableName: true,
}

interface BaseUser {
  id?: number;
  username: string;
  password: string;
}

interface IUser extends Sequelize.Model<BaseUser>, BaseUser { }

// 模型实例
const User = mysql.define<IUser>(
  modelName,
  schema,
  options,
)

export { User, IUser }