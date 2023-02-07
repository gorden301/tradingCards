import Taro from "@tarojs/taro";

export function uploadCloudImage({ cloudPath, filePath }: { cloudPath: string, filePath: string }) {
    const suffix = (/\.\w+$/.exec(filePath) as RegExpExecArray)[0]
    return new Promise((resolve) => {
        Taro.cloud.uploadFile({
            cloudPath: cloudPath + suffix,
            filePath,
            success: (res) => {
                resolve([res, ''])
            },
            fail: (err) => {
                resolve(['', err])
            }
        })
    })
}