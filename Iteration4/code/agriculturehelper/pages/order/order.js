import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待发货",
        isActive: false
      },
      {
        id: 2,
        value: "运输中",
        isActive: false
      },
      {
        id: 3,
        value: "已完成",
        isActive: false
      }
    ]
  },

  onShow(options) {
    const userinfo = wx.getStorageSync("userinfo")||{};
    if (!userinfo.nickName){
        wx.showModal({
            title: '提示',
            content: '请登陆后再查看',
            showCancel:false,
            success (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
                return;
              }
            }
          })
        return;
    }



    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const { type } = currentPage.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type-1);
  },
  async getOrders(type) {
    var that = this;
    wx.cloud.init({});
    wx.cloud.callFunction({
        name: 'getOrders',
        data: {
          type:type
        },
        success: function(res) {
        console.log(res);
        const tmp=res.result.data.map(v=>({...v,true_date:(new Date(v.date).toLocaleString())

        }));
        console.log(tmp);
        that.setData({
            orders:tmp.map(v=>({order_number:v._id,order_price:v.price,create_time_cn:v.true_date}))
        })



        },
        fail: console.error
      })
  },
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index);
  }
})