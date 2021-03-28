(function (console) {

    // vars

    var el, head, input,
        glob = this,
        rows = 1,
        ctrlon = false,
        shifton = false,
        history = new History(100),
        api = new API();

    // colors

    var GRAY = '#777',
        RED  = 'red',
        BLUE = 'blue';

    // shortcuts

    var body     = document.body,
        slice    = Array.prototype.slice,
        toString = Object.prototype.toString;

    // hooks

    var evaluateHook = evaluate,
        stringifyHook = stringify;

    // dom

    document.write(''
    + '<pre id="miniconsole">'
    +     '<div id="miniconsole-prompt">'
    +         '<span>> </span>'
    +         '<span><textarea '
    +             'id="miniconsole-input" rows="1"'
    +         '></textarea><span>'
    +     '</div>'
    +     '<style>'
    +         '#miniconsole {'
    +             'margin: 0;'
    +             'padding-bottom: 2em;'
    +         '}'
    +         '#miniconsole * {'
    +             'font-size: 1em;'
    +         '}'
    +         '#miniconsole-prompt span {'
    +             'display: table-cell;'
    +             'vertical-align: top;'
    +         '}'
    +         '#miniconsole-prompt span + span {'
    +             'width: 100%;'
    +         '}'
    +         '#miniconsole-input {'
    +             'font-family: inherit;'
    +             'overflow: hidden;'
    +             'outline: none;'
    +             'resize: none;'
    +             'display: block;'
    +             'width: 100%;'
    +             'border: 0;'
    +             'margin: 0;'
    +             'padding: 0;'
    +         '}'
    +         '#miniconsole div {'
    +             'padding: .5em;'
    +             'border-top: 1px solid #ddd;'
    +         '}'
    +     '</style>'
    + '</pre>'
    );

    el = document.getElementById('miniconsole');
    head = document.getElementsByTagName('head')[0];
    input = document.getElementById('miniconsole-input');
    head.appendChild(el.lastChild);

    onKeydown(input, {
        13 /* ENTER */: function () {
            if (shifton) {
                rows += 1;
            } else {
                rows = 1;
                this.focus();
                send(this.value);
                setTimeout(function () {
                    input.value = '';
                }, 0);
            }
            refreshRows();
        },
        38 /* UP */: function () {
            if (ctrlon) {
                this.value = history.up();
            }
        },
        40 /* DOWN */: function () {
            if (ctrlon) {
                this.value = history.down();
            }
        }
    });

    on(input, 'keyup', function (ev) {
        var i, s, c;
        if (which(ev) != 13) {
            rows = 1;
            c = '\n';
            s = this.value;
            i = s.length;
            while (i-- > 0) if (s[i] == c) rows++;
            refreshRows();
        }
    });

    onKeydown(document, {
        16 /* SHIFT */: function () {
            shifton = true;
        },
        17 /* CTRL */: function () {
            ctrlon = true;
        },
        76 /* L */: function (ev) {
            if (ctrlon) {
                ev.preventDefault();
                clear();
                input.focus();
            }
        }
    });

    onKeyup(document, {
        16 /* SHIFT */: function () {
            shifton = false;
        },
        17 /* CTRL */: function () {
            ctrlon = false;
        }
    });

    on(document, 'click', function (ev) {
        var doFocus = ev.target == el;
        if (!doFocus) doFocus = ev.target == input.parentNode.parentNode;
        if (!doFocus) doFocus = ev.target == body;
        if (!doFocus) doFocus = ev.target == body.parentNode;
        if (!doFocus) doFocus = ev.target == document;
        if (doFocus) input.focus();
    });

    // init

    input.focus();
    glob.mini = api;

    // functions

    function noop () {}

    function clear () {        
        while (last()) el.removeChild(last());
    }

    function last () {
        return el.lastChild.previousSibling;
    }

    function color (el, color) {
        el.style.color = color;
    }

    function which (ev) {
        return ev.which || ev.keyCode;
    }

    function onKeyup (o, handlers) {
        onKeystroke(o, 'keyup', handlers);
    }

    function onKeydown (o, handlers) {
        onKeystroke(o, 'keydown', handlers);
    }

    function refreshRows () {
        input.setAttribute('rows', rows);
        scrollToBottom();        
    }

    function scrollToBottom () {
        var value = body.scrollHeight;
        if (body.scrollTop) body.scrollTop = value;
        else document.documentElement.scrollTop = value;
    }

    function map (l, f) {
        var i, n = l.length;
        var r = new Array(n);
        while (n--) r[n] = f(l[n]);
        return r;
    }

    function onKeystroke (o, ev, handlers) {
        var handler;
        on(o, ev, function (ev) {
            if (handler = handlers[which(ev)]) {
                return handler.apply(this, arguments);
            }
        });
    }

    function on (o, ev, fn) {
        if (o.addEventListener) {
            o.addEventListener(ev, fn, false);
        } else if (o.attachEvent) {
            o.attachEvent('on' + ev, fn);
        }
    }

    function un (o, ev, fn) {
        if (o.removeEventListener) {
            o.removeEventListener(ev, fn, false);
        } else if (o.detachEvent) {
            o.detachEvent('on' + ev, fn);
        }
    }

    function stringify (o) {
        switch (toString.call(o).slice(8, -1)) {
            case 'Object': return stringifyObject(o);
            case 'Array': return stringifyArray(o);
            case 'Function': return o + '';
            default: return stringifyItem(o);
        }
    }

    function stringifyArray (o) {
        var i, l = o.length, temp = [];
        for (i = 0; i < l; i++) {
            temp.push(stringifyItem(o[i]));
        }
        return '[' + temp.join(',') + ']';
    }

    function stringifyObject (o) {
        var k, temp = [];
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                temp.push(k + ':' + stringifyItem(o[k]));
            }
        }
        return '{' + temp.join(',') + '}';
    }

    function stringifyItem (o) {
        var string = toString.call(o);
        switch (string.slice(8, -1)) {
            case 'Array': case 'Function': return string;
            case 'String': return '"' + o + '"';
            default: return o + '';
        }
    }

    function stringifyButString (o) {
        if (typeof o != 'string') {
            return stringifyHook(o);
        } else {
            return o;
        }
    }
    
    function entitify (str) {
        return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/ /g, '&nbsp;');
    }

    function evaluate (code) {
        var script = document.createElement('script');
        code = code.replace(/('|\\|\n)/g, '\\$1');
        script.text = ''
        + 'try { mini = [eval(\'' + code + '\'), true]; }'
        + 'catch (error) { mini = [error, false]; }';
        head.appendChild(script);
        head.removeChild(script);
        code = glob.mini;
        glob.mini = api;
        if (code.pop()) {
            return code.pop();
        } else {
            code = code.pop();
            consoleDotError(code);
            throw code;
        }
    }

    // io

    function info (msg) {
        print('<i>' + msg + '</i>');
        color(last(), GRAY);
    }

    function consoleDotError (error) {
        if (console && console.error)
        if (typeof console.error == 'function')
        console.error(error);
    }

    function print (msg) {
        var div = document.createElement('div');
        el.insertBefore(div, el.lastChild);
        div.innerHTML = msg === '' ? '&nbsp;' : msg + '';
    }

    function hook (dflt, hook) {
        return function () {
            var args = slice.call(arguments);
            return hook.apply(api, args.concat(dflt));
        };
    }

    function log (msg) {
        msg = slice.call(arguments);
        msg = map(msg, stringifyButString);
        print(entitify(msg.join(' ')));
        scrollToBottom();
    }

    function send (code) {
        history.save(code);
        print(entitify('> ' + code.replace(/\n/g, '\n  ')));
        color(last(), BLUE);
        evalPrint(code);
    }

    function evalPrint (code) {
        try {
            var r = evaluateHook(code);
            print(entitify(stringifyHook(r)));
            if (r === undefined) color(last(), GRAY);
        } catch (error) {
            print(entitify(error));
            color(last(), RED);
        }
    }

    function set (opt, val) {
        switch (opt) {
            case 'evalHook': 
                evaluateHook = hook(evaluate, val);
                info('"evalHook" set.');
                break;
            case 'printHook': 
                stringifyHook = hook(stringify, val);
                info('"printHook" set.');
                break;
            default:
                info('Unknown option "' + opt + '".');
                break;
        }
    }

    // constructors

    function API () {
        this.set = set;
        this.log = log;
        this.send = send;
        this.clear = function () {
            clear(), info('Console was cleared.');
        };
    }

    function History (size) {
        var i = 0, items = [''];
        this.up = function () {
            return items[++i < items.length ? i : --i];
        };
        this.down = function () {
            return items[--i > -1 ? i : ++i];
        };
        this.save = function (input) {
            i = 0;
            if (input) items[0] = input;
            if (items[0] === items[1]) {
                items[0] = '';
            } else {
                items.unshift('');
                if (items.length > size) {
                    items.pop();
                }
            }
        };
    }
})(console);
