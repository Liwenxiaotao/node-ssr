/**
 * @fileoverview 实现Index数据模型
 * @author liwenxiaotao@163.com
 */

import Http from '../utils/http'

/**
 * Index类 获取后台的全部数据
 * @class
 */

class IndexService {
  /**
   * @constructor
   */
  constructor() {
    this.a = 1
  }
  /**
   * 获取后台全部数据
   * @param {string} url  接口API
   * @param {object} option  配置项
   * @example
   * return new Promise
   * getGate(url, option)
   *
   */
  getData(url, option) {
    return Http.fetch(url, option)
  }
}

module.exports = IndexService