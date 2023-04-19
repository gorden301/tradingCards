import { Image, View, Swiper, SwiperItem } from "@tarojs/components"
import BaseWrap from "@/components/baseWrap"
import PsaLogo from "@/assets/logo/psa.png"
import './index.scss'
import { useEffect, useState } from "react"
import Taro, { useDidShow } from "@tarojs/taro"
import { formatDateTime } from "@/utils/format"

let pageNo = 1
let pageSize = 10
const Service: React.FC<{}> = () => {
    let [orderList, setOrderList] = useState([])
    const [orderType, setOrderType] = useState<number>(1)
    const [noMore, setNoMore] = useState<boolean>(false)
    const getOrderList = async (type: number) => {
        Taro.showLoading({
            title: '加载中...'
        })
        const orderListRes: any = await Taro.cloud.callFunction({
            name: 'order',
            data: {
                $url: 'getShareList',
                params: {
                    orderType: type,
                    pageNo,
                    pageSize
                }
            }
        })
        Taro.hideLoading()
        if (orderListRes?.result?.code == 0) {
            pageNo++
            setOrderList(orderList.concat(orderListRes?.result.data))
            if (orderListRes?.result.data?.length < pageSize) {
                setNoMore(true)
            } else {
                setNoMore(false)
            }
        } else {
            Taro.showToast({
                title: '获取订单列表失败',
                icon: 'error',
                duration: 2000
            })
        }
    }

    const reachBotoom = () => {
        if (noMore) return
        getOrderList(orderType)
    }

    const goDetail = (item) => {
        console.log(item)
        Taro.navigateTo({
            url: `/pages/user/userOrder/orderDetail/index?item=${JSON.stringify(item)}`
        })
    }
    // 预览图片
    const previewImg = (url: string, list) => {
        Taro.previewImage({
            current: url,
            urls: list
        })
    }
    /*
        @param type
        1: 全部订单
        2: 评级订单
        3: 代卖订单
    */
    const changeOrder = async (type: number) => {
        pageNo = 1
        orderList = []
        setOrderList(orderList)
        setOrderType(type)
        getOrderList(type)
    }
    // useDidShow(() => {
    //     pageNo = 1
    //     getOrderList(1)
    // })
    useEffect(() => {
        pageNo = 1
        getOrderList(1)
    }, [])
    return (
        <BaseWrap scrolltolower={reachBotoom}>
            <View className="userOrder">
                <View className="headers">
                    <View className={`item ${orderType == 1 ? 'active' : ''}`} onClick={() => { changeOrder(1) }}>全部</View>
                    <View className={`item ${orderType == 2 ? 'active' : ''}`} onClick={() => { changeOrder(2) }}>评级</View>
                    {/* <View className={`item ${orderType == 3 ? 'active' : ''}`} onClick={() => { changeOrder(3) }}>代卖订单</View> */}
                </View>
                <View className="body">
                    {orderList && orderList.length > 0 && orderList.map((item: any, index: number) => <View className="block-wrap">
                        <Swiper
                            autoplay
                            circular
                            className="swipe-banner"
                            indicator-dots
                            indicator-active-color='rgba(255,255,255,1)'
                            indicator-color='rgba(255,255,255,0.5)'
                        >
                            {item.singleCardImgs.map((k: any, _index: number) => <SwiperItem key={_index} className='swipe-item'>
                                <Image className="imgs" src={k?.fileid} mode="aspectFill" onClick={() => previewImg(k.fileid, item?.singleCardImgs?.map((item: any) => {
                                    return item.fileid
                                }))}></Image>
                            </SwiperItem>)}
                        </Swiper>
                        {/* <View className="desc">这是我的评论</View> */}
                    </View>)}
                    {/* <View className="block-wrap">
                        <Image className="img" src={PsaLogo}></Image>
                        <View className="desc">这是我的评论</View>
                    </View>
                    <View className="block-wrap">
                        <Image className="img" src={PsaLogo}></Image>
                        <View className="desc">这是我的评论</View>
                    </View>
                    <View className="block-wrap">
                        <Image className="img" src={PsaLogo}></Image>
                        <View className="desc">这是我的评论</View>
                    </View> */}
                </View>
                {/* {orderList && orderList.length > 0 && orderList.map((item: any, index: number) => <View onClick={() => goDetail(item)} key={index} className="order_module">
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
                        <View>{item.updateTime ? formatDateTime(item.updateTime) : formatDateTime(item.createTime)}</View>
                        <View>订单类型：{orderTypes[item.orderType]}</View>
                    </View>
                </View>)} */}
                {noMore && <View className='noMore'>{'已经到底了~'}</View>}
            </View>
        </BaseWrap>
    )
}

export default Service
