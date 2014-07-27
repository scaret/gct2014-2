function gotoZSD(kid, tid, dijidao)
{
    window.localStorage.status="zhishidian";
    window.localStorage.currentKid = kid;
    window.localStorage.currentKM = gct2014.flat[kid].name;
    window.localStorage.currentZid = tid;
    window.localStorage.currentZSD = gct2014.flat[tid].name;
    window.localStorage.currentZSDLength = gct2014.flat[tid].nodes.length;
    dijidao = dijidao || 0;
    window.localStorage.currentDijidao = dijidao;
    var nid = window.localStorage.currentNid = gct2014.flat[tid].nodes[dijidao].nid;
    $.mobile.changePage(nid + ".html");
};

if($(".zhishidian").length)
{
    $(".zhishidian").each(function(){
        $(this).children(".ui-li-count").html(window.localStorage["t_all_" + $(this).attr("tid")]);
    });
}
