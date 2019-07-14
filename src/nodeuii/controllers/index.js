import IndexController from './indexController'

const indexController = new IndexController()

function initController(_) {
  _.get('/', indexController.actionIndex)
  _.get('/add', indexController.actionAdd)
}

module.exports = initController