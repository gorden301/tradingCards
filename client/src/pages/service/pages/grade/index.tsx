import { Block, Image, Radio, RadioGroup, View, Icon } from "@tarojs/components"
import { useState } from "react"
import BaseWrap from "@/components/baseWrap"
import { gradeConfigs } from "./gradeConfig"
import UploadImg from '@/assets/logo/upload.png'
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
    return (
        <BaseWrap>
            <View className="wrapper">
                <View className="wrapper-module">
                    <View className="margin-b20">
                        <View className="margin-b20">1.选择评级公司</View>
                        <View>
                            <RadioGroup onChange={chooseGradeCompany}>
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
                            <RadioGroup onChange={chooseGradeLevel}>
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
        </BaseWrap>
    )
}

export default Grade