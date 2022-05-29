// pages/user/user.js
Page({
    data: {
      userinfo:{},
      collectNums:0,
      visitNums:0,
    },
    onShow(){
      const userinfo=wx.getStorageSync("userinfo");
      const collect=wx.getStorageSync("collect")||[];
      const visitNums=wx.getStorageSync('visitNums')||[];
        
      this.setData({userinfo,collectNums:collect.length,visitNums:visitNums.length});
        
    },
    getUserProfile(e) {
        console.log(this.data.userinfo);
        wx.getUserProfile({
          desc: '用于登录小程序',
          success: (res) => {
            wx.setStorageSync('userinfo', res.userInfo);
            this.setData({
              userinfo: res.userInfo,
            })
          }
        })
      },
    exitAccount(e){
        this.setData({
            userinfo: {},
            collectNums: 0,
            visitNums:0
        })
        const tmp = {};
        const tem = [];
        wx.setStorageSync('userinfo', tmp);
        wx.setStorageSync('collect', tem);
        wx.setStorageSync('visitNums', tem);
    }
  })