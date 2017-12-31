/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#peekContentPopSection"),
        model: {
            vm: avalon.define({
                $id: "content_peek_pop_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        debugger;
        return page.modal.param(page, "contentId");
    }

    page.ajaxGet({
        url: '/contentmanager/getContentById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);

            page.root.find('#adImag').attr('src', data.adImgFile.uri);

            $(window.frames["contentViewIframe"].contentDocument).find('body').html(data.content);

        }
    });

    page.modal.registerParent(page);

});