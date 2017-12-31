/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    page = $.extend({
        root: $("#searchDemoSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#searchDemoBtn").on("click", function () {

        $_youapp.$_data.submitForm({
            url: '/sample/search/searchDemo',
            formSelector: page.root.find('#searchDemoForm'),
            success: function (data) {
                alert(data);
            }
        });

    })

});
