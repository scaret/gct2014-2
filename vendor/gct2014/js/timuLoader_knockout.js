var gct2014Model ={
};
var updateGct2014Model = function (){
    gct2014Model.flat       = JSON.parse(JSON.stringify(gct2014.flat));
    gct2014Model.nested     = JSON.parse(JSON.stringify(gct2014.nested.slice(0,-1)));
    gct2014Model.nodes      = JSON.parse(JSON.stringify(gct2014.nodes));
    gct2014Model.timuObj    = ko.observable();
    gct2014Model.state      = ko.observable();
    gct2014Model.xiaoti     = ko.observableArray();
    gct2014Model.xiaotiCnt  = 0;
    gct2014Model.cuoti      = ko.observableArray();
    for(var i = 0; i < 20; i ++){

        gct2014Model.xiaoti.push(ko.observable());
    }
    for(var i in gct2014.cuoti){
        gct2014Model.cuoti.push(gct2014.cuoti[i]);
    }
};


updateGct2014Model();
$(document).ready(function ()
{
    ko.applyBindings(gct2014Model);
});
