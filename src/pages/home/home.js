'use strict'

const tab = require('../../components/tab')
const fm = require('../../components/feeds-manager')
const extend = require('../../utils/extend')
const tap = require('../../mixins/tap')

Page(extend({}, tap, {
  onLoad () {
    if (!getApp().globalData.account) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    fm.load(this)
  },
  onShow () {
    tab.updateNotis()
  },
  onPullDownRefresh () {
    fm.load(this)
    tab.updateNotis()
  },
  onReachBottom () {
    fm.loadMore(this)
    tab.updateNotis()
  },
  onShareAppMessage () {
    return {title: '小饭'}
  }
}))
