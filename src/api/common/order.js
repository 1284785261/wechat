import axios from '@/libs/api.request'


export const GetUserOrderList = (str) => {    //获取订单列表数据
    return axios.request({
        url: 'Order/GetUserOrderList',
        method: 'get',
        params: str
    })
}

export const GetOrderDetail = (orderId) => {    //获取订单详情
    return axios.request({
        url: 'Order/GetOrderDetail',
        params: {
            orderId
        },
        method: 'get'
    })
}

export const SetOrderPayType = (Datas) => {    //设置付款类型
    return axios.request({
        url: 'Order/SetOrderPayType',
        method: 'post',
        data: Datas,
    })
}

export const GetAnnex = (Id) => {    //获取指定文件
    return axios.request({
        url: 'Common/GetAnnex',
        params: {
            Id
        },
        method: 'get'
    })
}

export const SetOrderGoodsInvoice = (Datas) => {    //获取指定文件
    return axios.request({
        url: 'Order/SetOrderGoodsInvoice',
        method: 'post',
        data: Datas
    })
}

export const CancelOrder = (Datas) => {    //取消订单
    return axios.request({
        url: 'Order/CancelOrder',
        method: 'post',
        data: Datas
    })
}

export const DeleteOrder = (Datas) => {    //删除订单
    return axios.request({
        url: 'Order/DeleteOrder',
        method: 'post',
        data: Datas
    })
}

export const GetOrderAllInfo = (orderId) => {    //获取订单详情全部
    return axios.request({
        url: 'Order/GetOrderAllInfo',
        params: {
            orderId
        },
        method: 'get'
    })
}

export const SeparateOrder = (Datas) => {    //设置订单拆票
    return axios.request({
        url: 'Order/SeparateOrder',
        data: Datas,
        method: 'post'
    })
}

export const FuseOrder = (Datas) => {    //设置订单合票
    return axios.request({
        url: 'Order/FuseOrder',
        data: Datas,
        method: 'post'
    })
}

export const UpdateAnOrder = (Datas) => {    //修改订单信息
    return axios.request({
        url: 'Order/UpdateAnOrder',
        data: Datas,
        method: 'post'
    })
}