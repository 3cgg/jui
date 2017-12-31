(function(){
	function _JSTree(){
	
		this.format=function(data,opts){
			
			function ele(data,opts){
				var obj={
						id:data.id,
						text:data.name,
						/*state:{
							opened:data.children.length>0
						},*/
						children:[]
				}
				return obj;
			}
			
			function cycle(eles,opts,parent){
				for(var i=0;i<eles.length;i++){
					var _data=eles[i];
					var _eleData= ele(_data,opts);
					if(parent){
						parent.children.push(_eleData);
					}
					
					if(_data.meta.level==1){
						tree.push(_eleData);
					}
					cycle(_data.children,opts,_eleData);
				}
			}
			var tree=[];
			cycle(data,opts);
			return tree;
		}
		
	}
	
	window.$_youapp.$_jstree=new _JSTree();
})(window);
