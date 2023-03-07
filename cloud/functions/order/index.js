// 云函数入口文件
const cloud = require("wx-server-sdk");
const TcbRouter = require("tcb-router");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

const db = cloud.database();
const orderListCollection = db.collection("orderList");
const userListCollection = db.collection("userList");

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const app = new TcbRouter({ event });
    // 创建订单
    app.router("createOrder", async (ctx, next) => {
        const { data: haveCurrentUser } = await userListCollection
            .where({ openid: wxContext.OPENID })
            .get();
        const createRes = await orderListCollection.add({
            data: {
                ...event.createData,
                orderStatus: 1,
                nickName: haveCurrentUser[0].nickName,
                avatarHttpsUrl: haveCurrentUser[0].avatarHttpsUrl,
                phoneNumer: haveCurrentUser[0].phoneNumer,
                createTime: db.serverDate(),
                openid: wxContext.OPENID,
            },
        });
        if (createRes._id) {
            // const { data: haveCurrentUser } = await userListCollection.where({ openid: wxContext.OPENID }).get()
            ctx.body = {
                data: createRes,
                code: 0,
                msg: "订单创建成功",
            };
        } else {
            ctx.body = {
                data: createRes,
                code: -1,
                msg: "订单创建失败",
            };
        }
    });
    // 获取某用户订单
    app.router("getOrderListByOpenid", async (ctx, next) => {
        const orderListRes = await orderListCollection
            .orderBy("createTime", "desc")
            .where({
                openid: wxContext.OPENID,
            })
            .get();
        ctx.body = {
            data: orderListRes.data,
            code: 0,
            msg: "获取成功",
        };
    });
    // 获取所有订单
    app.router("getOrderList", async (ctx, next) => {
        const orderListRes = await orderListCollection.get();
        ctx.body = {
            data: orderListRes.data,
            code: 0,
            msg: "获取成功",
        };
    });
    return app.serve();
};
