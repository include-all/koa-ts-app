import userSchema from './schema/user'
const db = require('../../config/mysql.js')


class User {
  private model;
  constructor(){
    this.model = db.sequelize.define(
      userSchema.modelName,
      userSchema.schema,
      userSchema.options,
    )
  }
  async getUserLoginInfo(username: string){
    return await this.model.findOne({
      where: {
        username,
      }
    })
  }
}

export default new User()