
var AppRouter = Backbone.Router.extend({
    routes: {
        "zhishidian/:zid/start" : "startZhishidian",
        "resume" : "resume",
        "zhishidian/:zid/node/:nid"   : "loadTimu"
    },

    startZhishidian: function (zid){
        var nid = getTimuByIndex(zid, 0).nid;
        saveToLocalStorage();
        this.navigate("zhishidian/" + zid + "/node/" + getTimuByIndex(zid, 0).nid, {trigger: true, replace: true});
    },

    resume : function(){
        this.navigate("zhishidian/" + window.localStorage.getItem("zid") + "/node/" + window.localStorage.getItem("nid"), {trigger: true, replace: true});
    },

    loadTimu: function (zid, nid){
        window.localStorage.setItem("zid", zid);
        window.localStorage.setItem("nid", nid);
        gct2014Model.state(getInfoByNid(nid));
        var timuObj = gct2014Model.nodes[nid];
        gct2014Model.xiaotiCnt = 0;
        gct2014Model.timuObj(timuObj);
        if (timuObj.field_xiaoti){
            timuObj.field_xiaoti.und.map(function(obj, index){
                gct2014Model.xiaoti()[index](gct2014Model['nodes'][obj.nid]);
                gct2014Model.xiaotiCnt +=1;
                gct2014Model.xiaoti.valueHasMutated()
            });
        }
    }
});

var app_router = new AppRouter;
Backbone.history.start();

var xuanxiang_select = function(){
    var xuanxiang = $(this).attr("xuanxiang");
    var nid = $(this).parent(".timu").attr("nid");
    var index = $(this).parent(".timu").attr("xiaoti_index");
    var timuObj = gct2014Model.nodes[nid];
    var correctXuanxiang = timuObj['field__xuan_xiang'].und[0].value;

    timuObj['field_choice_' + xuanxiang.toLowerCase()].selected = true;
    timuObj['field__xuan_xiang'].selected = true;
    timuObj['field_choice_a'].isCorrect = (correctXuanxiang == 'A');
    timuObj['field_choice_b'].isCorrect = (correctXuanxiang == 'B');
    timuObj['field_choice_c'].isCorrect = (correctXuanxiang == 'C');
    timuObj['field_choice_d'].isCorrect = (correctXuanxiang == 'D');
    if (gct2014Model.timuObj().nid == timuObj.nid){
        gct2014Model.timuObj.valueHasMutated();
    }
    else if (index){
        gct2014Model.xiaoti()[index].valueHasMutated();
    }
    if (!timuObj['field_choice_d'].isCorrect && timuObj['field__xuan_xiang'].selected)
    {
        mark_cuoti(gct2014Model.timuObj());
    }
};

var mark_cuoti = function (timuObj){
    timuObj.addAt = new Date().getTime();
    timuObj.info = getInfoByNid(timuObj.nid);
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