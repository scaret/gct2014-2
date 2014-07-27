
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
var ts = 0;
xiayiti = function(){
    dijidao = parseInt(window.localStorage.currentDijidao);
    if ( new Date() > ts + 1000)
    {
        dijidao += 1;
        ts = new Date();
    }
    else
    {
        return;
    }
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
    if ( new Date() > ts + 1000)
    {
        dijidao -= 1;
        if (dijidao < 0){
            dijidao = 0;
            return;
        }
        ts = new Date();
    }
    else
    {
        return;
    }
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
if (!gct2014.swipebinded){
    $("body").on("swipeleft", xiayiti);
    $("body").on("swiperight", shangyiti);
    gct2014.swipebinded =true;
}
$(document).on("pagecontainershow",updateTitle);
