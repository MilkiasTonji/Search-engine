
 $(document).ready(function(){
    $("#suggestion").click(function(){
        $(this).hide();
    });
    $(".glyphicon-heart-empty").toggle(function(){
        $(".glyphicon-heart").show();
    });
    
 });