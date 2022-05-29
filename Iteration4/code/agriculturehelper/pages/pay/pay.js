import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice, totalNum,
      address
    });
  },
  async handleOrderPay() {
    try {

      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      }
      wx.cloud.init({});
      wx.cloud.callFunction({
        name: 'addOrder',
        data: {
          totalprice:this.data.totalPrice,
        },
        success: function(res) {
        },
        fail: console.error
      })



      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods };
      const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });

      let newCart=wx.getStorageSync("cart");
      newCart=newCart.filter(v=>!v.checked);
      wx.setStorageSync("cart", newCart);
        
      wx.redirectTo({
        url: '/pages/cart/cart'
      });

      await showToast({ title: "支付成功",icon: 'success',
      duration: 2000 });
        
    } catch (error) {
      await showToast({ title: "支付失败" })
      console.log(error);
    }
  }


})