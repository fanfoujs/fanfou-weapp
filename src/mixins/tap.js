const fm = require('../components/feeds-manager')

module.exports = {
  tapTxt (e) {
    const txt = e.currentTarget.dataset.value
    switch (txt.type) {
      case 'at':
        fm.showUser(null, txt.id)
        break
      case 'tag':
        fm.navigateTo(`../feeds/feeds?q=${txt.query}`)
        break
      default: // Link
        this.handleLink(txt.link)
    }
  },
  tapAvatar (e) {
    fm.showUser(e.currentTarget.dataset.user)
  },
  tapFeed (e) {
    fm.showFeed(e.currentTarget.dataset.feed)
  },
  tapListItem (e) {
    fm.navigateTo(`${e.currentTarget.dataset.page}?url=${e.currentTarget.dataset.url}&id=${this.data.user.id}&name=${e.currentTarget.dataset.name}`)
  },
  longpressImage (e) {
    fm.showImage(e.currentTarget.dataset.photoUrl)
  },
  tapLink (e) {
    this.handleLink(e.currentTarget.dataset.link)
  },
  handleLink (link) {
    wx.setClipboardData({
      data: link,
      success () {
        wx.showModal({
          title: '请前往浏览器',
          content: '链接已复制',
          showCancel: false,
          confirmText: '好的'
        })
      }
    })
  }
}
