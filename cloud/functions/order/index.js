// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const orderListCollection = db.collection('orderList')

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const app = new TcbRouter({ event })
	app.router(
		'createOrder',
		async (ctx, next) => {
			const createRes = await orderListCollection.add({
				data: {
					...event.createData,
					createTime: db.serverDate()
				}
			})
			if (createRes._id) {
				// const { data: haveCurrentUser } = await userListCollection.where({ openid: wxContext.OPENID }).get()
				ctx.body = {
					data: createRes,
					code: 0,
					msg: '订单创建成功'
				}
			} else {
				ctx.body = {
					data: createRes,
					code: -1,
					msg: '订单创建失败'
				}
			}
		}
	)

	return app.serve()
}