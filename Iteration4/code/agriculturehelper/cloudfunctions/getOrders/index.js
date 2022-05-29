// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();
    const type = event.type;

    if(type==0){
        var test = db.collection("orders").where({
            openid:wxContext.OPENID
        }).orderBy("date","desc").limit(30).get();
        return test;
    }
    else{    
        var test = db.collection("orders").where({
            openid:wxContext.OPENID,
            type:type
        }).orderBy("date","desc").limit(30).get();
        return test;
    }
}