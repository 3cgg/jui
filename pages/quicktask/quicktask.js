/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function (){

    var page=$.extend({
        root:$("#quickTaskDashbordSection"),
        model:{
        }
    },$_youapp.pageTemplate);

    function getId(){
        return "92251a71-6aa3-4933-bd4a-bb49d531ef46";
    }

    page.root.find('[name="quickTaskItemBtn"]').on('click',function(){
        $(this).goView('/pages/quicktask/task-quickrecord.html',{"id":getId()});
    });

});