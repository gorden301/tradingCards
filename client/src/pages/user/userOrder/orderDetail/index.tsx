import { Image, View, Text } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import BaseWrap from "@/components/baseWrap"
import PopupSystem from '@/components/PopupSystem'
import { formatDateTime } from "@/utils/format"
import { orderTypes, orderStatus, sellType, cardStatus } from "../constant"
import './index.scss'

const OrderDetail: React.FC<{}> = () => {
    const router = useRouter()
    const [data, setData] = useState<any>({})
    const initData = () => {
        let paramsData = JSON.parse(router?.params?.item as string)
        if (paramsData?.singleDetailList) {
            paramsData.singleDetailList = JSON.parse(paramsData.singleDetailList)
        }
        setData(paramsData)
    }
    const [popupSystemParams, setPopupSystemParams] = useState({
        show: false, // 是否展示
        title: '', // 标题
        close: false, // 关闭icon入口
        content: '', // 内容
        confirmText: '', // 确认按钮
        disabledConfirm: false, // 确认按钮禁用
        cancelText: '',
        className: '',
        isCustomLeftBtn: false
    })

    // 预览图片
    const previewImg = (url: string, list) => {
        // const imgs = list.map((item: any) => {
        //     return item.fileid
        // })
        Taro.previewImage({
            current: url,
            urls: list
        })
    }
    const goEbay = (url: string) => {
        Taro.navigateTo({
            url: `/pages/webView/index?url=${url}`
        })
    }
    const copyOrderId = (id) => {
        Taro.setClipboardData({
            data: id,
            success: function (res) {
                Taro.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    }
    const sharePic = async (item) => {
        console.log('item', item)
        debugger
        // Taro.showModal({

        // })
        const userInfo = Taro.getStorageSync('userInfo')
        // userInfo的_id标识不用传，不然会覆盖数据库的自创的_id
        delete userInfo._id
        const createRes: any = await Taro.cloud.callFunction({
            name: 'order',
            data: {
                $url: 'shareCard',
                createData: {
                    // 1: 评级 2: 代卖
                    singleCardImgs: item.singleCardImgs,
                    orderType: 1
                }
            }
        })
        Taro.hideLoading()
        if (createRes?.result?.code == 0) {
            Taro.showToast({
                title: '分享成功',
                icon: 'success',
                duration: 2000
            })
            Taro.reLaunch({
                url: '/pages/service/index'
            })
        } else {
            Taro.showToast({
                title: createRes?.result?.msg,
                icon: 'error',
                duration: 2000
            })
            Taro.reLaunch({
                url: '/pages/home/index'
            })
        }
    }
    useEffect(() => {
        initData()
        console.log(JSON.parse(router?.params.item as string))
    }, [])
    return (
        <BaseWrap>
            <View className="detail-wrap">
                <View className="module">
                    <View className="txt">订单编号:</View>
                    <View>{data?._id}<Text style="color: blue;" onClick={() => copyOrderId(data?._id)}>一键复制</Text></View>
                </View>
                <View className="module">
                    <View className="txt">订单类型:</View>
                    <View>{orderTypes[data?.orderType]}</View>
                </View>
                <View className="module">
                    <View className="txt">订单状态:</View>
                    <View>{orderStatus[data?.orderStatus]}</View>
                </View>
                {data?.orderType == 2 && <>
                    <View className="module">
                        <View className="txt">代卖模式:</View>
                        <View>{sellType[data?.sellType]}</View>
                    </View>
                    {data?.sellType == 1 && <View className="module">
                        <View className="txt">拍卖天数:</View>
                        <View>{data?.sellDays}</View>
                    </View>}
                    {data?.sellType != 1 && <View className="module">
                        <View className="txt">期望价格:</View>
                        <View>{data?.hopePrice}</View>
                    </View>}
                </>}
                <View className="module">
                    <View className="txt">图片:</View>
                    <View>
                        {data?.fileList?.map((item) => {
                            return (
                                <Image className="img" onClick={() => previewImg(item?.tempFileURL, data?.fileList?.map(item => item.tempFileURL))} mode="aspectFill" src={item.tempFileURL}></Image>
                            )
                        })}
                    </View>
                </View>
                <View className="module">
                    <View className="txt">{data?.updateTime ? '更新时间' : '创建时间'}:</View>
                    <View>{data?.updateTime ? formatDateTime(data?.updateTime) : formatDateTime(data?.createTime)}</View>
                </View>
                <View className="module">
                    <View className="txt">备注:</View>
                    <View>{data?.comment}</View>
                </View>
                {data?.customerComment && <View className="module">
                    <View className="txt">客服留言:</View>
                    <View>{data?.customerComment}</View>
                </View>}
                {data?.sellNumber && <View className="module">
                    <View className="txt">已上架链接:</View>
                    <View className="url" onClick={() => goEbay(`https://www.ebay.com/itm/${data?.sellNumber}`)}>{`https://www.ebay.com/itm/${data?.sellNumber}`}</View>
                </View>}
                {data?.singleDetailList?.length && <View>
                    <View className="module">
                        <View className="txt">客服回执图片:</View>
                    </View>
                    <View className="single-wrap">
                        {data?.singleDetailList.map((item) => {
                            return (
                                <View className="singleDetail">
                                    {item.singleCardImgs?.length > 0 && <View className="wrap">
                                        {item.singleCardImgs.map((imgs: any) => {
                                            return (
                                                <Image className="imgs" src={imgs?.fileid} mode="aspectFill" onClick={() => previewImg(imgs.fileid, item?.singleCardImgs?.map((item: any) => {
                                                    return item.fileid
                                                }))}></Image>
                                            )
                                        })}
                                    </View>}
                                    <View className="wrap">
                                        <View>卡片名称:</View>
                                        <View>{item.cardName}</View>
                                    </View>
                                    <View className="wrap">
                                        <View>卡片状态:</View>
                                        <View>{cardStatus[item.cardStatus]}</View>
                                    </View>
                                    <View className="wrap">
                                        <View>评级编号:</View>
                                        <View>{item.cardNo}</View>
                                    </View>
                                    <View className="wrap">
                                        <View>入库编号:</View>
                                        <View>{item.cardStoreNo}</View>
                                    </View>
                                    <View className="wrap">
                                        <View>评级批次:</View>
                                        <View>{item.cardRound}</View>
                                    </View>
                                    <View className="wrap">
                                        <View>评级分数:</View>
                                        <View>{item.cardPoint}</View>
                                    </View>
                                    <View className="look">点击图片查看大图</View>
                                    <View className="look" onClick={() => sharePic(item)}>分享到卡友圈</View>
                                </View>
                            )
                        })}
                    </View>
                </View>}
            </View>
            {/* <PopupSystem
                popupSystemParams={popupSystemParams}
                onClose={onClosePopupSystem}
                onConfirm={onClickPopupSystemConfirm}
                onClickLeftBtn={onClickPopupSystemLeftBtn}
            >
            </PopupSystem> */}
        </BaseWrap>
    )
}

export default OrderDetail
