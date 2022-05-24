// index.js
import { request } from "../../request/index.js";
//Page Object
Page({
    data: {
        swiperList : [],
        floorList:[]
    },
    //options(Object)
    onLoad: function (options) {
        this.getSwiperList()
        this.getFloorList()
        
    },
    getSwiperList(){
        wx.cloud.init()
        wx.cloud.downloadFile({
            fileID: 'cloud://cloud1-0gjg3s0pc32b172f.636c-cloud1-0gjg3s0pc32b172f-1310902611/1.jpg', // 文件 ID
            success: res => {
              var tmpList = this.data.swiperList
              tmpList.push(res.tempFilePath)
            this.setData({
                swiperList : tmpList
            })
            },
        })
        wx.cloud.downloadFile({
            fileID: 'cloud://cloud1-0gjg3s0pc32b172f.636c-cloud1-0gjg3s0pc32b172f-1310902611/2.jpg', // 文件 ID
            success: res => {
              var tmpList = this.data.swiperList
              tmpList.push(res.tempFilePath)
            this.setData({
                swiperList : tmpList
            })
            },
        })
        wx.cloud.downloadFile({
            fileID: 'cloud://cloud1-0gjg3s0pc32b172f.636c-cloud1-0gjg3s0pc32b172f-1310902611/3.jpg', // 文件 ID
            success: res => {
              var tmpList = this.data.swiperList
              tmpList.push(res.tempFilePath)
            this.setData({
                swiperList : tmpList
            })
            },
        })
    },
    getFloorList(){
        request({ url: "/home/floordata" })
        .then(result => {
          this.setData({
            floorList: result
          })
        })
      }
});

