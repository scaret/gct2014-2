// 在GCT2014下载入载入所有的题目、科目、知识点，以及当前状态等信息
//..............................................................................
function saveToLocalStorage()
{
    if (gct2014)
    {
        gct2014_str = JSON.stringify(gct2014);
        window.localStorage.setItem("gct2014", gct2014_str);
    }
}
//..............................................................................
function fixUrl(str){
    var strout = str.replace("/sites/default/files/", "img/");
    strout = strout.replace('<img ', '<img class="img-responsive"  class="img-rounded"');
    return strout;
}
//..............................................................................
function loadFromLocalStorage()
{
    gct2014_str = window.localStorage.getItem("gct2014");
    if (gct2014_str)
    {
        gct2014 = JSON.parse(gct2014_str);
        return gct2014;
    }
    else
    {
        return null;
    }
}
//..............................................................................
function getTimuByIndex(zid, tindex){
    var timuObj = null;
    if (gct2014Model){
        for(var kemuIndex in gct2014Model.nested){
            for (var zsdIndex in gct2014Model.nested[kemuIndex].children){
                if (gct2014Model.nested[kemuIndex].children[zsdIndex].tid == zid){
                    if (gct2014Model.nested[kemuIndex].children[zsdIndex].nodes){
                        timuObj = gct2014Model.nested[kemuIndex].children[zsdIndex].nodes[tindex];
                    }
                }
            }
        }
    }
    return timuObj;
}
//..............................................................................
function getInfoByNid(nid){
    var info = null;
    if (gct2014){
        for(var kemuIndex in gct2014.nested){
            for (var zsdIndex in gct2014.nested[kemuIndex].children){
                var lastNodeId = null;
                for (var nodeIndex in gct2014.nested[kemuIndex].children[zsdIndex].nodes){
                    if (gct2014.nested[kemuIndex].children[zsdIndex].nodes[nodeIndex].nid == nid ){
                        info = {
                            kemuIndex : parseInt(kemuIndex),
                            kemuId    : parseInt(gct2014.nested[kemuIndex].tid),
                            zsdIndex  : parseInt(zsdIndex),
                            zsdId     : parseInt(gct2014.nested[kemuIndex].children[zsdIndex].tid),
                            nodeIndex : parseInt(nodeIndex),
                            nodeCount : parseInt(gct2014.nested[kemuIndex].children[zsdIndex].nodes.length),
                            nodeId    : parseInt(nid),
                            lastNodeId: parseInt(lastNodeId)
                        };
                    }
                    else if (info){
                        if (info.nodeCount -1 > info.nodeIndex) info.nextNodeId = gct2014.nested[kemuIndex].children[zsdIndex].nodes[nodeIndex].nid;
                        return info;
                    }
                    else
                    {
                        lastNodeId = gct2014.nested[kemuIndex].children[zsdIndex].nodes[nodeIndex].nid
                    }
                }
                if (info) break;
            }
        }
    }
    return info;
}
//..............................................................................
function loadFromFile()
{
    window.gct2014 = {flat:{},nested:[],nodes:{}, cuoti: {}};
    $.ajaxSetup({async:false});
    $.getJSON("record/taxonomy_vocabulary/getTree/2.json", function(taxonomy_vocabulary){

        window.taxonomy_vocabulary = taxonomy_vocabulary;
        //console.log("载入科目、知识点成功！数量：", taxonomy_vocabulary.length);
        //......................................................................
        for (var h in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[h];
            window.gct2014.flat[t.tid] = t;
            t.nodes = [];
            t.parent = null;
            t.children = [];
            //console.log("载入科目/知识点：", t.name, t);
            //..................................................................
        }
        //console.log("........................................................");
        //......................................................................
        for (var i in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[i];
            if(t.depth == 0)
            {
                window.gct2014.nested.push(t);
                //console.log("    载入科目：", t.name, t);
            }
        }
        //console.log("........................................................");
        //......................................................................
        for (var i in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[i];
            if(t.depth == 1)
            {
                var pid = parseInt(t.parents[0]);
                _.each(window.gct2014.nested, function(nested){
                    if (nested.tid == pid)
                    {
                        nested.children.push(t);
                    }
                });
                t.parent = pid;
                //console.log(
                //    "        载入知识点： ", window.gct2014.flat[pid].name + "/" + t.name,
                //t);
            }
        }
        //......................................................................
        $.getJSON("record/node.json", function(nodes){
            window.gct2014.timuIndex = nodes;
            var afterLoad = _.after(nodes.length, function(){
                for(var i in gct2014.flat)
                {
                    var t = gct2014.flat[i];
                    window.localStorage.setItem("t_all_" + t.tid, t.nodes.length);
                }
                $.ajaxSetup({async:false});
                gct2014_str = JSON.stringify(gct2014);
                window.localStorage.setItem("gct2014", gct2014_str);
                //alert("成功载入题库");
            });
            for(var i in nodes)
            {
                $.getJSON("record/node/"+nodes[i].nid + ".json", function(node)
                {
                    //try{
                    var km = node.field_suoshuzhishidian && node.field_suoshuzhishidian.und && node.field_suoshuzhishidian.und[0] && node.field_suoshuzhishidian.und[0].tid;
                    var zsd = node.field_suoshuzhishidian && node.field_suoshuzhishidian.und && node.field_suoshuzhishidian.und[1] && node.field_suoshuzhishidian.und[1].tid;
                    //console.log(
                    //"            载入题目：" + window.gct2014.flat[km].name + "/" + window.gct2014.flat[zsd].name + "/" + node.nid,
                    //node
                    //);
                    if (km && gct2014.flat[km]) gct2014.flat[km].nodes.unshift(node);
                    if (zsd&& gct2014.flat[zsd]) gct2014.flat[zsd].nodes.unshift(node);
                    gct2014.nodes[node.nid] = node;
                    //}catch(e){}
                }).always(function(){
                        afterLoad();
                    });
            }
        });
    });
    return gct2014;
}
//..............................................................................

////////////////////////////////////////////////////////////////////////////////

if (!(window.gct2014 = loadFromLocalStorage()))
{
    window.gct2014 = loadFromFile();
    saveToLocalStorage();
}
////////////////////////////////////////////////////////////////////////////////