import { View, WebView } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"

const WebViewPage: React.FC<{}> = () => {
    const router = useRouter()
    const [url, setUrl] = useState<string>('')
    useEffect(() => {
        setUrl(router?.params?.url as string)
    }, [])
    return (
        <View>
            <WebView src={url} />
        </View>
    )
}

export default WebViewPage