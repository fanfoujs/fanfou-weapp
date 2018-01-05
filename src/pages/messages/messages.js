const fm = require('../../components/feeds-manager')
const extend = require('../../utils/extend')
const tap = require('../../mixins/tap')
const i18n = require('../../i18n/index')

const url = '/direct_messages/conversation_list'

Page(extend({}, tap, {
  onLoad () {
    this.setData({me: getApp().globalData.account.user, i18n})
    fm.load(this, url)
  },
  onPullDownRefresh () {
    fm.load(this, url)
  },
  onReachBottom () {
    fm.loadMore(this, url)
  },
  tapMessage (e) {
    const otherid = e.currentTarget.dataset.message.otherid
    const user = e.currentTarget.dataset.message.dm.sender.is_me ? e.currentTarget.dataset.message.dm.recipient : e.currentTarget.dataset.message.dm.sender
    const page = this
    for (const [feedsIndex, feeds] of page.data.feeds_arr.entries()) {
      for (const [feedIndex, feed] of feeds.entries()) {
        if (feed.otherid === otherid) {
          page.setData({[`feeds_arr[${feedsIndex}][${feedIndex}].new_conv`]: false})
          fm.navigateTo(`../message/message?id=${user.id}&name=${user.name}`)
          return
        }
      }
    }
  }
}))
