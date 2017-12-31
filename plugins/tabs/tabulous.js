/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale'
        };

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
    	active:function(id){
    		if(id){
    			this.$elem.children('ul.tabul').find('li > a#'+id).trigger('click');
    		}
    		else{
    			this.$elem.children('ul.tabul').find('li > a:first').trigger('click');
    		}
    	},	
    	
    	remove:function(id){
    		var $li=this.$elem.children('ul.tabul').find('li > a#'+id).parent();
    		var $container=this.$elem.children('div.tabcontainer').children('div#'+id);
    		$li.remove();
    		$container.remove();
    	},
    	
    	exists:function(id){
    		return this.$elem.children('ul.tabul').find('li > a#'+id).length>0;
    	},
    	getWindowHeight:function(slice){
    		var $ele=this.$elem;
    		if('cal'==$ele.data('height')){
    			var top=$ele.data('top');
    			if(!top){
    				top=0;
    			}
    			var windowHeight=$(window).height();
//    			var documentHeight=$(document).height();
    			var sliceHeight=slice.height();
//    			return (windowHeight>sliceHeight?windowHeight:sliceHeight)-top;
    			return '100%';
    		}
			var sliceHeight=slice.height();
			return sliceHeight+'px';
    	},	
        init: function() {

            var links = this.$elem.children('ul.tabul').find('li > a');
            var firstchildLink = this.$elem.children('ul.tabul').children('li:first-child').find('a');
            var lastchildLink = this.$elem.children('ul.tabul').children('li:last-child').after('<span class="tabulousclear"></span>');
            
            var notFirstSliceDiv=this.$elem.children('div.tabcontainer').children('div').not(':first').not(':nth-child(1)');
            
            if (this.options.effect == 'scale') {
             tab_content = notFirstSliceDiv.addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                 tab_content = notFirstSliceDiv.addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                 tab_content = notFirstSliceDiv.addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                 tab_content = notFirstSliceDiv.addClass('hideflip');
            }

            var containerDiv = this.$elem.children('.tabcontainer');
            var firstSlice = containerDiv.children('div:first');

            var allSlicedivs = containerDiv.children('div');
            var slicetop=this.$elem.data('slicetop');
            if(!slicetop){
            	slicetop=10;
            }
            allSlicedivs.css({
            	'position': 'relative'
            	,'top':slicetop+'px'
            	,'width': '100%'
            	,'height': '100%'	
            });

//            containerDiv.css('height',firstdivheight+'px');
            //containerDiv.css('height','100%');
            containerDiv.css('min-height','100px');
            
            firstchildLink.addClass('tabulous_active');

            links.bind('click', {myOptions: this.options,tabObj:this}, function(e) {
                e.preventDefault();
                var tabObj=e.data.tabObj;
                var $options = e.data.myOptions;
                var effect = $options.effect;

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');


                containerDiv.addClass('transition');

                links.removeClass('tabulous_active');
                mythis.addClass('tabulous_active');
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'scale') {
                    allSlicedivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscale');
                } else if (effect == 'slideLeft') {
                    allSlicedivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showleft');
                } else if (effect == 'scaleUp') {
                    allSlicedivs.removeClass('showscaleup').addClass('make_transist').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscaleup');
                } else if (effect == 'flip') {
                    allSlicedivs.removeClass('showflip').addClass('make_transist').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showflip');
                }

                var thisSlice=thisform.find('div'+thislink);
//                containerDiv.css('height',thisdivwidth+'px');
                //containerDiv.css('height',tabObj.getWindowHeight(thisSlice));
            });

           


         
            
        },

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
//        return this.each(function () {
//            new Plugin( this, options );
//        });
    	var $tab= new Plugin( this, options );
    	var tabId=$(this).attr('id');
    	$_youapp.$tabs.tabId=$tab;
    	return $tab;
    };

})( jQuery, window, document );


