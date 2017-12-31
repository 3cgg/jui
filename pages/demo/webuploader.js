/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {
    $('#uploader').initUploader({
        uploaderId: "uploader",
        addBtnId: "uploader_filePicker",
        addMoreBtnId: "uploader_filePicker2",
        dndAreaId: "uploader_dndArea",
        server: $_youapp.$_config.getFileUploaderEndpoint()
    });
});
