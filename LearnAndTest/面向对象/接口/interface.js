//Interface类
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw newError('Interface constructor called width' + arguments.legnth + 'arguments,butexpected exactly 2. ');
    }
    this.name = name;
    this.methods = [];
    for (var i = 1, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error('interface costructorexpects method names to be passed in as a string');
        }
        this.methods.push(methods[i]);
    }
}

//Static class method
Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("FunctionInterface.ensureImplements called with”+arguments.length+”arguments, but expeted at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of  Interface.")
        }
        for (var j = 0, methodLen = interface.methods.length; j < methodLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw newError("Function Interface.ensureImplements:object does not implement the" + interface.name + "interface. Method" + method + " was not found.")
            }
        }
    }
}
