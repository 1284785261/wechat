import axios from '@/libs/api.request'

export const GetCountrys = () => {    //获取目的国家数据
    return axios.request({
        url: 'Common/GetUseCountrys',
        method: 'get'
    })
}

export const GetOrderServices = () => {    //获取更多服务项
    return axios.request({
        url: 'Common/GetOrderServices',
        // params: {
        //     isVaild
        // },
        method: 'get'
    })
}


export const GetPayTypes = () => {    //获取支付方式
    return axios.request({
        url: 'Wallet/GetPayTypes',
        method: 'get'
    })
}


export const GetWareHousies = () => {    //获取收货仓库
    return axios.request({
        url: 'Order/GetWareHousies',
        method: 'get'
    })
}

export const GetThirdServices = () => {    //获取快递服务商列表
    return axios.request({
        url: 'Common/GetThirdServices',
        method: 'get'
    })
}

export const GetProducts = (Datas) => {    //获取产品类型
    return axios.request({
        url: 'Product/GetProducts',
        method: 'get',
        params: Datas
    })
}

export const PlaceAnOrder = (data) => {    //在线下单
    return axios.request({
        url: 'Order/PlaceAnOrder',
        data: data,
        method: 'post'
    })
}

export const GetPlaceOrderResult = (number) => {    //获取下单img
    return axios.request({
        url: 'Order/GetPlaceOrderResult',
        params: {
            number
        },
        method: 'get'
    })
}