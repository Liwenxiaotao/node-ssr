import list from '../../components/list/list.js'
import banner from '../../components/banner/banner.js'
list.init();
banner.init();

// class App {
  // constructor() {
  //   this.init()
  // }
//   static modules= [];
//   init() {
//     this.initModules()
//   }

//   // 注入
//   static use() {
//     if(Array.isArray(module)) {
//       module.map(item => App.use(item))
//     } else {
//       App.modules.push(module)
//     }
//   }
//   // 执行模块
//   initModules() {
//     App.modules.map(module => module.init())
//   }
// }

// App.use(['banner', 'list'])