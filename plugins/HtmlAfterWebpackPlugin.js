const pluginName = 'HtmlAfterWebpackPlugin';
// 插入css与js

function assets(data) {
  let js = [], css = []
  let jsTag = item => `<script class="preloadjs" src="${item}"></script>`
  let cssTag = item => `<link class="preloadcss" rel="stylesheet" href="${item}">`

  for (let item of data.js) {
    js.push(jsTag(item))
  }
  for (let item of data.css) {
    css.push(cssTag(item))
  }
  return {
    js,
    css
  }
}
// components: => ../../../components/
class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
          compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
            let _html = htmlPluginData.html
            _html =  _html.replace(/components:/g, '../../../components/')

            const result = assets(htmlPluginData.assets);
            _html = _html.replace('<!-- injectcss -->',result.css.join(''))
            _html = _html.replace('<!-- injectjs -->',result.js.join(''))
            htmlPluginData.html = _html
          })
        });
    }
}

module.exports = HtmlAfterWebpackPlugin