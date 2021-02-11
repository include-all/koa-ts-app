/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '../model/user'

const UserSvc = {
  async getUserLoginInfo(username: string) {
    const res = await User.findOne({
      where: {
        username,
      }
    })
    return res
  }
}

export default UserSvc