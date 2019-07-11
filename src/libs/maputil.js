import { MP } from '@/libs/util'
import store from '@/store'
const mapKey = 'On8dfUs4wumPOoYgbRsGex8CxCWU1oWz'

class Map {
	constructor() {
		this._BMap = {}
		MP(mapKey).then(res =>{
			this._BMap = res;
			console.log('地图载入成功.');
		},error =>{
			console.log(res);
			console('地图载入失败');
		})
	}

	/*
	* 浏览器定位
	*/
	async getCurrentPoint() {
		let geolocation = new this._BMap.Geolocation()
		return new Promise((res,error) => {
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					return res(r)
				}
				return error('fail')
			})
		})
	}
	/*
	*	百度地址 调整
	*/
	getPoint(lng, lat) {
		lng = lng - 0.19452198529999976;
		lat = lat + 0.11767267040000107;
		return new this._BMap.Point(lng, lat)
	}

	/*
	*  周边地址
	*/
	async getMapPOI(mPoint, mOpts) {
		store.commit('updateLoadingStatus',{ isLoading: true })
		let mOption = Object.assign({
		    poiRadius : 100,
		    numPois : 6
		  }, mOpts)
		// mPoint = mPoint || this.getCurrentPoint()
		let geoCoder = new this._BMap.Geocoder()
		return new Promise((res,error) => {
			geoCoder.getLocation(mPoint, (r) => {
				setTimeout(()=>{
					store.commit('updateLoadingStatus',{ isLoading: false })
				},1000);
			    return res(r)
			}, mOption)
		})
		
	}
}

export default Map;