(function(){
	function newMap(){
		return $_youapp.$_util.newMap();
	}
	var datacenter=newMap();
	
	$_youapp.$_storage={
			put:function(key,val){
				datacenter.put(key,val);
			},
			get:function(key){
				return datacenter.get(key);
			},
			remove:function(key){
				return datacenter.remove(key);
			},
			exists:function(key){
				return datacenter.exists(key);
			},
			val:function(){
				return datacenter.val();
			}
	}
})()