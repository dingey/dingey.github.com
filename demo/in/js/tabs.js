function println(s) {
    console.log(s);
}
var count=$("#tabs_head>li").length;
println(count);
function getCount() {
    count++;
    return count;
}
function stopJump() {
    $("#side-menu>li>a,#side-menu>li>ul>li>a").each(function () {
        var url=$(this).attr("href");
        if(url!="#"&&url!=""){
            $(this).attr("href","#");
            $(this).attr("url",url);
        }else{
            $(this).attr("url","#");
        }
    })
}
function bindClick() {
    $("#side-menu>li>a,#side-menu>li>ul>li>a").click(function (e) {
        //println($(this).attr("url"));
        e.preventDefault();
        if($(this).attr("href")!=""&&$(this).attr("href")!="#"&&!checkExists($(this).attr("href"))){
            var b=false;
            var obj=this;
            $("#tabs_head>li").removeClass("active");
            $("#tabs_body>div").removeClass("active");
            var i = getCount();
            var li = "<li class=\"active\" id=\"li_tab_" + i + "\"><a href=\"#tab_" + i + "\" data-toggle=\"tab\">" + $(this).text() + "<i class=\"fa fa-fw fa-close\" onclick=\"closeTab('" + i + "')\"></i></a></li>";
            var con = "<div class=\"tab-pane active\" id=\"tab_" + i + "\"><iframe src=\"" + $(this).attr("href") + "\"></iframe></div>";
            $("#tabs_head").append(li);
            $("#tabs_body").append(con);
        }
    });
}
function checkExists(url) {
    var exists=false;
    $("#tabs_head>li").each(function () {
        var tb=$(this).attr("id")+"";
        tb=tb.substring(3);
        var url2=$("#"+tb).children().attr("src");
        if(url2!=undefined&&url2==url){
            $("#tabs_head>li").removeClass("active");
            $("#tabs_body>div").removeClass("active");
            $(this).addClass("active");
            $("#"+tb).addClass("active");
            exists=true;
        }
    });
    return exists;
}
function closeTab(id) {
    if($("#li_tab_"+id).hasClass("active")){
        var obj=$("#li_tab_"+id).next();
        if(obj.length==0){
            obj=$("#li_tab_"+id).prev();
            if(obj.length>0&&!$(obj).hasClass("pull-right")){
                $(obj).find("a").click();
            }
        }else{
            $(obj).find("a").click();
        }
    }
    $("#li_tab_"+id).remove();
    $("#tab_"+id).remove();
}
function closeTabs() {
    $("#tabs_body").empty();
    $("#tabs_head>li").each(function () {
        if(!$(this).hasClass("pull-right")){
            $(this).remove();
        }
    })
}
$(function () {
    //stopJump();
    bindClick();
})