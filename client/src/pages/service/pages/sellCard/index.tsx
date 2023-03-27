import { Button, Image, Radio, RadioGroup, View, Icon, Text, Input, Form, Textarea } from "@tarojs/components"
import { useState } from "react"
import BaseWrap from "@/components/baseWrap"
import UploadImg from '@/assets/logo/upload.png'
import { uploadCloudImage, getTempalteUrl } from "@/utils/uploadFile"
import { sellTypes, sellDays } from "./constant"
import './index.scss'
import Taro from "@tarojs/taro"

const MAX_IMG_NUMBER: number = 6
const SellCard: React.FC<{}> = () => {
    const [gradeConfig, setGradeConfig] = useState<any>('')
    // 代卖模式
    const [sellType, setSellType] = useState<any>('')
    const [uploadImgArr, setUploadImgArr] = useState<string[]>([])
    const chooseSellType = (e: any) => {
        const sellType = e?.detail?.value
        setSellType(sellType)
    }
    const chooseSellWay = (e: any) => {
        const companyType = e?.detail?.value
        // setGradeConfig(gradeConfigs[companyType])
    }
    // 选择图片
    const chooseImg = () => {
        Taro.chooseImage({
            count: MAX_IMG_NUMBER - uploadImgArr.length,
            success: res => {
                setUploadImgArr(uploadImgArr.concat(res.tempFilePaths))
            }
        })
    }
    // 删除图片
    const deleteImg = (index: number) => {
        const cacheArr = [...uploadImgArr]
        cacheArr.splice(index, 1)
        setUploadImgArr(cacheArr)
    }
    // 预览图片
    const previewImg = (url: string) => {
        Taro.previewImage({
            current: url,
            urls: uploadImgArr
        })
    }
    const orderSubmit = async (e) => {
        Taro.showModal({
            title: '提示',
            content: '确认是否提交订单(若没有填写物流公司及快递编号请后续完善订单)',
            success: async (res) => {
                if (res.confirm) {
                    Taro.showLoading({
                        title: '订单提交中...',
                        mask: true
                    })
                    const orderParam = e.detail.value
                    let promiseArr: any = []
                    uploadImgArr.forEach(item => {
                        promiseArr.push(uploadCloudImage({
                            cloudPath: `orderImage/${Date.now()}-${Math.random() * 1000000}`,
                            filePath: item
                        }))
                    })
                    let upRes = await Promise.all(promiseArr)
                    // 判断所有的图片是否上传成功
                    const isAllUploadSuccess = upRes.every(item => {
                        return !item[1]
                    })
                    if (isAllUploadSuccess) {
                        console.log('上传图片成功')
                        const userInfo = Taro.getStorageSync('userInfo')
                        // userInfo的_id标识不用传，不然会覆盖数据库的自创的_id
                        delete userInfo._id
                        const fileIds = upRes.map(item => {
                            return item[0].fileID
                        })
                        const fileRes: any = await getTempalteUrl(fileIds)
                        const createRes: any = await Taro.cloud.callFunction({
                            name: 'order',
                            data: {
                                $url: 'createOrder',
                                createData: {
                                    // 1: 评级 2: 代卖
                                    orderType: 2,
                                    cardImgs: fileIds,
                                    fileList: fileRes?.fileList,
                                    ...orderParam
                                }
                            }
                        })
                        Taro.hideLoading()
                        if (createRes?.result?.code == 0) {
                            Taro.showToast({
                                title: '创建订单成功',
                                icon: 'success',
                                duration: 2000
                            })
                            Taro.reLaunch({
                                url: '/pages/user/userOrder/index'
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
                }
            }
        })
        console.log('提交订单', e)
    }
    return (
        <BaseWrap>
            <Form onSubmit={orderSubmit}>
                <View>
                    <View className="wrapper-module">
                        <View className="margin-b20">
                            <View className="margin-b20">1.选择代卖渠道</View>
                            <View>
                                <RadioGroup onChange={chooseSellWay} name='gradeCompany'>
                                    <View className="margin-b20">
                                        <Radio value="ebay" checked={true}>
                                            <View className="margin-l20">ebay</View>
                                        </Radio>
                                    </View>
                                </RadioGroup>
                            </View>
                        </View>
                    </View>
                    <View className="wrapper-module">
                        <View>
                            <View className="margin-b20">2.选择代卖模式</View>
                            <View>
                                <RadioGroup onChange={chooseSellType} name='sellType'>
                                    {sellTypes.map((item: any, index: number) => {
                                        return (
                                            <View className="margin-b20">
                                                <Radio key={index} value={item.value}>
                                                    <View className="margin-l20">{item.label}</View>
                                                </Radio>
                                            </View>
                                        )
                                    })}
                                </RadioGroup>
                            </View>
                        </View>
                    </View>
                    {sellType && <View className="wrapper-module">
                        <View>
                            <View className="margin-b20">{ sellType == 1 ? '拍卖天数' : '期望价格' }</View>
                            <View>
                                {sellType && sellType ==1 && <RadioGroup name='sellDays'>
                                    {sellDays.map((item: any, index: number) => {
                                        return (
                                            <View className="margin-b20">
                                                <Radio key={index} value={item.value}>
                                                    <View className="margin-l20">{item.label}</View>
                                                </Radio>
                                            </View>
                                        )
                                    })}
                                    {sellType && sellType != 1 && <Input name='hopePrice' type="number" placeholder="请输入期望价格(必填,人民币)"></Input>}
                                </RadioGroup>}
                            </View>
                        </View>
                    </View>}
                    {sellType && <View className="wrapper-module">
                        <View className="margin-b20">3.填写基础信息</View>
                        <View>
                            {sellType && sellType != 1 && <View className="register_row">
                                <Text>期望价格</Text>
                                <Input name='hopePrice' type="number" placeholder="请输入期望价格(必填,人民币)"></Input>
                            </View>}
                            <View className="register_row">
                                <Text>物流公司</Text>
                                <Input name='deliveryCompany' type="text" maxlength={8} placeholder="请输入快递公司(选填)"></Input>
                            </View>
                            <View className="register_row">
                                <Text>快递单号</Text>
                                <Input name='deliveryOrderNumbe' type="text" maxlength={30} placeholder="请输入快递订单(选填)"></Input>
                            </View>
                            <View className="comment-wrapper">
                                <View>备注：</View>
                                <Textarea name='comment' className="comment" maxlength={100} placeholder="对卡片的描述或者注意事项"></Textarea>
                            </View>
                        </View>
                    </View>}
                    {sellType && <View className="wrapper-module">
                        <View className="margin-b20">4.图片上传</View>
                        <View className="imgs-wrapper">
                            {uploadImgArr.length > 0 && uploadImgArr.map((item: string, index: number) => <View key={index} className="item_wrapper">
                                <Image className="uploadImg" onClick={() => previewImg(item)} mode="aspectFill" src={item}></Image>
                                <Icon size='18' className="delete" type='clear' color='red' onClick={() => deleteImg(index)} />
                            </View>)}
                            {uploadImgArr.length < MAX_IMG_NUMBER && <Image className="uploadImg" src={UploadImg} onClick={chooseImg}></Image>}
                        </View>
                    </View>}
                </View>
                <View className="orderBtn">
                    <Button className="btn" formType="submit">提交订单</Button>
                </View>
            </Form>
        </BaseWrap>
    )
}

export default SellCard
