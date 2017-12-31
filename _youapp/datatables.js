$.fn.extend({
	
	getSelectedRow:function(){
		var list=$(this.selector).data("datatables-checked");
		if(list){
			return list.val();
		}
		return [];
	}
	,
	/**
	 * {
				selected:true,
				checkbox:false,
				index:false,
				createdRow:function(){},
				serverSide:true,
				processing:true,
				paging: false,
				ops:{
					view:function(id,rowData){
					},
					edit:function(id,rowData){
					},
					del:function(id,rowData){
					}
				},
				callAfterDrawn:function(data,opts){
				},
				createdRow: function ( row, data, index ){
				},
				removeColumns:true
		}
	 */
	initDataTable : function(options) {
		$(this).css("width", "100%");
		$(this).addClass("table table-striped table-bordered table-condensed table-hover");

        var defaultOpts = {
            selected: true,
            checkbox: false,
            index : false,
            createdRow: function () {
            },
            paging: true,
            removeColumns: true
        }
		
		options=$.extend({},defaultOpts,options);
		
		options.serverSide =true;
		options.processing=true;
		var _columns=[];
		var checkboxColumns=[{
            "orderable":      false,
            "data":           null,
            "width":"1%",
            "title": '<div style="text-align:center;">'+ '<input class="minimal" name="all" value="0" type="checkbox" />' +'</div>',
            "render": function (data, type, row, meta) {
                return '<div style="text-align:center;">'+  '<input class="minimal" name="sub" value="' + row.id + '" type="checkbox" />'  +'</div>';
            }
        }];
		var opsColumns=[];
		if(options.ops){
			
			var opsGenColumns=[{
	            "orderable":      false,
	            "data":           null,
	            "width":"10%",
	            "title":'操作',
	            "render": function (data, type, row, meta) {
	            	var _ops=options.ops;
	            	var viewHtml='';
	            	var rowId=row.id;
	            	if(_ops.view){
	            		viewHtml='<a  data-rowId="'+rowId+'"  id="row_view_btn_'+rowId+'" name="row_view_btn"  '
	            		+ ' style="" class="btn btn-link font-blue"  title="查看"><i class="glyph-icon icon-eye"></i></a>';
	            	}
	            	var editHtml='';
	            	if(_ops.edit){
	            		editHtml='<a data-rowId="'+rowId+'"  id="row_edit_btn_'+rowId+'" name="row_edit_btn"  '
	            		+ '  style="" class="btn btn-link font-green" title="编辑" ><i class="glyph-icon icon-pencil"></i></a>';
	            	}
	            	var delHtml='';
	            	if(_ops.del){
	            		delHtml='<a data-rowId="'+rowId+'"  id="row_del_btn_'+rowId+'" name="row_del_btn"   '
	            		+ ' style="" class="btn btn-link font-red" title="删除" ><i class="glyph-icon icon-trash"></i></a>';
	            	}
	            	
	            	return '<div style="">'+viewHtml+editHtml+delHtml+'<div>';
	            }
	        }];
			opsColumns=opsColumns.concat(opsGenColumns);
			
		}

        var indexColumns = [{
            "searchable": false,
            "orderable": false,
            "width":"1%",
			"render" : function (data, type, row, meta) {
            	var startIndex=meta.settings._iDisplayStart;
            	var rowIndex=meta.row;
				var rowNumber=startIndex+rowIndex+1;
            	return '<div style="text-align: center;width: 100%">'+rowNumber+'</div>';
            }

        }];

		if(options.checkbox){
			_columns=_columns.concat(checkboxColumns);
		}

        if(options.index){
            _columns=_columns.concat(indexColumns);
        }

        _columns=_columns.concat(options.columns);
		
		if(options.ops){
			_columns=_columns.concat(opsColumns);
		}
		options.columns=_columns;
		
		function DatatableAjax($datatableDom,options){
			this. _options=options;
			this.$wrap=$datatableDom;
			
			
			this.ajaxSuccess=function(data,callback){
				callback(data);
				this.clearStatus(data);
				this.onSelected(data);
				this.onChecked(data);
				this.onOperation(data);
				this.onCallAfterDrawn(data);
			}
			
			this.clearStatus=function(data){
				$wrap.removeData("datatables-checked");
			}
			
			this.onCallAfterDrawn=function(data){
				if(this._options.callAfterDrawn){
					this._options.callAfterDrawn(data,this._options);
				}
			}
			
			this.onSelected=function(data){
				if(this._options.selected){
					$wrap.find('tbody').off( 'click', '>tr');
	  				$wrap.find('tbody').children('tr').on( 'click', {$table:$wrap}, function () {
	  			        $(this).toggleClass('selected');
	  			        $subChk=$(this).find('input[type="checkbox"].minimal').filter('[name="sub"]');
	  			        if($(this).hasClass('selected')){
	  			        	$subChk.iCheck('check');
	  			        }
	  			        else{
	  			        	$subChk.iCheck('uncheck');
	  			        }
	  			    } );
	  			}
			}
			
			this.onChecked=function(data){
				if(this._options.checkbox){
		  			
		  			var $chk=$wrap.find('input[type="checkbox"].minimal');
		  			var $allChk=$chk.filter('[name="all"]');
		  			var $subChks=$chk.filter('[name="sub"]');
		  		//check-box
  				  	//iCheck for checkbox and radio inputs
  				    $chk.iCheck({
  				      checkboxClass: 'icheckbox_minimal-blue',
  				      radioClass: 'iradio_minimal-blue'
  				    });
		  		
		  		
  				  $allChk
  				  .on('ifChecked', function(event){
  					$subChks.iCheck('check');
  				  }
  				  );
  				  
  				 $allChk
  				  .on('ifUnchecked', function(event){
  					var list=$wrap.data("datatables-checked");
  					if(list.size()==$subChks.length){
  						$subChks.iCheck('uncheck');
  					}
  				  }
  				  );
  				  
		  		
  				$subChks
  				  .on('ifChecked', function(event){ 
  					//debugger;
  					var id=$(event.target).val();
  					var list=$wrap.data("datatables-checked");
  					if(list){
  						if(!list.exists(id)){
	  						list.add(id);
	  					}
  					}
  					else{
  						list=$_youapp.$_util.newList();
  						list.add(id);
  						$wrap.data("datatables-checked",list);
  					}
  					
  					if(list.size()==$subChks.length){
  						$allChk.iCheck('check');
  					}
  					
  				  }
  				  );
  				 
  				$subChks
  				  .on('ifUnchecked', function(event){ 
  					var id=$(event.target).val();
  					var list=$wrap.data("datatables-checked");
  					if(list){
  						if(list.exists(id)){
	  						list.remove(id);
	  					}
  					}
  					$allChk.iCheck('uncheck');
  					}
  				  );
	  			}
				
			}
			
			this.onOperation=function(data){
				if(this._options.ops){
	  				var _ops=this._options.ops;
	  				if(_ops.view){
	  					$wrap.find('a[name=row_view_btn]')
	  						.on("click",function(event){
		            		_ops.view($(this).data("rowid"),{});
		            		event.stopPropagation();
		            	});
	            	}
	  				
	            	if(_ops.edit){
	  					$wrap.find('a[name=row_edit_btn]')
	  						.on("click",function(event){
		            		_ops.edit($(this).data("rowid"),{});
		            		event.stopPropagation();
		            	});
	            	}
	            	
	            	if(_ops.del){
	            		$wrap.find('a[name=row_del_btn]')
	            		.on("click",function(event){
	            			
	            			var jc=$.confirm({
	            			    title: false,
	            			    content: '确定删除？',
	            			    confirm: function(){
	            			    	_ops.del(this.passData.rowid,{});
	            			    },
	            			    cancel: function(){
	            			    },
	            			    confirmButton: '确定',
	            			    cancelButton: '撤销',
	            			    onOpen: function(){
	            			    }
	            			});
	            			jc.passData={rowid:$(this).data("rowid")};
	            			event.stopPropagation();
	            		});
	            	}
	  				
	  			}
				
			}
			
			this.ajax=function(data, callback, settings,options,$wrap){
				// debugger;
				$_youapp.$_data.ajaxGet({
					url:options.url,
					formData:options.urlDataFn.apply(),
					paginationData:$.extend({},{
				  		pageNumber:data.start/data.length,
						pageSize:(data.length==-1?10000:data.length),
						orders:[]
				  		}),
			  		success:function(data){
                        data.recordsTotal=data.totalRecordNumber;
                        data.recordsFiltered=data.totalRecordNumber;
						new DatatableAjax($wrap,options).ajaxSuccess(data,callback);
			  			}
					
				});
			}
			
			
			
		}
		
		
		if(options.removeColumns){
			$(this).wrap(function(){
				return '<div class="remove-columns"></div>';
			});
		}
		
//		$wrap=$('#editable');
		var $wrap=$(this.selector);
		var dataTableObj= $(this.selector).DataTable({
			paging:options.paging,
			processing : options.processing,
			serverSide : options.serverSide,
			ajax : function(data, callback, settings){
				new DatatableAjax().ajax(data, callback, settings,options,$wrap)
			},
			createdRow:function( row, data, index ){
				
				function addTitle(ele,i){
					var title=options.columns[i].title;
					if(!title){
						title=options.columns[i].data;
					}
					if($(title).is('input')||$(title).find('input[type="checkbox"]').length>0){
						title='ischeck';
					}
					$(ele).attr('data-title',title);
				}
				$(row).find('td').each(function(i){
					addTitle(this,i);
				});
				if(index%2==0){
					//$(row).addClass('trodd');
				}
				else{
					//$(row).addClass('treven');
				}
				if(options.createdRow){
					options.createdRow(row, data, index);
				}
				
			},
			columns : _columns,
			sPaginationType: "full_numbers",
			language: {
				    paginate: {
				      first: "首页",
				      last:"尾页",
				      previous:"前一页",
				      next:"后一页"
				    },
				    // info:"显示  _START_  到  _END_ 条记录, 共  _TOTAL_  条记录",
                	info:", 共  _TOTAL_  条记录",
				    infoEmpty:"没有数据",
				    lengthMenu: "每页显示 _MENU_ 条记录",
				    infoFiltered: "(从 _MAX_ 条数据中检索)",
				    loadingRecords: "Please wait - loading...",
				    zeroRecords: "No records to display",
				    processing: "处理中..."
			},
			dom: 
			//"<'row'<'col-sm-6'l><'col-sm-6'f>>" +
			//"<'row'<'col-sm-12'tr>>" +
			"tr"+	
			"<'row'<'col-sm-5'li><'col-sm-7'p>>",
			/* oLanguage: {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "抱歉， 没有找到",
				"sInfo": "显示  _START_  到  _END_ 条记录, 共  _TOTAL_  条记录",
				"sInfoEmpty": "没有数据",
				"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
				"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "前一页",
				"sNext": "后一页",
				"sLast": "尾页"
				},
			sZeroRecords: "没有检索到数据"
			},
			*/
			bSort:false,
			searching:false,
            lengthMenu: [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
		});
		return dataTableObj;
	}
});