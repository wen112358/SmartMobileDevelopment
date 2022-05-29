// pages/login/index.js
Page({
    data:{
        userInfo:{}
    },
    handleGetUserInfo(e){
      console.log(e);
  
      const {userInfo}=e.detail;
      wx.setStorageSync("userinfo", userInfo);
      wx.navigateBack({
        delta: 1
      });
        
    },
    getUserProfile(e) {

        var userInfo = {};
        wx.getUserProfile({
          desc: '用于登录小程序', 
          success: (res) => {
              userInfo : res.userInfo;
          }
        })

        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
            delta: 1
          });
      }
  })