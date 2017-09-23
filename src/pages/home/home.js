'use strict'

const {CONSUMER_KEY} = require('../../config/fanfou')

const tab = require('../../components/tab')
const fm = require('../../components/feeds-manager')
const extend = require('../../utils/extend')
const tap = require('../../mixins/tap')

Page(extend({
  onLoad () {
    const {account} = getApp().globalData
    if (account && account.consumer_key === CONSUMER_KEY) {
      fm.load(this)
    } else {
      wx.setStorageSync('accounts', [])
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  onShow () {
    const {account} = getApp().globalData
    if (this.data.uid !== account.id) {
      this.setData({uid: account.id})
      fm.load(this)
    }
    tab.renderNotis()
  },
  onPullDownRefresh () {
    fm.load(this)
    tab.updateNotis()
  },
  onReachBottom () {
    fm.loadMore(this)
  },
  onShareAppMessage () {
    return {
      title: '小饭'
    }
  }
}, tap))
