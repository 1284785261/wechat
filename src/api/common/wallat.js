import axios from '@/libs/api.request'


export const GetWallet = (userId) => {    //获取用户三个金额
    return axios.request({
        url: 'Wallet/GetWallet',
        params: {
            userId
        },
        method: 'get'
    })
}

export const GetBankCards = (userId) => {    //获取银行卡
    return axios.request({
        url: 'Wallet/GetBankCards',
        params: {
            userId
        },
        method: 'get'
    })
}

export const GetWalletMid = (userId) => {    //获取钱包最近两条交易记录
    return axios.request({
        url: 'Wallet/GetWalletMid',
        params: {
            userId
        },
        method: 'get'
    })
}

export const GetBillList = (Datas) => {    //获取钱包交易记录
    return axios.request({
        url: 'Wallet/GetBillList',
        params: Datas,
        method: 'get'
    })
}
export const GetWalletBillDetail = (id) => {    //获取钱包交易明细
    return axios.request({
        url: 'Wallet/GetWalletBillDetail',
        params: {
            id
        },
        method: 'get'
    })
}


export const RealNameAuthen = (data) => {    //实名认证
    return axios.request({
        url: 'User/RealNameAuthen',
        data: data,
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post'
    })
}

export const EnterpriseAuthen = (data) => {    //企业认证
    return axios.request({
        url: 'User/EnterpriseAuthen',
        data: data,
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post'
    })
}

export const GetUserAuthenInfo = (Datas) => {    //获取认证后的信息
    return axios.request({
        url: 'User/GetUserAuthenInfo',
        method: 'get',
        params: Datas,
    })
}