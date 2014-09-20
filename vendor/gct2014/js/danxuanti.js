
var AppRouter = Backbone.Router.extend({
    routes: {
        "zhishidian/:zid/start" : "startZhishidian",
        "zhishidian/:zid/node/:nid"   : "loadTimu"
    },

    startZhishidian: function (zid){
        alert("zsd:" + zid);
        var nid = getTimuByIndex(zid, 0).nid;
        saveToLocalStorage();
        this.navigate("zhishidian/" + zid + "/node/" + getTimuByIndex(zid, 0).nid, {trigger: true, replace: true});
    },

    loadTimu: function (zid, nid){
        alert("loadTimu" + zid +" " + nid);
        gct2014Model.state(getInfoByNid(nid));
        var timuObj = gct2014Model.nodes[nid];
        gct2014Model.timuObj(timuObj);
        console.log(timuObj);
    }
});

var app_router = new AppRouter;
Backbone.history.start();

var xuanxiang_select = function(xuanxiang){
    var timuObj = gct2014Model.timuObj();
    timuObj['field_choice_' + xuanxiang.toLowerCase()].selected = true;
    timuObj['field__xuan_xiang'].selected = true;
    var correctXuanxiang = timuObj['field__xuan_xiang'].und[0].value;
    timuObj['field_choice_a'].isCorrect = (correctXuanxiang == 'A');
    timuObj['field_choice_b'].isCorrect = (correctXuanxiang == 'B');
    timuObj['field_choice_c'].isCorrect = (correctXuanxiang == 'C');
    timuObj['field_choice_d'].isCorrect = (correctXuanxiang == 'D');
    if (!timuObj['field_choice_d'].isCorrect && timuObj['field__xuan_xiang'].selected)
        mark_cuoti(timuObj);
    gct2014Model.timuObj(timuObj);
};

var mark_cuoti = function (timuObj){
    timuObj.addAt = new Date().getTime();
    gct2014.cuoti[timuObj.nid] = timuObj;
    saveToLocalStorage();
};
/*
var accumulateDxDy = function (e, x, y){
    if (window.swiping){
        window.swipeX += x;
        window.swipeY += y;
    }
    else{
        window.swiping = true;
        window.swipeX = x;
        window.swipeY = y;
        setTimeout(function(){
            window.swiping = false;
            swipe(e, window.swipeX, window.swipeY);
        }, 200);
    }
};

var swipe = function(e, dX, dY){
    if (dX > 0 &&  gct2014Model.state().nextNodeId){
        app_router.navigate('zhishidian/' + gct2014Model.state().zsdId + '/node/' + gct2014Model.state().nextNodeId, {trigger: true, replace: true});
    }
    else
    if (dX < 0 && gct2014Model.state().lastNodeId){
        app_router.navigate('zhishidian/' + gct2014Model.state().zsdId + '/node/' + gct2014Model.state().lastNodeId, {trigger: true, replace: true});
    }
};

$(document).ready(function(){
    $(".container").on("swipe", accumulateDxDy);
});
    */