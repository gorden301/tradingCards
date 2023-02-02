// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require("wx-server-sdk");

// 初始化 cloud
cloud.init({
	// API 调用都保持和云函数当前所在环境一致
	env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const userListCollection = db.collection("userList")
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async (event = {}, context = {}) => {
	// 可执行其他自定义逻辑
	// console.log 的内容可以在云开发云函数调用日志查看
	const { data: dbUserList } = await userListCollection.get();
	console.log('dbUserList', dbUserList)
	// 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
	const wxContext = cloud.getWXContext();
	if (dbUserList.length === 0) {
		const addResult = await userListCollection.add({
			data: {
				...event,
				openid: wxContext.OPENID,
				unionid: wxContext.UNIONID,
				createTime: db.serverDate()
			}
		})
		if(addResult._id) {
			// console.log("插入成功", res)
			const { data: haveCurrentUser } = await userListCollection.where({ openid: wxContext.OPENID }).get()
			return {
				code: 0,
				data: haveCurrentUser,
				msg: '插入成功',
				...addResult
			}
		} else {
			return {
				code: -1,
				msg: '插入失败',
			}
		}
		// .then(async res => {
		// })
	} else {
		const { data: haveCurrentUser } = await userListCollection.where({ openid: wxContext.OPENID }).get()
		if (haveCurrentUser.length > 0) {
			console.log("当前微信用户已存在")
			return {
				code: -1,
				msg: "当前微信用户已存在！",
			}
		} else {
			const addResult = await userListCollection.add({
				data: {
					...event,
					openid: wxContext.OPENID,
					unionid: wxContext.UNIONID,
					createTime: db.serverDate()
				}
			})
			if(addResult._id) {
				// console.log("插入成功", res)
				const { data: haveCurrentUser } = await userListCollection.where({ openid: wxContext.OPENID }).get()
				return {
					code: 0,
					data: haveCurrentUser,
					msg: '插入成功',
					...addResult
				}
			} else {
				return {
					code: -1,
					msg: '插入失败',
				}
			}
		}
	}
	// return {
	// 	event,
	// 	openid: wxContext.OPENID,
	// 	appid: wxContext.APPID,
	// 	unionid: wxContext.UNIONID,
	// 	env: wxContext.ENV,
	// };
};
