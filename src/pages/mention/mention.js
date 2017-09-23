const tab = require('../../components/tab')
const fm = require('../../components/feeds-manager')
const extend = require('../../utils/extend')
const tap = require('../../mixins/tap')

const para = {count: 10}
const completions = [function () {
  tab.clearNotis(1, 0)
}, null]
const urls = ['/statuses/mentions', '/statuses/replies']

Page(extend({
  data: {
    index: 0
  },
  onLoad () {
    fm.load(this, urls[this.data.index], para, completions[this.data.index])
  },
  onShow () {
    tab.renderNotis()
  },
  onPullDownRefresh () {
    fm.load(this, urls[this.data.index], para, completions[this.data.index])
  },
  onReachBottom () {
    fm.loadMore(this, urls[this.data.index], para)
  },
  tapTxt () {},
  tapAvatar (e) {
    fm.showUser(e.currentTarget.dataset.user)
  },
  tapFeed (e) {
    fm.showFeed(e.currentTarget.dataset.feed)
  },
  tapIndex (e) {
    const index = e.target.dataset.index
    if (index !== this.data.index) {
      this.setData({
        feeds_arr: null,
        index
      })
      fm.load(this, urls[this.data.index], para, completions[this.data.index])
    }
  }
}, tap))
