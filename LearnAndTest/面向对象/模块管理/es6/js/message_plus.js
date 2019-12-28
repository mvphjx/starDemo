import * as messageBase from './message.js';

class message extends messageBase.message{
    constructor(){
        super();
        this.version= "2.1";
    }
    toString() {
        console.log("message_plus.js-toString");
        return super.toString();
    }
}
//导出模块
export {message};
