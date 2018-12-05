var XmlJsonUtil=
{
		
	xmlFile2Json:function(xmlFile)/**读取xml格式的文件，生成json对象**/
	{
	  this.xmlDoc=null;	   
       if(!window.DOMParser && window.ActiveXObject)
       {
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    this.xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    break;
                }catch(e){
                }
            }
        }
       else if(document.implementation && document.implementation.createDocument)
       	{       
        try{
             this.xmlDoc = document.implementation.createDocument('','',null);            
         }catch(e){
         }
  		}
        if(this.xmlDoc!=null){
            this.xmlDoc.async = false;
            this.xmlDoc.load(xmlFile);
            var root=this.xmlDoc.documentElement;
		    var childs=root.childNodes;
		    var jsonobj=new Array();
		    for(var i=0;i<childs.length;i++)
		    	{
		    	   //alert(childs[i].tagName+":"+childs[i].firstChild.nodeValue);
		    	   jsonobj[childs[i].tagName]=childs[i].firstChild.nodeValue;
		    	}
		    return jsonobj;
        }
	},
    xmlString2Json:function(xmlString)/**读取xml格式的字符串，生成json对象**/
    {
		 this.xmlDoc=null;	   
       if(!window.DOMParser && window.ActiveXObject)
       {
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    this.xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    this.xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    this.xmlDoc.async = false;
                    this.xmlDoc.loadXML(xmlString); 
                    break;
                }catch(e){
                }
            }
        }
       else if(window.DOMParser && document.implementation && document.implementation.createDocument)
       	{       
        try{
             domParser = new DOMParser();
             this.xmlDoc = domParser.parseFromString(xmlString,"text/xml");
         }catch(e){
         }
  		}
       if(this.xmlDoc!=null)
    	   {
		    var root=this.xmlDoc.documentElement;
		    var childs=root.childNodes;
		    var jsonobj=new Array();
		    for(var i=0;i<childs.length;i++)
		    	{
		    	   //alert(childs[i].tagName+":"+childs[i].firstChild.nodeValue);
		    	   jsonobj[childs[i].tagName]=childs[i].firstChild.nodeValue;
		    	}
		    return jsonobj;
    	   }
    },
    json2XmlString:function(jsonObj)/**将json对象转成xml格式的字符串，**/
    {
    	//var xmlStr = '<?xml version="1.0" encoding="UTF-8" ?>';
        var str='';
    	for(var i in jsonObj){
          str+="<"+i+">"
          if(jsonObj[i] instanceof Object)
           {
           this.json2XmlString(jsonObj[i]);
           }
          else if(jsonObj[i] instanceof Array)
          {
		      for(var j=0;j<jsonObj[i].length;j++)
		      {
		           //toStr(json[i][j]);
		          if(j<jsonObj[i].length-1)
		          {
		            str+="</"+i+"><"+i+">"
		          }
		      }
   		   }
         else
         {
		     str+=jsonObj[i];
	     }
        str+="</"+i+">"
      } 
       //return xmlStr+str;    
       return str;    
   },
   appendFlagBeginEnd:function(flag,xmlstr)
   {
	   var xmlhead = '<?xml version="1.0" encoding="UTF-8" ?>';
	   return xmlhead+"<"+flag+">"+xmlstr+"</"+flag+">"
   },
    jsonToString: function(obj){   
        var THIS = this;    
        switch(typeof(obj)){   
            case 'string':   
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';   
            case 'array':   
                return '[' + obj.map(THIS.jsonToString).join(',') + ']';   
            case 'object':   
                 if(obj instanceof Array){   
                    var strArr = [];   
                    var len = obj.length;   
                    for(var i=0; i<len; i++){   
                        strArr.push(THIS.jsonToString(obj[i]));   
                    }   
                    return '[' + strArr.join(',') + ']';   
                }else if(obj==null){   
                    return 'null';   
   
                }else{   
                    var string = [];   
                    for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));   
                    return '{' + string.join(',') + '}';   
                }   
            case 'number':   
                return obj;   
            case false:   
                return obj;   
        }   
    },  


}
