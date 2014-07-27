
updateTitle = function(){
    var title = "[" + (parseInt(window.localStorage.currentDijidao) + 1) + "/" + window.localStorage.currentZSDLength +"]" +
        window.localStorage.currentKM + " > " + window.localStorage.currentZSD;
    $("#nodeTitle").text(title);
};

checkCorrect = function(){
    var nid = window.localStorage.currentNid;
    var node = gct2014.nodes[nid];
    //////////////////////////////
}

xiayiti = function(){
    dijidao = parseInt(window.localStorage.currentDijidao);
    dijidao += 1;
    if (dijidao < window.localStorage.currentZSDLength)
    {
        window.localStorage.currentDijidao = dijidao;
        var nid = window.localStorage.currentNid = gct2014.flat[window.localStorage.currentZid].nodes[dijidao].nid;
        $.mobile.changePage(nid + ".html");
    }
    else
    {
        $.mobile.changePage("index.html");
    }
}
shangyiti = function(){
    dijidao = parseInt(window.localStorage.currentDijidao);
    dijidao -= 1;
    if (dijidao < window.localStorage.currentZSDLength)
    {
        window.localStorage.currentDijidao = dijidao;
        var nid = window.localStorage.currentNid = gct2014.flat[window.localStorage.currentZid].nodes[dijidao].nid;
        $.mobile.changePage(nid + ".html");
    }
    else
    {
        $.mobile.changePage("index.html");
    }
}

showAnswer = function ()
{
    console.log(this);
    var nid = window.localStorage.currentNid;
    var node = gct2014.nodes[nid];
    var correctAnswer = node.field__xuan_xiang.und[0].value;
    var selectedAnswer = $(this).attr("choice");
    console.log("selectedAnswer",selectedAnswer,"correctAnswer",correctAnswer);
    if (correctAnswer != selectedAnswer)
    {
        $(this).children(".answer_pic").attr("src","../img/incorrect.jpg");
    }
    //$(".answer_pic").attr("src","../img/incorrect.jpg");
    $("[choice='" + correctAnswer + "']").children(".answer_pic").attr("src","../img/correct.png");
    $(".correctAnswer").collapsible({ collapsed: false });
    //$(this).checkboxradio( "refresh" );
}

//$(".input_choice").on("change",function(){showAnswer.call($(this).parent())});
$(".selection").on("click", showAnswer);
$("body").on("swipeleft", xiayiti);
$("body").on("swiperight", shangyiti);
$(document).on("pagecontainershow",updateTitle);
var deleteFuck = function ()
{
    $("#welcome").remove();
};
$(document).on("pagecontainershow",deleteFuck);
