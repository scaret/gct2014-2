// 在GCT2014下载入载入所有的题目、科目、知识点，以及当前状态等信息
if(!window.gct2014)
{
    $.getJSON("../record/taxonomy_vocabulary/getTree/2.json", function(taxonomy_vocabulary){
        window.gct2014 = {flat:{},nested:{},nodes:{}};
        window.taxonomy_vocabulary = taxonomy_vocabulary;
        //console.log("载入科目、知识点成功！数量：", taxonomy_vocabulary.length);
        //......................................................................
        for (var h in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[h];
            window.gct2014.flat[t.tid] = t;
            t.nodes = [];
            t.parent = null;
            t.children = {};
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
                window.gct2014.nested[t.tid] = t;
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
                window.gct2014.nested[pid].children[t.tid] = t;
                t.parent = pid;
                //console.log(
                //    "        载入知识点： ", window.gct2014.flat[pid].name + "/" + t.name,
                //t);
            }
        }
        //......................................................................
        $.getJSON("../record/node.json", function(nodes){
            window.gct2014.timuIndex = nodes;
            var afterLoad = _.after(nodes.length, function(){
                for(var i in gct2014.flat)
                {
                    var t = gct2014.flat[i];
                    window.localStorage.setItem("t_all_" + t.tid, t.nodes.length);
                }
                //alert("success");
                $.mobile.loading( 'show', {
                      text: "成功载入题库",
                      textVisible: true,
                      textonly: true
                  });
                setTimeout(function(){
                    $.mobile.loading( 'hide');
                },1000);
            });
            for(var i in nodes)
            {
                $.getJSON("../record/node/"+nodes[i].nid + ".json", function(node)
                {
                    //try{
                        var km = node.field_suoshuzhishidian && node.field_suoshuzhishidian.und && node.field_suoshuzhishidian.und[0] && node.field_suoshuzhishidian.und[0].tid;
                        var zsd = node.field_suoshuzhishidian && node.field_suoshuzhishidian.und && node.field_suoshuzhishidian.und[1] && node.field_suoshuzhishidian.und[1].tid;
                        //console.log(
                            //"            载入题目：" + window.gct2014.flat[km].name + "/" + window.gct2014.flat[zsd].name + "/" + node.nid,
                            //node
                        //);
                        if (km && gct2014.flat[km]) gct2014.flat[km].nodes.push(node);
                        if (zsd&& gct2014.flat[zsd]) gct2014.flat[zsd].nodes.push(node);
                        gct2014.nodes[node.nid] = node;
                    //}catch(e){}
                }).always(function(){
                        afterLoad();
                    });
            }
        });
    });
}
