Page({
    data: {
      tabs: [
        {
          id: 0,
          value: "体验问题",
          isActive: true
        },
        {
          id: 1,
          value: "商品、商家投诉",
          isActive: false
        }
      ],
      chooseImgs: [],
      textVal: ""
  
    },
    UpLoadImgs: [],
    handleTabsItemChange(e) {
      const { index } = e.detail;
      let { tabs } = this.data;
      tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
      this.setData({
        tabs
      })
    },
    handleChooseImg() {
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (result) => {
  
          this.setData({
            chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
          })
        }
      });
  
    },
    handleRemoveImg(e) {

      const { index } = e.currentTarget.dataset;

      let { chooseImgs } = this.data;

      chooseImgs.splice(index, 1);
      this.setData({
        chooseImgs
      })
    },
    handleTextInput(e) {
      this.setData({
        textVal: e.detail.value
      })
    },
    handleFormSubmit() {
      const { textVal, chooseImgs } = this.data;
      if (!textVal.trim()) {
        wx.showToast({
          title: '请输入有效内容！',
          icon: 'none',
          mask: true
        });
        return;
      }
      wx.showLoading({
        title: "正在上传中",
        mask: true
      });
  
      if (chooseImgs.length != 0) {
               console.log("把文本的内容和外网的图片数组 提交到后台中");
                this.setData({
                  textVal: "",
                  chooseImgs: []
                })
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
            
      }else{
        wx.hideLoading();
          
        console.log("只是提交了文本");
        wx.navigateBack({
          delta: 1
        });
          
      }
    }
  })