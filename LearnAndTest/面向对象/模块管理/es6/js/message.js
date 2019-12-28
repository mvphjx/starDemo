class message {
    constructor(){
        this.version= "1.1";
        this.name= "一个简单的ES6模块";
    }
    toString() {
        return this.name+this.version;
    }
}
//导出模块
//命名式导出（名称导出）
export  {message};
//默认导出（定义式导出）
export default {message};
