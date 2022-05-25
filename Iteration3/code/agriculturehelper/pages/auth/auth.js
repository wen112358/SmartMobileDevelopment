import { request } from "../../request/index.js";
import { login } from "../../utils/asyncWx.js";
Page({
    // 获取用户信息
    async handleGetUserInfo(e) {
        try {

            //  1 获取用户信息
            const {encryptedData, rawData, iv, signature} = e.detail;
            //   2 获取小程序登录成功后的code
            const {code} = await login();
            const loginParams = {encryptedData, rawData, iv, signature, code};
            //    3 发送请求 获取用户的token
            wx.setStorageSync("token", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
            // const {token} = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
            //    4 吧token存储到缓存中，同时跳转回上一页面
            // wx.setStorageSync("token", token);
            wx.navigateBack({
                delta: 1 //1表示返回上一层，2表示返回上2层
            });
        } catch (error) {
            console.log(error);
        }

    }
})