import { Button, Image, Radio, RadioGroup, View, Icon, Text, Input, Form, Textarea } from "@tarojs/components"
import { useState } from "react"
import BaseWrap from "@/components/baseWrap"
import { gradeConfigs } from "./gradeConfig"
import UploadImg from '@/assets/logo/upload.png'
import { uploadCloudImage } from "@/utils/uploadFile"
import './index.scss'
import Taro from "@tarojs/taro"

const MAX_IMG_NUMBER: number = 6
const Grade: React.FC<{}> = () => {
    const [gradeConfig, setGradeConfig] = useState<any>('')
    const [gradeSpeed, setGradeSpeed] = useState<string>('')
    const [uploadImgArr, setUploadImgArr] = useState<string[]>([])
    const chooseGradeCompany = (e: any) => {
        const companyType = e?.detail?.value
        setGradeConfig(gradeConfigs[companyType])
    }
    const chooseGradeLevel = (e: any) => {
        const speedType = e?.detail?.value
        setGradeSpeed(speedType)
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
            const fileIds = upRes.map(item => {
                return item[0].fileID
            })
            const createRes: any = await Taro.cloud.callFunction({
                name: 'order',
                data: {
                    $url: 'createOrder',
                    // 1: 评级 2: 代卖
                    orderType: 1,
                    cardImgs: fileIds,
                    ...userInfo,
                    ...orderParam
                }
            })
            if (createRes?.result?.code == 0) {
                Taro.showToast({
                    title: '创建订单成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                Taro.showToast({
                    title: createRes?.result?.msg,
                    icon: 'error',
                    duration: 2000
                })
            }
        }
        console.log('提交订单', e)
    }
    return (
        <BaseWrap>
            <Form onSubmit={orderSubmit}>
                <View>
                    <View className="wrapper-module">
                        <View className="margin-b20">
                            <View className="margin-b20">1.选择评级公司</View>
                            <View>
                                <RadioGroup onChange={chooseGradeCompany} name='gradeCompany'>
                                    <View className="margin-b20">
                                        <Radio value="psa">
                                            <View className="margin-l20">psa</View>
                                        </Radio>
                                    </View>
                                    <View className="margin-b20">
                                        <Radio value="bgs">
                                            <View className="margin-l20">bgs</View>
                                        </Radio>
                                    </View>
                                    <View className="margin-b20">
                                        <Radio value="hga">
                                            <View className="margin-l20">hga</View>
                                        </Radio>
                                    </View>
                                </RadioGroup>
                            </View>
                        </View>
                    </View>
                    {gradeConfig && <View className="wrapper-module">
                        <View>
                            <View className="margin-b20">2.选择档位</View>
                            <View>
                                <RadioGroup onChange={chooseGradeLevel} name='gradeLevel'>
                                    {gradeConfig?.data?.map((item: any, index: number) => {
                                        return (
                                            <View className="margin-b20">
                                                <Radio key={index} value={item.name}>
                                                    <View className="margin-l20">{item.name}</View>
                                                </Radio>
                                                <View className="margin-t20">说明: {item.desc}</View>
                                            </View>
                                        )
                                    })}
                                </RadioGroup>
                            </View>
                            {gradeConfig.desc && <View>
                                {gradeConfig.desc.map((item: any, index: number) => {
                                    return (
                                        <View key={index}>{item}</View>
                                    )
                                })}
                            </View>}
                        </View>
                    </View>}
                    {gradeSpeed && <View className="wrapper-module">
                        <View className="margin-b20">3.填写基础信息</View>
                        <View>
                            <View className="register_row">
                                <Text>卡片数量</Text>
                                <Input name='cardNumber' maxlength={2} type="number" placeholder="请输入卡片数量(必填)"></Input>
                            </View>
                            <View className="register_row">
                                <Text>快递公司</Text>
                                <Input name='deliveryCompany' type="text" maxlength={8} placeholder="请输入快递公司(选填)"></Input>
                            </View>
                            <View className="register_row">
                                <Text>快递编号</Text>
                                <Input name='deliveryOrderNumbe' type="text" maxlength={30} placeholder="请输入快递订单(选填)"></Input>
                            </View>
                            <View className="comment-wrapper">
                                <View>备注：</View>
                                <Textarea name='comment' className="comment" maxlength={100} placeholder="对卡片的描述或者注意事项"></Textarea>
                            </View>
                        </View>
                    </View>}
                    {gradeSpeed && <View className="wrapper-module">
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

export default Grade