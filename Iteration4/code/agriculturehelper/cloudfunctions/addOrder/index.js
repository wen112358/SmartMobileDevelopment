// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const totalprice = event.totalprice;

    const db = cloud.database();

    db.collection('orders').add({
        data:{
            openid:wxContext.OPENID,
            date:new Date().getTime(),
            type:1,
            price:totalprice,
            openid:wxContext.OPENID
        }
    });

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
    }
}