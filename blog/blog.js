$(function () {
    $("pre").addClass("container");
    var h = "<a id='nav-btn' class='btn btn-default' onclick=\"$('#nav-item').toggleClass('hide');\">\n\r";
    h += "    <span class='glyphicon glyphicon-menu-hamburger'></span>\n\n";
    h += "</a>\n\n";
    h += "<div id='nav-item' class='list-group hide'>\n\n";
    for (var i = 0; i < nav.length; i++) {
        h += "    <a href='" + nav[i].split("::")[1] + "' class='list-group-item'>" + nav[i].split("::")[0] + "</a>\n\r";
    }
    h += "</div>\n\n";
    $("body").prepend(h);
    var n = window.location.pathname;
    n = n.substring(n.lastIndexOf("/")+1);
    $("#nav-item>a").each(function () {
        if (n.indexOf($(this).attr("href") != -1)) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
})