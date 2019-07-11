function Moneys(value) {   //金额加两个0
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }

}

function BankCard(strs) { //银行卡显示*号
    var reg = /^(\d{4})\d+(\d{4})$/;
    return strs = strs.replace(reg, "$1 **** **** $2");
}

function Iphone(strs) { //手机号显示*号
    var reg = /^(\d{3})\d+(\d{4})$/;
    return strs = strs.replace(reg, "$1 **** $2");
}
export {
    Moneys,
    BankCard,
    Iphone
}