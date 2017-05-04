var iframeCount = 0;
function stopPageJump() {
	$(".nav a").click(function() {
		return false;
	})
	$(".tabs-li>a").click(function() {
		removeStyle();
		$(this).addClass("active");
		var iid = $(this).attr("iframe-id");
		out(iid);
		$("#" + iid).show();
		return false;
	});
}
function getIframeCount() {
	return iframeCount++;
}
function addTabAndShow(href, title) {
	removeStyle();
	var index = getIframeCount();
	var li = $("<li class=\"tabs-li\"></li>")
			.html(
					"<a href=\""
							+ href
							+ "\" class=\"active\" iframe-id=\"i"
							+ index
							+ "\">"
							+ title
							+ "<span class=\"close\"><i class=\"fa fa-close\"></i></span></a>");
	$(".tabs-ul").append(li);
	var ifra = $("<iframe id=\"i" + index + "\" src=\"" + href
			+ "\" scrolling=\"yes\" frameborder=\"0\"></iframe>");
	$(".tabs-content").append(ifra);
	stopPageJump();
	closeBind();
	return false;
}
function closeBind() {
	$(".close")
			.click(
					function() {
						out($(this).parent().hasClass("active"));
						if ($(this).parent().hasClass("active")) {
							removeStyle();
							if ($("#" + $(this).parent().attr("iframe-id"))
									.next().length > 0) {
								$("#" + $(this).parent().attr("iframe-id"))
										.next().show();
								var par = $(this).parent().parent().next();
								$(par).children().addClass("active");
								out1("11: " + $(par).html());
							} else {
								out1($("#" + $(this).parent().attr("iframe-id"))
										.prev().html());
								out1($("#" + $(this).parent().attr("iframe-id"))
										.html());
								$("#" + $(this).parent().attr("iframe-id"))
										.prev().show();
								$(this).parent().parent().prev().children()
										.addClass("active");
								out1($(this).parent().parent().prev()
										.children().html());
							}
						}
						$("#" + $(this).parent().attr("iframe-id")).remove();
						$(this).parent().parent().remove();
						// selectOne();
						return false;
					});
}
function removeStyle() {
	$(".tabs-li>a").removeClass("active");
	$("iframe").hide();
}
function selectOne() {
	$(".tabs-li>a").eq(0).addClass("active");
	$("iframe").eq(0).show();
}
function navigateBind() {
	$(".nav a").click(function() {
		out($(this).html() + " : " + $(this).attr("href"));
		if ($(this).attr("href") == "#" || $(this).attr("href") == "") {
			return false;
		}
		var a0 = $(this);
		var boo = 0;
		out($(".tabs-li>a").length);
		removeStyle();
		$(".tabs-li>a").each(function(index) {
			out($(a0).attr("href"));
			out($(this).attr("href"));
			if ($(a0).attr("href") == $(this).attr("href")) {
				out("active");
				$(this).addClass("active");
				$("iframe").eq(index).show();
				boo = 1;
			}
		})
		out(2);
		if (boo == 0) {
			addTabAndShow($(this).attr("href"), $(this).text());
		}
		return false;
	});
}
$(document).ready(function() {
	stopPageJump();
	closeBind();
	navigateBind();
	autoResize();
	$(window).resize(function() {// 当浏览器大小变化时
		autoResize();
	});
})
function out(content) {
	// console.log(content);
}
function out1(content) {
	console.log(content);
}
function autoResize() {
	out1("height:" + $(window).height() + " width:" + $(window).width());
	$(".tabs-content").height($(window).height() - 32);
	if ($("#nav-head").is(":hidden")) {
		$("#nav-body").width($(window).width() - 20);
	} else {
		$("#nav-body").width($(window).width() - $("#nav-head").width() - 20);
	}
	out1("end");
}
function hideNav() {
	if ($("#nav-head").is(':hidden')) {
		out1("show");
		$("#nav-head").show();
		$("#nav-body").attr("class", "col11");
	} else {
		out1("hide");
		$("#nav-head").hide();
		$("#nav-body").attr("class", "col12");
	}
	autoResize();
}
