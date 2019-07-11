import axios from '@/libs/api.request'

export const GetInvoices = (Datas) => {    //获取发票列表
    return axios.request({
        url: 'Invoice/GetInvoices',
        params: Datas,
        method: 'get'
    })
}

export const GetUserInvoicesHead = (Datas) => {    //获取用户发票模板
    return axios.request({
        url: 'Invoice/GetUserInvoicesHead',
        method: 'get',
        params: Datas,
    })
}

export const AddInvoiceFromOrder = (data) => {    //开具发票
    return axios.request({
        url: 'Invoice/AddInvoiceFromOrder',
        data: data,
        method: 'post'
    })
}

export const GetUserInvoices = (uId) => {    //获取抬头外部列表
    return axios.request({
        url: 'Invoice/GetUserInvoices',
        params: {
            uId
        },
        method: 'get'
    })
}

export const EditUserInvoice = (data) => {    //新增或者修改发票抬头
    return axios.request({
        url: 'Invoice/EditUserInvoice',
        data: data,
        method: 'post'
    })
}
export const GetUserInvoicesDetail = (invoiceId) => {    //获取新增或者修改发票抬头信息
    return axios.request({
        url: 'Invoice/GetUserInvoicesDetail',
        params: {
            invoiceId
        },
        method: 'get'
    })
}

export const GetInvoiceDetail = (recordID) => {    //获取已开发票信息
    return axios.request({
        url: 'Invoice/GetInvoiceDetail',
        params: {
            recordID
        },
        method: 'get'
    })
}