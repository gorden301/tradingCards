import { Image, View } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import BaseWrap from "@/components/baseWrap"
import { formatDateTime } from "@/utils/format"
import { orderTypes, orderStatus, sellType } from "../constant"
import './index.scss'

const OrderDetail: React.FC<{}> = () => {
    const router = useRouter()
    const [data, setData] = useState<any>({})
    const initData = () => {
        setData(JSON.parse(router?.params?.item as string))
    }
    // 预览图片
    const previewImg = (url: string) => {
        const uploadImgArr = data?.fileList?.map((item) => {
            return item?.tempFileURL
        })
        Taro.previewImage({
            current: url,
            urls: uploadImgArr
        })
    }
    const goEbay = (url: string) => {
        Taro.navigateTo({
            url: `/pages/webView/index?url=${url}`
        })
    }
    useEffect(() => {
        initData()
        console.log(JSON.parse(router?.params.item as string))
    }, [])
    return (
        <BaseWrap>
            <View className="detail-wrap">
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
                    {data?.sellType != 1 &&<View className="module">
                        <View className="txt">期望价格:</View>
                        <View>{data?.hopePrice}</View>
                    </View>}
                </>}
                <View className="module">
                    <View className="txt">图片:</View>
                    <View>
                        {data?.fileList?.map((item) => {
                            return (
                                <Image className="img" onClick={() => previewImg(item?.tempFileURL)} mode="aspectFill" src={item.tempFileURL}></Image>
                            )
                        })}
                    </View>
                </View>
                <View className="module">
                    <View className="txt">创建时间:</View>
                    <View>{formatDateTime(data?.createTime)}</View>
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
            </View>
        </BaseWrap>
    )
}

export default OrderDetail
