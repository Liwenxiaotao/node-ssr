import fetch from 'node-fetch'
class Http {
  // 向后台发送请求
  fetch(url, options) {
    return new Promise((resolve, reject) => {
      let result = {code: 0, msg: '请求失败啦'}
      fetch(url, options)
      .then((res) => {
        try{
          result = res.json()
          return result
        } catch(err) {
          result.code = 1
          result.message = '解析json失败'
          reject(result)
        }
      })
      .then((body) => {
        resolve(body)
      })
      .catch(() => {
        result.code = 2
        result.msg = '请求后台出错'
        reject(result)
      })
    })
  }
}

module.exports = new Http()