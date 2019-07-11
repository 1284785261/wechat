import wx from 'weixin-js-sdk'
import { getWxConfig } from '@/api/common'

const wxApi = {
    wxRegister(callback) {
        getWxConfig(window.location.href.split('#')[0]).then((res) => {
            let data = res
            wx.config({
                debug: false, // 开启调试模式
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.noncestr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表

            })
        }).catch((err) => {
            console.log(err)
        });
        wx.ready((res) => {
            if (callback) {
                callback()
            }
        })
    },
    AppMessageShareData(option) {
        wx.updateAppMessageShareData({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                console.log(1);
                option.success();
            },
            cancel() {
                console.log(2);
                option.error();
            }
        })
    },
    TimelineShareData(option) {
        wx.updateTimelineShareData({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                console.log(1);
                option.success();
            },
            cancel() {
                console.log(2);
                option.error();
            }
        })
    }
}

export default wxApi
