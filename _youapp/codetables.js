(function(){
	
	function newMap(){
		return $_youapp.$_util.newMap();
	}
	
	function newList(){
		return $_youapp.$_util.newList();
	}
	
	function Code(code,name){
		this.code=code;
		this.name=name;
		this.desc='';
		this.type='';
		this.source;
		this.equals=function($obj) {
			return this.type == $obj.type
					&&this.code == $obj.code;
		}
	}
	
	
	var codes=newMap();
	$_youapp.$_storage.put('_codetable_key_',codes);
	
	var codeNames=newMap();
	$_youapp.$_storage.put('_codetable_quick_names_key_',codes);
	
	var finalOpts;
	
	function codeNameKey(type,code){
		return type+"-"+code;
	}
	/**
	 * {
	 * 
	 * 
	 * 
	 * }
	 */
	function load(options){
		finalOpts=options;
		var data=options.data;
		for(var i=0;i<data.length;i++){
			var _code=data[i];
			store(_code);
		}
	}
	
	
	function store(_code){
		var type=finalOpts.getType(_code);
		var code=finalOpts.getCode(_code);
		var name=finalOpts.getName(_code);
		var desc=finalOpts.getDesc(_code);
		var codeObj=new Code(code,name);
		codeObj.desc=desc;
		codeObj.type=type;
		codeObj.source=_code;
		// store code types.
		if(codes.exists(type)){
			var codeList=codes.get(type);
			codeList.add(codeObj);
		}
		else{
			var codeList=newList();
			codeList.add(codeObj);
			codes.put(type,codeList);
		}
		
		//store code names
		var key=codeNameKey(type,code);
		if(!codeNames.exists(key)){
			codeNames.put(key,name);
		}
		
		return codeObj;
	}
	
	function getName(type,code){
		var key=codeNameKey(type,code);
		var name=codeNames.get(key);
		return name?name:'';
	}
	
	function getCodes(type){
		var _codes=codes.get(type);
		return _codes?_codes:newList();
	}
	
	/**
	 * fnFilter:function($dom,_code){
			return true;
		}
	 */
	function draw($dom,fnFilter){
		var $dom=$($dom);
		var _fnFilter=fnFilter?fnFilter:function($dom,_code){
			return true;
		}
		
		function selectRender(_select){
			var $select=$(_select);
			var type=$select.data('codetype');
			var _codeList=getCodes(type);
			var codealter=$select.data('codealter');

			function process(data,external){
				var _codeTempList=data;
				if(!$_youapp.$_util.isList(_codeTempList)){
					_codeTempList=newList();
					for(var i=0;i<data.length;i++){
						_codeTempList.add(data[i]);
					}
				}
				var _codeList=newList();
				if(!external){
					for(var i=0;i<_codeTempList.size();i++){
						_codeList.add(store(_codeTempList.get(i)));
					}
				}
				else{
					_codeList=data;
				}
				var optionEles='';
				if(codealter||codealter==''){
					optionEles=optionEles+'<option value="" >'+(codealter==''?'请选择':codealter)+'</option>'
				}
				for(var i=0;i<_codeList.size();i++){
					var _code=_codeList.get(i);
					if(_fnFilter($select,_code)){
						optionEles=optionEles+'<option value="'+_code.code+'" >'+_code.name+'</option>'
					}
				}
				$select.empty().append(optionEles);
			}
			
			if(_codeList.size()==0&&finalOpts&&finalOpts.fnData){
				finalOpts.fnData(type,process);
			}
			else{
				process(_codeList,'inner');
			}
			
		}
		
		if($dom.is('select')
				&&$dom.hasClass('codetable')){
			$dom.each(function(){
				selectRender(this);
			});
		}
		else{
			$dom.find('.codetable').each(function(){
				selectRender(this);
			});
		}
		
	}
	
	$_youapp.$_codeTable={
			
			/**
			 * {
			 * 
			 * fnDatas:function(callback(datas){}){   初始化加载所有的CODETABLES
			 * },
			 * 
			 * fnData:function(type,callback){  如果在本地JS里面没有找到，会调用此API来获取CODE（单个CODE加载）
			 * },
			 * getType:function(data){  获取TYPE API
			 *		return data.desc;
			 *	},
			 *	getCode:function(data){  获取CODE API
			 *		return data.code;
			 *	},
			 *	getName:function(data){  获取NAME API
			 *		return data.value;
			 *	},
			 *	getDesc:function(data){  获取DESC API
			 *		return data.desc;
			 *	}
			 * }
			 * @param options
			 */
			codeTable:function(options){
				function callback(datas){
					$_youapp.$_codeTable.load($.extend({},{data:datas},options));
				}
				options.fnDatas(callback);
			},
			/**
			 * {
						getType:function(data){
							return data.desc;
						},
						getCode:function(data){
							return data.code;
						},
						getName:function(data){
							return data.value;
						},
						getDesc:function(data){
							return data.desc;
						},
						data:{}
				}
			 * @param options
			 */
			load:function(options){
				var _defOpts={
						getType:function(data){
							return data.desc;
						},
						getCode:function(data){
							return data.code;
						},
						getName:function(data){
							return data.value;
						},
						getDesc:function(data){
							return data.desc;
						},
						data:{}
				}
				
				var finalOpts={};
				if(options){
					finalOpts=$.extend({},_defOpts,options);
				}
				else{
					finalOpts=$.extend({},_defOpts);
				}
				load(finalOpts);
			},
			getName:getName,
			/**
			 * draw($dom,fnFilter)
			 * fnFilter:function($dom,_code){
					return true;
				}
			 */
			draw:draw,
			
			/**
			 * 获取CODES - LIST ， 根据TYPE ， 此API 只会从本地JS缓存中拿
			 */
			getCodes:getCodes,
			
			defaultDraw:function($dom){
				$_youapp.$_codeTable.draw($($dom).find('.codetable'));
			},

			val:function () {
				return codes.val();
            }
	}
	
	
	
})()