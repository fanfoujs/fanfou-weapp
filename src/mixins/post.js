const fm = require('../components/feeds-manager')
const i18n = require('../i18n/index')

module.exports = {
  data: {
    param: null,
    photoPaths: null,
    posting: false,
    length: 0,
    i18n
  },
  post (e) {
    const param = Object.assign(this.data.param || {}, {status: e.detail.value.post})
    fm.post(this, param, this.data.photoPaths)
  },
  bindinput (e) {
    this.setData({length: e.detail.value.length})
  },
  reset () {
    this.setData({
      param: null,
      photoPaths: null,
      posting: false,
      length: 0
    })
  },
  addPhoto () {
    const page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success (res) {
        page.setData({
          photoPaths: res.tempFilePaths
        })
      }
    })
  },
  addGif () {
    const page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success (res) {
        page.setData({
          photoPaths: res.tempFilePaths
        })
      }
    })
  },
  removePhoto () {
    const page = this
    wx.showActionSheet({
      itemList: [i18n.compose.remove_attachment],
      success (res) {
        if (!res.cancel) {
          page.setData({
            photoPaths: null
          })
        }
      }
    })
  }
}
