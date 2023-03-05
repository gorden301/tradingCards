import { Image, View } from "@tarojs/components"
import BaseWrap from "@/components/baseWrap"
import PsaLogo from "@/assets/logo/psa.png"
import './index.scss'
import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { formatDateTime } from "@/utils/format"

const orderStatus = {
    1: "订单待确认",
	2: "订单已确认",
	3: "评级已寄出",
	4: "评级已出分",
	5: "评级回途中",
	6: "订单已完成"
}
const UserOrder: React.FC<{}> = () => {
    const [orderList, setOrderList] = useState([])
    const getOrderList = async () => {
        const orderListRes: any = await Taro.cloud.callFunction({
            name: 'order',
            data: {
                $url: 'getOrderListByOpenid'
            }
        })
        if (orderListRes?.result?.code == 0) {
            setOrderList(orderListRes?.result.data)
        } else {
            Taro.showToast({
                title: '获取订单列表失败',
                icon: 'error',
                duration: 2000
            })
        }
    }
    useEffect(() => {
        getOrderList()
    }, [])
    return (
        <BaseWrap>
            <View className="userOrder">
                {orderList && orderList.length > 0 && orderList.map((item: any, index: number) => <View key={index} className="order_module">
                    <View className="header">
                        <View>订单状态:</View>
                        <View>{orderStatus[item.orderStatus]}</View>
                    </View>
                    <View className="body">
                        {item.cardImgs.length > 0 ? <Image className="img" mode="aspectFill" src={item.cardImgs[0]}></Image> : <Image className="img" src={PsaLogo}></Image>}
                        <View>
                            <View>卡片数量: {item.cardNumber}</View>
                        </View>
                    </View>
                    <View className="footer">
                        <View>{formatDateTime(item.createTime)}</View>
                        <View>总计：200元</View>
                    </View>
                </View>)}
            </View>
        </BaseWrap>
    )
}

export default UserOrder
