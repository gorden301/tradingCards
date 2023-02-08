import { Radio, RadioGroup, View } from "@tarojs/components"
import { useState } from "react"
import { gradeConfigs } from "./gradeConfig"

const Grade: React.FC<{}> = () => {
    const [gradeConfig, setGradeConfig] = useState<any>('')
    const chooseGradeCompany = (e: any) => {
        const companyType = e?.detail?.value
        setGradeConfig(gradeConfigs[companyType])
    }
    const chooseGradeLevel = (e: any) => {}
    return (
        <View>
            <View>
                <View>1.选择评级公司</View>
                <View>
                    <RadioGroup onChange={chooseGradeCompany}>
                        <Radio value="psa">psa</Radio>
                        <Radio value="bgs">bgs</Radio>
                        <Radio value="hga">hga</Radio>
                    </RadioGroup>
                </View>
            </View>
            {gradeConfig && <View>
                <View>选择档位</View>
                <View>
                    <RadioGroup onChange={chooseGradeLevel}>
                        {gradeConfig?.data?.map((item: any, index: number) => {
                            return (
                                <Radio key={index} value={item.name}>
                                    <View>{item.name}</View>
                                    <View>{item.desc}</View>
                                </Radio>
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
            </View>}
        </View>
    )
}

export default Grade