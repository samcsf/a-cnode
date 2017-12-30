const moment = require('moment')

function wrapper (lang = 'zh-cn') {
  moment.locale(lang)
  return {
    getDuration: function (start, end) {
      return moment(end).to(moment(start))
    }
  }
}

export default wrapper
