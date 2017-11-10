/**
 * The toXML() method converts a JavaScript value to an XML string.
 *
 * @function toXML
 * @param value {Object} The value to convert to an XML string.
 * @param [replacer] {Function} A function that alters the behavior
 * of the stringification process.
 * @param [space] {Number|String} A String or Number object that's
 * used to insert white space into the output XML string for
 * readability purposes. If this is a Number, it indicates the number
 * of space characters to use as white space.
 * If this is a String, the string is used as white space.
 * @returns {String}
 */
if (!Object.keys) Object.keys = function(o) {
    	  if (o !== Object(o))
    	    throw new TypeError('Object.keys called on a non-object');
    	  var k=[],p;
    	  for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    	  return k;
}
var toXML;

(function(exports) {

  var TYPES = {
    "boolean": fromString,
    "number": fromString,
    "object": fromObject,
    "string": fromString
  };

  var ESCAPE = {
    "\t": "&#x09;",
    "\n": "&#x0a;",
    "\r": "&#x0d;",
    " ": "&#x20;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };

  var ATTRIBUTE_KEY = "@";
  var CHILD_NODE_KEY = "#";
  var LF = "\n";

  var isArray = Array.isArray || _isArray;

  var REPLACE = String.prototype.replace;

  exports.toXML = toXML = _toXML;

  function _toXML(value, replacer, space) {
    var job = createJob(replacer, space);
    fromAny(job, "", value);
    return job.r;
  }

  function createJob(replacer, space) {
    var job = {
      f: replacer, // replacer function
      // s: "", // indent string
      // i: 0, // indent string length
      l: "", // current indent string
      r: "" // result string
    };

    if (space) {
      var str = "";

      if (space > 0) {
        for (var i = space; i; i--) {
          str += " ";
        }
      } else {
        str += space; // stringify
      }
      job.s = str;

      // indent string length
      job.i = str.length;
    }

    return job;
  }

  function fromAny(job, key, value) {
    // child node synonym
    if (key === CHILD_NODE_KEY) key = "";

    if (_isArray(value)) return fromArray(job, key, value);

    var replacer = job.f;
    if (replacer) value = replacer(key, value);

    var f = TYPES[typeof value];
    if (f) f(job, key, value);
  }

  function fromString(job, key, value) {
    if (key === "?") {
      // XML declaration
      value = "<?" + value + "?>";
    } else if (key === "!") {
      // comment, CDATA section
      value = "<!" + value + ">";
    } else {
      value = escapeTextNode(value);
      if (key) {
        // text element without attributes
        value = "<" + key + ">" + value + "</" + key + ">";
      }
    }

    if (key && job.i && job.r) {
      job.r += LF + job.l; // indent
    }

    job.r += value;
  }

  function fromArray(job, key, value) {
    Array.prototype.forEach.call(value, function(value) {
      fromAny(job, key, value);
    });
  }

  function fromObject(job, key, value) {
    // empty tag
    var hasTag = !!key;
    var closeTag = (value === null);
    if (closeTag) {
      if (!hasTag) return;
      value = {};
    }
    var keys = Object.keys(value);
    
    var keyLength = keys.length;
    var attrs = keys.filter(isAttribute);
    var attrLength = attrs.length;
    var hasIndent = job.i;
    var curIndent = job.l;
    var willIndent = hasTag && hasIndent;
    var didIndent;

    // open tag
    if (hasTag) {
      if (hasIndent && job.r) {
        job.r += LF + curIndent;
      }

      job.r += '<' + key;

      // attributes
      attrs.forEach(function(name) {
        writeAttributes(job, name.substr(1), value[name]);
      });

      // empty element
      var isEmpty = closeTag || (attrLength && keyLength === attrLength);
      if (isEmpty) {
        var firstChar = key[0];
        if (firstChar !== "!" && firstChar !== "?") {
          job.r += "/";
        }
      }

      job.r += '>';

      if (isEmpty) return;
    }

    keys.forEach(function(name) {
      // skip attribute
      if (isAttribute(name)) return;

      // indent when it has child node but not fragment
      if (willIndent && ((name && name !== CHILD_NODE_KEY) || isArray(value[name]))) {
        job.l += job.s; // increase indent level
        willIndent = 0;
        didIndent = 1;
      }

      // child node or text node
      fromAny(job, name, value[name]);
    });

    if (didIndent) {
      // decrease indent level
      job.l = job.l.substr(job.i);

      job.r += LF + job.l;
    }

    // close tag
    if (hasTag) {
      job.r += '</' + key + '>';
    }
  }

  function writeAttributes(job, key, val) {
    if (isArray(val)) {
      val.forEach(function(child) {
        writeAttributes(job, key, child);
      });
    } else if (!key && "object" === typeof val) {
      Object.keys(val).forEach(function(name) {
        writeAttributes(job, name, val[name]);
      });
    } else {
      writeAttribute(job, key, val);
    }
  }

  function writeAttribute(job, key, val) {
    var replacer = job.f;
    if (replacer) val = replacer(ATTRIBUTE_KEY + key, val);
    if ("undefined" === typeof val) return;

    // empty attribute name
    if (!key) {
      job.r += ' ' + val;
      return;
    }

    // attribute name
    job.r += ' ' + key;

    // property attribute
    if (val === null) return;

    job.r += '="' + escapeAttribute(val) + '"';
  }

  function isAttribute(name) {
    return name && name[0] === ATTRIBUTE_KEY;
  }

  function escapeTextNode(str) {
    return REPLACE.call(str, /(^\s|[&<>]|\s$)/g, escapeRef);
  }

  function escapeAttribute(str) {
    return REPLACE.call(str, /([&"])/g, escapeRef);
  }

  function escapeRef(str) {
    return ESCAPE[str] || str;
  }

  function _isArray(array) {
    return array instanceof Array;
  }

})(typeof exports === 'object' && exports || {});
