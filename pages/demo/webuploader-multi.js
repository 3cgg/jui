/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {
    /**/
    $('#uploader_multi_1').initUploader({
        uploaderId: "uploader_multi_1",
        addBtnId: "uploader_multi_1_filePicker",
        addMoreBtnId: "uploader_multi_1_filePicker2",
        dndAreaId: "uploader_multi_1_dndArea",
        server: $_youapp.$_config.getFileUploaderEndpoint()
    });

    $('#uploader_multi_2').initUploader({
        uploaderId: "uploader_multi_2",
        addBtnId: "uploader_multi_2_filePicker",
        addMoreBtnId: "uploader_multi_2_filePicker2",
        dndAreaId: "uploader_multi_2_dndArea",
        server: $_youapp.$_config.getFileUploaderEndpoint()
    });
})
