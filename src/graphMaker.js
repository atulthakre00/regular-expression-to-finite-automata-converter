window.onload = function() {
    main();
    var g = new Graph();
                var n = f1.nStates;
        for(var i = 0;i<n;i++){
            for(var j = 0;j<f1.nInputs;j++){
                for(var k=0;k<f1.stateHolder[i].transitions[f1.inputs[j]].length;k++){
                    if(f1.stateHolder[i].transitions[f1.inputs[j]][k] != null && f1.stateHolder[i] != f1.stateHolder[i].transitions[f1.inputs[j]][k]){
                        var arg1 = f1.stateHolder[i].getStateNumber().toString(10);
                        var arg2 = f1.stateHolder[i].transitions[f1.inputs[j]][k].getStateNumber().toString(10);
                        g.addEdge("Q" +  arg1, "Q" + arg2 , { directed : true , label:arg1 + "->" + arg2});
                    
                    }
                }
            }
        }
                /* layout the graph using the Spring layout implementation */
                var layouter = new Graph.Layout.Spring(g);
                layouter.layout();
    
                /* draw the graph using the RaphaelJS draw implementation */
                var renderer = new Graph.Renderer.Raphael('canvas', g, 800, 500);
                renderer.draw();
    
                redraw = function() {
                    layouter.layout();
                    renderer.draw();
                };
   };
