import { Button, Form, Input, Text, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import './index.scss'

const Register: React.FC<{}> = () => {
    const submitRegister = (e: any) => {
        const { nickName, phoneNumer } = e?.detail?.value ?? {}
        Taro.cloud
        .callFunction({
          	name: "login",
          	data: {
				nickName,
				phoneNumer
			  }
        })
        .then((res: any) => {
			const { code, data, msg } = res?.result
			if (code == 0) {
				Taro.setStorageSync("userInfo", { ...data[0] })
				Taro.showToast({
					title: '注册成功',
					icon: 'success',
					duration: 1000
				})
				Taro.navigateBack()
			} else {
				Taro.showToast({
					title: msg,
					icon: 'error',
					duration: 1000
				})
			}
          	console.log('客户端login结果', res)
        })
    }

    return (
        <View className="register">
            <Form onSubmit={submitRegister}>
                <View className="register_row">
                    <Text>昵称</Text>
                    <Input name="nickName" maxlength={12} type="nickname" placeholder="请输入您的昵称"></Input>
                </View>
                <View className="register_row">
                    <Text>手机</Text>
                    <Input name="phoneNumer" type="number" placeholder="请输入您的手机号"></Input>
                </View>
                <View>
                    <Button formType="submit">注册</Button>
                </View>
            </Form>
        </View>
    )
}

export default Register
