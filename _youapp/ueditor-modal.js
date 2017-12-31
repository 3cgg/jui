/**
 *
 * we need put the modal dom under body level , so find the dom from the body source using $,
 * page.root is is bind to the certain layout.
 *
 * Created by J on 2017/10/19.
 */
$.extend(window.$_youapp.pageTemplate,{
    editorModal : function() {
        return {
            parent: {},
            /**
             * modalOpts : {
					 * id : //modal id,
					 * title : // title,
					 * hidden :  // fn(e(事件对象),array(弹出页面的返回参数))
					 * 监听函数，当弹出页面关闭的时候能够获得通知
					 * opt : {}  //modal options
					 * }
             */
            open: function (page, modalOpts, url, params) {

                var opt=$.extend({},
                    {
                        width : '80%'
                    },
                    modalOpts.opt,
                    {
                        height : '90%'
                    });
                var width=opt.width;
                var height=opt.height;
                var divId = modalOpts.id;
                var template = '<div name="editorModalSource" id="' + divId + '" class="modal-backdrop modal fade editor-modal" tabindex="-1" role="dialog" style="overflow: visible;background-color: #ffffff;opacity: 1">'
                    + '<div class="modal-dialog" style="width:'+width+';height: '+height+'" role="document">'
                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="display: none" data-type="none">'
                    + '<span aria-hidden="true">&times;</span></button>'
                    + '<button type="button" class="close editor-modal-btn" data-dismiss="modal" aria-label="Close" data-type="save">'
                    + '<span aria-hidden="true">保存退出</span></button>'
                    + '<button type="button" class="close editor-modal-btn" data-dismiss="modal" aria-label="Close" data-type="unsave">'
                    + '<span aria-hidden="true">丢弃退出</span></button>'
                    + '<h4 class="modal-title" >' + modalOpts.title + '</h4>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $('#' + divId).remove();
                // $('.modal-backdrop').remove();
                // var backdrop='<div class="modal-backdrop fade in"></div>';
                // $('body').append($(backdrop));

                $('body').append($(template));
                var $dom = $('#' + divId);
                $dom.data('parentPage', page);
                $dom.data('params', params);
                $dom.data('modalOpts', modalOpts);

                $dom.addClass('in');
                $dom.css('display','block');

                $dom.find('.modal-header > button.close').on('click',function (e) {

                    var save=false;
                    if($(e.target).data('type')=='save'||$(e.target.parentNode).data('type')=='save'){
                        save=true;
                    }

                    var modalReturnFn = $dom.data('modalReturnFn');
                    var result = {};
                    if (modalReturnFn) {
                        result = modalReturnFn();
                    }
                    if (!$dom.data('modalSkip')&&save) {
                        try {
                            modalOpts.hidden(result);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    try {
                        if ($dom.data('modalHiddenFn')) {
                            $dom.data('modalHiddenFn')();
                        }
                    } catch (e) {

                    }
                    $dom.remove();

                });

                // $dom.find('.modal-content > .modal-body').load($_youapp.$_config.getHtmlEndpoint() + url);

                var requestVO={
                    layoutId:'',
                    htmlUrl:url
                }
                $_youapp.$_util.ajaxGet({
                    url:$_youapp.$_config.getHtmlEndpoint()+'/'+url,
                    // data:{data:$_youapp.$_util.json(requestVO)},
                    requestVO :requestVO, // avoid closure variable refer to the same one with reference type
                    success:function(html){
                        var html='<div>'+html+'</div>';
                        var requestVO =this.requestVO; // run as local variable
                        var $html=$(html);

                        $_youapp.$_htmlWorker.all($html,requestVO); // modify js , css resource location

                        $dom.find('.modal-content > .modal-body').html($html);

                        //append url to hash
                        // location.hash=requestVO.htmlUrl;
                    },
                    error:function(data){
//						var layout=new Layout(data);
//						layout.draw();
                    }
                });

                // $dom.on('hidden.bs.modal', function (e) {
                //     try {
                //         if ($dom.data('modalHiddenFn')) {
                //             $dom.data('modalHiddenFn')(e);
                //         }
                //     } catch (e) {
                //     }
                //     if ($dom.data('modalSkip')) {
                //         return;
                //     }
                //     var modalReturnFn = $dom.data('modalReturnFn');
                //     var result = [];
                //     if (modalReturnFn) {
                //         result[0] = modalReturnFn();
                //     }
                //     try {
                //         modalOpts.hidden(e, result);
                //     } catch (e) {
                //     }
                //     $dom.remove();
                // });
            },
            /**
             * modalOpts : {
					 * id : //modal id,   // optional
					 * title : // title,
					 * hidden : // fn 监听函数，当弹出页面关闭的时候能够获得通知
					 * returnFn :  //fn   注册返回参数函数，此参数会作为父页面注册的关闭函数的入参
					 * skip : true/false // skip hide function  父页面的监听函数不会收到通知（true）
					 * opt : {}  //modal options
					 * }
             */
            close: function (page, modalOpts) {

                var defaultOpts = {
                    // hidden: function (e) {
                    // },
                    // returnFn: function () {
                    //     return {}
                    // },
                    skip: false,
                    opt: {}
                };
                var _modalOpts = defaultOpts;
                if (modalOpts) {
                    _modalOpts = $.extend({}, defaultOpts, modalOpts);
                }

                var $dom;
                if (_modalOpts.id) {
                    $dom = $('#' + _modalOpts.id); //this.parent.root.find('#' + _modalOpts.id);
                } else {
                    $dom = this.modalSource(page);
                }

                if(_modalOpts.hidden){
                    $dom.data('modalHiddenFn', _modalOpts.hidden);
                }

                if(_modalOpts.returnFn){
                    this.registerReturn(page, _modalOpts.returnFn);
                }

                $dom.data('modalSkip', _modalOpts.skip);


                $dom.find('.modal-header > button.close').trigger('click');

            },
            /**
             * 注册弹出页面的关闭通知函数
             */
            registerClose: function (page, fn) {
                this.modalSource(page).data('modalHiddenFn', fn);
            },
            /**
             * 注册返回参数函数
             */
            registerReturn: function (page, fn) {
                this.modalSource(page).data('modalReturnFn', fn);
            },
            /**
             * 注册当前弹出页面的父页面
             */
            registerParent: function (page) {
                var $modalSource = this.modalSource(page);
                this.parent = $modalSource.data('parentPage');
            },

            /**
             * find modal in the popup page
             * @param page the page object int the popup page
             * @returns {*}
             */
            modalSource: function (page) {
                return page.root.parents('div[name="editorModalSource"]');
            },

            params: function (page) {
                var params = this.modalSource(page).data('params');
                if (params) {
                    return params;
                } else {
                    return {};
                }
            },

            param: function (page, key) {
                var params = this.params(page);
                if (params) {
                    return params[key];
                } else {
                    return null;
                }
            }
        }
    }()
});

