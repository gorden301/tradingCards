// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const userListCollection = db.collection('userList')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new TcbRouter({ event })
  app.router(
    "updateUserAvatar",
    async (ctx, next) => {
      const res = await userListCollection.where({
        openid: wxContext.OPENID
      }).update({
        data: {
          avatar: event.avatar,
          avatarHttpsUrl: event.avatarHttpsUrl
        }
      })
      ctx.body = {
        data: res,
        code: 0,
        msg: '头像更新成功'
      }
    }
  )

  return app.serve()
}