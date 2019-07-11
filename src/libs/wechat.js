import Vue from 'vue'
import { getWxConfig } from '@/api/common'

export const initWxConfig = async (wechat) => {
	return getWxConfig(window.location.href.split('#')[0]).then(result => {
	  result.debug = false
      result.jsApiList = ['openLocation','getLocation','openAddress']
      wechat.config(result)
    });
}



class WeChatUtil{
	constructor(){
		this.$wechat = Vue.wechat
		getWxConfig(window.location.href.split('#')[0]).then(result => {
		  result.debug = false
	      result.jsApiList = ['openLocation','getLocation','openAddress']
	      this.$wechat.config(result)
	    });
	}

	//共享收货地址接口
	async getOpenAddress() {
		this.$wechat.openAddress({
			success: (res) => {
				var userName = res.userName; // 收货人姓名
				var postalCode = res.postalCode; // 邮编
				var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
				var cityName = res.cityName; // 国标收货地址第二级地址（市）
				var countryName = res.countryName; // 国标收货地址第三级地址（国家）
				var detailInfo = res.detailInfo; // 详细收货地址信息
				var nationalCode = res.nationalCode; // 收货地址国家码
				var telNumber = res.telNumber; // 收货人手机号码
				return res;
			}
		});
	}
	
	async getLocation() {
		this.$wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res) => {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度、
              return res;
            }
        });
	}
	async openLocation(opts) {
		this.$wechat.openLocation(
		Object.assign(opts,{
			name: 'name', // 位置名
			address: 'address', // 地址详情说明
			scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
			infoUrl: 'infoUrl' // 在查看位置界面底部显示的超链接,可点击跳转
        }));
	}
}


export default WeChatUtil