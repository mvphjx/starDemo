#require.js
- AMD(Asynchronous Module Definition)异步模块加载，模块加载不影响后续语句的执行。所有依赖于模块的语句都定义在一个回调函数中，等到加载完成后，回调函数才会执行。
- 支持IE6+

#模块定义
####使用define 按照AMD规范定义模块
1. 学生模块 student.js
1. 班级模块 class.js
1. 管理模块 mannager.js
1. 日志模块 log.js
####也可使用shim 加载非标准模块
1. 语言模块 message.js

#依赖管理
- 使用define定义时，填写依赖的模块
- 例如 管理模块  依赖【学生模块，班级模块】；日志模块  依赖【语言模块】

#模块调用
使用require 调用一个或者多个模块

#全局配置
- 使用require.config配置，方便管理模块名
- 使用data-main属性 方便加载配置
