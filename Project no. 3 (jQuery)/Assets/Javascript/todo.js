$("ul").on("click", "li", function () {
	$(this).toggleClass("lineThrough");
})
$("ul").on("click","span", function (event) {
	$(this).parent().fadeOut(function () {
		$(this).remove();
	})
	event.stopPropagation();
})
$("input").keypress(function (event) {
	var inputText = $("input").val();
	if (event.which === 13) {
		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + inputText + "</li>");
		inputText = $("input").val("");
	}
})