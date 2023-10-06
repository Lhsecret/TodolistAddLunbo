 //绑定事件
 function addEvent(el, type, fn){
    if(el.addEventListener){
        el.addEventListener(type, fn)
    }else if(el.attachEvent){
        el.attachEvent('on' + type, function(){
            handle.call(el);
        })
    }else{
        el['on' + type] = fn;
    }
}
//获取滚动条距离
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else{
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//获取窗口文档显示区
function getViewportSize(){
    if(window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === 'BackCompat'){
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }else{
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}

//获取文档高度
function getScrollSize(){
    if(document.body.scrollHeight){
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    }else{
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}

//获取盒子与视口边界的距离
function getElemDocPosition(el){
    var parent = el.offsetParent,
        offsetLeft = el.offsetLeft,
        offsetTop = el.offsetTop;

    while(parent){
        offsetLeft += parent.offsetLeft;
        offsetTop += parent.offsetTop;
        parent = parent.offsetParent;
    }

    return {
        left: offsetLeft,
        top: offsetTop
    }
}




//寻找子元素
function elemChildren(node){
    var temp = {
        'length': 0,
        'splice': Array.prototype.splice
    },
    len = node.childNodes.length;

    for(var i = 0; i < len; i++){
        var childItem = node.childNodes[i];
        if(childItem.nodeType === 1){
            temp[temp.length] = childItem;
            temp['length']++;
        }
    }
    return temp;
}

function elemParent(node, n){
    var type = typeof(n);
    if(type === 'undefined'){
        return node.parentNode;
    }else if(n <= 0 || type !== 'number'){
        return undefined;
    }

    while(n){
        node = node.parentNode;
        n--;
    }
    return node;
}

//寻找兄弟元素
Element.prototype.elemSibling = function(n){
    var elem = this;
    while(n){
        if(n > 0){
            if(elem.nextElementSibling){
                elem = elem.nextElementSibling;
            }else{
                for(elem = elem.nextSibling; elem && elem.nodeType !== 1; elem = elem.nextSibling);
            }
            n--;
        }else if(n < 0){
            if(elem.previousElementSibling){
                elem = elem.previousElementSibling;
            }else{
                for(elem = elem.previousSibling; elem && elem.nodeType !== 1; elem.previousSibling);
            }
            n++;
        }
    }
    return elem;
}


// requestAnimationFrame兼容处理
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame||
      window.oRequestAnimationFrame ||
      function (callback) {
        return setTimeout(callback, Math.floor(1000 / 60))
      }
    )
  }
  //深拷贝
  function deepClone(origin, target){
    var target = target || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]';

    for(var key in origin){
        if(origin.hasOwnProperty(key)){
            if(typeof(origin[key]) === 'object' && origin[key] !== null){
                toStr.call(origin[key]) === arrType ? target[key] = [] : target[key] = {};
                deepClone(origin[key], target[key]);
            }else{
                target[key] = origin[key];
            }
        }
    }
    return target;
  }


  //取消冒泡
  function cancelBubble(e){
    var e = e;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
  }

  //重写forEach方法
  Array.prototype.myForEach = function(fn){
    var arr = this,
        len = this.length,
        arg2 = arguments[1] || window;
    for(var i = 0;i < len; i++){
        fn.apply(arg2, [arr[i], i, arr]);
    }
}

//重写filter方法
Array.prototype.myFilter = function(fn){
    var arr = this,
        nArr = [],
        len = arr.length,
        args = arguments[1] || window,
        item;
    
    for(var i = 0; i < len; i++){
        if(typeof(arr[i]) === 'object'){
            item = deepClone(arr[i]);
            fn.apply(args, [arr[i], i, arr]) ? nArr.push(item) : ''
        }else{
            fn.apply(args, [arr[i], i, arr]) ? nArr.push(arr[i]) : ''
        }
        
    }
    return nArr;
}

    //重写map方法
    Array.prototype.myMap = function(fn){
        var arr = this,
            args = arguments[1] || window,
            len = arr.length,
            item,
            val,
            nArr = [];
        for(var i = 0; i < len; i++){
            if(typeof(arr[i]) === 'object'){
                item = deepClone(arr[i])
                val = fn.apply(args, [item, i, arr]);
                nArr.push(val); 
            }else{
                val = fn.apply(args, [arr[i], i, arr]);
                nArr.push(val); 
            }

        }
        return nArr;
    }

    //将函数promise化
    function promiseify(fn){
        return function(...args){
            return new Promise((resolve, reject) => {
                fn(...args, (err, data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
            })
        }
    }

    //将一个对象所有的方法promise化
    function promiseifyAll(obj){
        for([key, fn] of Object.entries(obj)){
            if(typeof fn === 'function'){
                obj[key + 'Async'] = promiseify(fn)
            }
        }
    }

    //重写迭代器接口
    function makeIterator(arr){
        var len = arr.length,
            index = 0;
        return {
            next: function(){
               return index < len ? 
               {value: arr[index++], done: false} :
               {value: undefined, done: true}
            }
        }
    }


    //获取元素样式属性值
    function getStyles(elem, prop){
        if(window.getComputedStyle){
            if(prop){
                return window.getComputedStyle(elem, null)[prop];
            }else{
                return window.getComputedStyle(elem, null);
            }
        }else{
            if(prop){
                return elem.currentStyle[prop];
            }else{
                return elem.currentStyle;
            }
        }
    }