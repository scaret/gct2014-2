var gct2014Model;
$(document).ready(function ()
{
    gct2014Model =
    {
        flat: gct2014.flat,
        nested: gct2014.nested.slice(0,-1),
        nodes: gct2014.nodes,
        timuIndex: gct2014.timuIndex
    }
    ko.applyBindings(gct2014Model);
});
