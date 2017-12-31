(function(){
	function _Util(){

		function List() {
			this.arrys = [];
			this.position = -1;

			function equals($_this, $_another) {
				if ($_this.equals && $.isFunction($_this.equals)) {
					return $_this.equals.apply($_this, [ $_another ]);
				} else {
					if ($.type($_this) === 'string' || $.type($_this) === 'boolean'
							|| $.type($_this) === 'number' || $.type($_this) === 'date') {
						return $_this == $_another;
					} else {
						for ( var i in $_this) {
							equals($_this[i], [ $_another[i] ]);
						}
					}
				}
			}

			this.size = function() {
				return this.position + 1;
			};

			this.length = function() {
				return this.arrys.length;
			};

			this.resize = function() {
				tempArr = [ this.size() * 1.25 + 5 ];
				for (var i = 0; i < this.size(); i++) {
					tempArr[i] = this.arrys[i];
				}
				this.arrys = tempArr;
			};

			this.exists = function(id) {
				exists = false;
				var i = 0;
				for (; i < this.size(); i++) {
					if (equals(this.arrys[i], id)) {
						exists = true;
						break;
					}
				}
				return exists;
			};

			this.indexOf = function(id) {
				exists = false;
				var i = 0;
				for (; i < this.size(); i++) {
					if (equals(this.arrys[i], id)) {
						exists = true;
						break;
					}
				}
				return exists ? i : -1;
			};

			this.add = function(id) {
				if (this.size() == this.length()) {
					this.resize();
				}
				this.position++;
				this.arrys[this.position] = id;
			};

			this.compress = function() {
				var tempPosition = -1;
				for (var i = 0; i <= this.position; i++) {
					if (this.get(i) == null) {
						var j = i + 1;
						while (j <= this.position) {
							if (this.get(j) != null) {
								this.arrys[i] = this.get(j);
								this.arrys[j] = null;
								tempPosition = i;
								break;
							} else {
								j++;
							}
						}
					} else {
						tempPosition = i;
					}
				}
				this.position = tempPosition;
			};

			this.get = function(index) {
				return this.arrys[index];
			}

			this.remove = function(id) {
				var index = this.indexOf(id);
				if (index != -1) {
					this.arrys[index] = null;
				}
				this.compress();
			};

			this.val = function() {
				var tempArr = [];
				for (var i = 0; i < this.size(); i++) {
					if (this.get(i) != null) {
						tempArr[i] = this.get(i);
					}
				}
				return tempArr;
			}
		}


		function ListMap(){

			this.entries = new List();

			function genEntry(key, val) {
				return {
					key : key,
					value : val,
					equals : function($obj) {
						return this.key == $obj.key;
					}
				}
			}

			this.put = function(key, val) {
				var entry = genEntry(key, val);
				if (this.entries.exists(entry)) {
					this.entries.remove(entry);
				}
				this.entries.add(entry);
			}

			this.get = function(key) {
				var entry = genEntry(key, null);
				var index = this.entries.indexOf(entry);
				if (index != -1) {
					return this.entries.get(index).value;
				}
			}

			this.exists = function(key) {
				var entry = genEntry(key, null);
				return this.entries.exists(entry);
			}

			this.remove = function(key) {
				var entry = genEntry(key, null);
				return this.entries.remove(entry);
			}

			this.val = function() {
				return this.entries.val();
			}

			this.size = function() {
				return this.entries.size();
			}

			this.keys = function() {
				var keys = [];
				var keyVals = this.val();
				for (var i = 0; i < keyVals.length; i++) {
					keys[i] = keyVals[i].key;
				}
				return keys;
			}

			this.values = function() {
				var values = [];
				var keyVals = this.val();
				for (var i = 0; i < keyVals.length; i++) {
					values[i] = keyVals[i].value;
				}
				return values;
			}

		}

		/**
		 *{
			url:'www.baidu.com',
			data:{},
			async:true,
			type:'GET'
			}
		 */
		function Ajax(){

			this.request=function(options){
				var defOptions={
						async:true,
						data:{},
						headers:{}
				}
				var _options={};
				_options=$.extend(_options,defOptions,options);
                if(_options.url.indexOf('pages/quicktask/undefined')!=-1){
                    debugger;
                }
				$.ajax({
				    url: _options.url,
				    type: _options.type,
				    //context: document.body,
				    data:_options.data,
				    async:_options.async,
						headers:
						$.extend({},_options.headers,{
						        _token: $_youapp.$_ticket.getTicket()
						}),
				    success: function(data){
				    	$_youapp.$_util.log('success: '+_options.url);
				    	if(_options.success){
				    		_options.success(data);
				    	}
				    },
				    error:function(data){
				    	$_youapp.$_toast.error('error: '+_options.url);
				    	if(_options.error){
				    		_options.error(data);
				    	}
				    }
				});
			}
		}

		this.ajaxGet=function(options){
			var ajax=new Ajax();
			ajax.request($.extend({},options,{type:'GET'}));
		}

		this.ajaxPost=function(options){
			var ajax=new Ajax();
			ajax.request($.extend({},options,{type:'POST'}));
		}

		this.newList=function(){
			return new List();
		}

		this.isList=function(obj){
			return List==obj.constructor
		}

		this.newMap=function(){
			return new ListMap();
		}

		this.log=function(msg){
			if(window.console){
				window.console.log(msg);
			}
		}

		this.serializeObj=function(formSelector){
			var obj={};
			var arrays= $(formSelector).serializeArray();
			for(var i=0;i<arrays.length;i++){
				var ele=arrays[i];
				var eleName=$.trim(ele.name);
				var eleValue=$.trim(ele.value);
				if(obj[eleName]){
					var val=obj[eleName];
					if(val.constructor===List){
						val.add(eleValue);
					}
					else{
						var tep=val;
						val=this.newList();
						val.add(tep);
						val.add(eleValue);
						obj[eleName]=val;
					}
				}
				else{
					obj[eleName]=eleValue;
				}
			}

			for(var i in obj){
				var ele=i;
				var val=obj[ele];
				if(val.constructor===List){
					obj[ele]=val.val();
				}
			}
			return obj;
		}

		this.json=function(obj){
			return JSON.stringify(obj);
		}

		this.formJson=function(formSelector){
			return JSON.stringify(this.serializeObj(formSelector));
		}

	}

	window.$_youapp.$_util=new _Util();
})(window);
