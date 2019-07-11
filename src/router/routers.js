export default [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
    hideInMenu: true
  },
  component: h => import('@/components/HelloFromVux'),
},
{
  path: '/Hello',
  name: 'HelloWorld',
  meta: {
    title: '你好,世界!'
  },
  component: h => import('@/components/HelloWorld'),
},
{
  path: '/MyInfo',
  name: 'MyInfo',
  meta: {
    title: '我的信息',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/MyInfo.vue')
},
{
  path: '/OpMyInfo',
  name: 'OpMyInfo',
  meta: {
    title: '编辑个人信息'
  },
  component: h => import('@/view/MyInfo/OpMyInfo.vue')
},
{
  path: '/BindMobilePhone',
  name: 'BindMobilePhone',
  meta: {
    title: '绑定手机号',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/BindMobilePhone.vue')
},
{
  path: '/PinHouseholds',
  name: 'PinHouseholds',
  meta: {
    title: '销户'
  },
  component: h => import('@/view/MyInfo/PinHouseholds.vue')
},
{
  path: '/RealName',
  name: 'RealName',
  meta: {
    title: '实名认证'
  },
  component: h => import('@/view/MyInfo/RealName.vue')
},
{
  path: '/Audit',
  name: 'Audit',
  meta: {
    title: '审核成功'
  },
  component: h => import('@/view/MyInfo/Audit.vue')
},
{
  path: '/Delivery',
  name: 'Delivery',
  meta: {
    title: '交货方式',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/Delivery/Delivery.vue')
},
{
  path: '/PlaceOrder',
  name: 'PlaceOrder',
  meta: {
    title: '下单寄件',
    hideInMenu: true
  },
  component: h => import('@/view/PlaceOrder/Placeorder.vue')
},
{
  path: '/OrderSuccess',
  name: 'OrderSuccess',
  meta: {
    title: '下单成功',
    hideInMenu: true
  },
  component: h => import('@/view/PlaceOrder/OrderSuccess.vue')
},
{
  path: '/MyOrderManage',
  name: 'MyOrderManage',
  meta: {
    title: '我的订单',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/MyOrderManage.vue')
},
{
  path: '/InvoiceManagement',
  name: 'InvoiceManagement',
  meta: {
    title: '开票入口',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/InvoiceManagement.vue')
},
{
  path: '/applyInvoice',
  name: 'applyInvoice',
  meta: {
    title: '开票列表',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/applyInvoice.vue')
},
{
  path: '/electronicInvoice',
  name: 'electronicInvoice',
  meta: {
    title: '开票信息',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/electronicInvoice.vue')
},
{
  path: '/completes',
  name: 'completes',
  meta: {
    title: '完成开票',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/completes.vue')
}, {
  path: '/InvoiceLookup',
  name: 'InvoiceLookup',
  meta: {
    title: '发票抬头列表',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/InvoiceLookup.vue')
}, {
  path: '/addLookup',
  name: 'addLookup',
  meta: {
    title: '添加发票抬头',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/addLookup.vue')
},
{
  path: '/InvoiceHistory',
  name: 'InvoiceHistory',
  meta: {
    title: '开票历史列表',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/InvoiceHistory.vue')
}, {
  path: '/InvoiceDetails',
  name: 'InvoiceDetails',
  meta: {
    title: '开票历史详情',
    hideInMenu: true
  },
  component: h => import('@/view/InvoiceManagement/InvoiceDetails.vue')
},
{
  path: '/OrderDetail',
  name: 'OrderDetail',
  meta: {
    title: '订单详情',
    hideInMenu: false
  },
  component: h => import('@/view/MyOrder/OrderDetail.vue')
},
{
  path: '/MyWallet',
  name: 'MyWallet',
  meta: {
    title: '我的钱包',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/Wallet.vue'),
},
{
  path: '/FillMoney',
  name: 'FillMoney',
  meta: {
    title: '充值',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/FillMoney.vue')
},
{
  path: '/TakeMoney',
  name: 'TakeMoney',
  meta: {
    title: '提现',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/TakeMoney.vue')
},
{
  path: '/BillingDetails',
  name: 'BillingDetails',
  meta: {
    title: '充值成功',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/BillingDetails.vue')
},
{
  path: '/withdrawalSubsidiary',
  name: 'withdrawalSubsidiary',
  meta: {
    title: '申请提现明细',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/withdrawalSubsidiary.vue')
}, {
  path: '/BillingRecords',
  name: 'BillingRecords',
  meta: {
    title: '查看账单记录',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/BillingRecords.vue')
},
{
  path: '/cashWithdrawals',
  name: 'cashWithdrawals',
  meta: {
    title: '确认提现',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/cashWithdrawals.vue')
}, {
  path: '/checkstand',
  name: 'checkstand',
  meta: {
    title: '收银台',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/checkstand.vue')
},
{
  path: '/TransferSuccess',
  name: 'TransferSuccess',
  meta: {
    title: '支付成功',
    hideInMenu: true
  },
  component: h => import('@/view/MyWallet/TransferSuccess.vue')
},
{
  path: '/BankCard',
  name: 'BankCard',
  meta: {
    title: '银行卡',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/BankCard.vue')
},
{
  path: '/addBank',
  name: 'addBank',
  meta: {
    title: '添加银行卡',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/addBank.vue')
},
{
  path: '/SetpaymentPassword',
  name: 'SetpaymentPassword',
  meta: {
    title: '设置支付密码/修改支付密码',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/SetpaymentPassword.vue')
}, {
  path: '/SetpaymentPassword2',
  name: 'SetpaymentPassword2',
  meta: {
    title: '确认设置支付密码/修改支付密码',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/SetpaymentPassword2.vue')
},
{
  path: '/ModifyOrder',
  name: 'ModifyOrder',
  meta: {
    title: '修改订单信息',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/ModifyOrder.vue')
},
{
  path: '/FillOrderNo',
  name: 'FillOrderNo',
  meta: {
    title: '补填单号',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/FillOrderNo.vue')
},
{
  path: '/ModifyInvoice',
  name: 'ModifyInvoice',
  meta: {
    title: '修改随货发票',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/ModifyInvoice.vue')
},
{
  path: '/ToPayfor',
  name: 'ToPayfor',
  meta: {
    title: '待支付列表',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/ToPayfor.vue')
},
{
  path: '/RefundSecurity',
  name: 'RefundSecurity',
  meta: {
    title: '申请退保证金',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/RefundSecurity.vue')
},
{
  path: '/RefundSuccess',
  name: 'RefundSuccess',
  meta: {
    title: '申请退保证金成功',
    hideInMenu: true
  },
  component: h => import('@/view/MyOrder/RefundSuccess.vue')
},
{
  path: '/Problema',
  name: 'Problema',
  meta: {
    title: '问题工单',
    hideInMenu: true
  },
  component: h => import('@/view/Problem/Problema.vue')
},
{
  path: '/ProcessingState',
  name: 'ProcessingState',
  meta: {
    title: '问题工单状态页面',
    hideInMenu: true
  },
  component: h => import('@/view/Problem/ProcessingState.vue')
},
{
  path: '/RealnameAuthentication',
  name: 'RealnameAuthentication',
  meta: {
    title: '实名认证状态页面',
    hideInMenu: true
  },
  component: h => import('@/view/MyInfo/RealnameAuthentication.vue')
}
]
