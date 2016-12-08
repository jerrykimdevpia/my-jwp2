//$(".answer-write input[type='submit']").click(addAnswer);
$(".answer-write input[type='submit']").on("click",addAnswer);
function addAnswer(e){
//	console.log('click answer button!');
	e.preventDefault();
	
	//요청 url을 바꾼다.
	var url = $(".answer-write").attr("action");
	var queryString = $(".answer-write").serialize();
	
	$.ajax({
		type: 'post',
		url: url,
		data: queryString,
		dataType: 'json',
		error: function(){
			console.log("fail!");
		},
		success: function(data){
			console.log('data', data);
			var answerTemplate = $("#answerTemplate").html();
			var template = answerTemplate.format(
					data.writer.userId, data.formattedCreateDate, data.contents, data.question.id, data.id);
			$(".qna-comment-slipp-articles").prepend(template);
			$("textarea[name=contents]").val("");
		}
	});
}

$("#delete-answer button[type='submit']").click(deleteAnswer);
function deleteAnswer(e){
//	console.log('click delete answer button!');
	e.preventDefault();
	
	var url = $("#delete-answer").attr("action");
	var article = $(this).closest(".article");
	
	$.ajax({
		type: 'delete',
		url: url,
		dataType: 'json',
		error: function(){
			console.log("fail!");
		},
		success: function(data){
			console.log('data', data);
			article.remove();
		}
	});
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};