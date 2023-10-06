;(function(node){
    var TodoList = function(){
        var _self = this;
        this.isEdit = false;
        this.index = 0;
        this.node = node;
        this.inputShow = false;
        this.dconfig = {
            "inputArea": "",
            "plusBtn": "",
            "addBtn": "",
            "list": "",
            "itemClass": ""
        }
        this.config = this.getConfig();
        for(var key in this.dconfig){
            if(!this.config.hasOwnProperty(key)){
                console.log(errorInfo(key));
                return ;
            }
        }
        this.setConfig();
        addEvent(this.plusBtn, 'click', function(){
            _self.showInput();
        });
        addEvent(this.addBtn, 'click', function(){
            _self.addList();
        });
        addEvent(this.content, 'click', function(e){
            var tar = e.target || e.srcElement;
            console.log(e);
            _self.clickTwo(tar);
        })
    }

    TodoList.prototype = {
        getConfig: function(){
            return JSON.parse(this.node.getAttribute('data-config'));
        },
        setConfig: function(){
            var node = this.node,
                config = this.config;
            this.inputArea = node.getElementsByClassName(config.inputArea)[0];
            this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
            this.addBtn = node.getElementsByClassName(config.addBtn)[0];
            this.text = this.inputArea.getElementsByClassName('textInput')[0];
            this.content = node.getElementsByClassName(config.list)[0];
            this.item = this.content.getElementsByClassName('item');
        },
        showInput: function(){
            var _self = this;
            if(this.inputShow){
                setInputShow.call(_self, 'close')
            }else{
                setInputShow.call(_self, 'open')
            }
        },
        addList: function(){
            var text = this.text.value,
                Text = this.text,
                isEdit = this.isEdit
                oli = document.createElement('li'),
                item = this.item,
                content = this.content,
                len = item.length;
                var _self = this;
                if(!isEdit){
                    for(var i = 0; i < len; i++){
                        if(text === elemChildren(item[i])[0].innerText){
                            alert('已存在');
                            Text.value = '';
                            return;
                        }
                    }
                
                    oli.className = 'item';
                    oli.innerHTML = itemTpl(text);
                    content.appendChild(oli);
                    Text.value = '';
                    setInputShow.call(_self, 'close')
                }else{
                    elemChildren(this.item[this.index])[0].innerText = text;
                    setInputShow.call(_self, 'close');
                    item[this.index].className = 'item';
                }
            
           
        },

        clickTwo: function(target){
            var _self = this,
                item = this.item,
                len = item.length;
                console.log(target);
            var className = target.className,
                liParent = elemParent(target, 3);
            console.log(liParent,item);
            if(className === 'edit'){
                this.isEdit = true;
                var it;
                setInputShow.call(_self, 'open');
                for(var i = 0;i < len; i++){
                    it = item[i];
                    it.className = 'item';
                }
                liParent.className += ' active';
                var index = Array.prototype.indexOf.call(item, liParent);
                this.addBtn.innerText = "编辑第" + (index + 1) + "项";
            }else if(className === 'delete'){
                liParent.remove();
            }
        }
    }


    function setInputShow(action){
        if(action === 'open'){
            this.inputArea.style.display = 'block';
            this.inputShow = true;
        }else if(action === 'close'){
            this.inputArea.style.display = 'none';
            this.inputShow = false;
        }
    }

    function errorInfo(key){
        return new Error(
            '您没有配置参数' + key
        );
    }


    function itemTpl(val){
        return (
            '<p class="item-content">'+ val + '</p>' +
            '<div class="btn-group">'+
                '<a href="javascript:;" class="svg-edit"><img src="../bianji.svg" alt="" width="15px" height="15px" class="edit"></a>'+
                '<a href="javascript:;" class="svg-delete"><img src="../Delete.svg" alt="" width="15px" height="15px" class="delete"></a>'+
            '</div>'
        )
    }

    new TodoList();
})(document.getElementsByClassName('wrapper')[0]);