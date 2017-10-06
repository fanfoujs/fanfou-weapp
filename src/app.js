'use strict'

App({
  globalData: {
    notis: {},
    account: null,
    feed: null,
    appid: null
  },
  onLaunch () {
    this.globalData.account = wx.getStorageSync('accounts')[0]
    this.globalData.appid = wx.getStorageSync('appid')
  }
})
