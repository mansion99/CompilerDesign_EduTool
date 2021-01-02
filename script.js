var numSocket = new Rete.Socket('Number value');
var counter = 0;
var answer;

function getans(a, b) {
  //console.log(counter);
  if ((counter == a) && (b==answer))
    alert(" CORRECT ANSWER ");
  else
    alert("INCORRECT ANSWER");
}

var VueNumControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class NumControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

class RootComponent extends Rete.Component {
  constructor(){
      super("Root");
      
  }

  builder(node) {
      var inp1 = new Rete.Input('num',"Number", numSocket);
      //var out = new Rete.Output('num', "Number", numSocket);
      return node
          .addInput(inp1)
          //.addControl(new NumControl(this.editor, 'preview', true))
          //.addOutput(out);
  }

  worker(node, inputs, outputs) {
      var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
      //this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(n1);
      //outputs['num'] = n1;
      answer = n1;
      //console.log(answer);
      
  }
}

class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

class AddComponent extends Rete.Component {
    constructor(){
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input('num',"a", numSocket);
        var inp2 = new Rete.Input('num2', "b", numSocket);
        var out = new Rete.Output('num', "Number", numSocket);
        //inp1.addControl(new NumControl(this.editor, 'num'))
        //inp2.addControl(new NumControl(this.editor, 'num2'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            //.addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        
        //this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

class DivideComponent extends Rete.Component {
  constructor(){
      super("Divide");
  }

  builder(node) {
      var inp1 = new Rete.Input('num',"a", numSocket);
      var inp2 = new Rete.Input('num2', "b", numSocket);
      var out = new Rete.Output('num', "Number", numSocket);
      //inp1.addControl(new NumControl(this.editor, 'num'))
      //inp2.addControl(new NumControl(this.editor, 'num2'))

      return node
          .addInput(inp1)
          .addInput(inp2)
          //.addControl(new NumControl(this.editor, 'preview', true))
          .addOutput(out);
  }

  worker(node, inputs, outputs) {
      var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
      var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
      var sum = n1 / n2;
      
      //this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
      outputs['num'] = sum;
  }
}

class SubtractComponent extends Rete.Component {
  constructor(){
      super("Subtract");
  }

  builder(node) {
      var inp1 = new Rete.Input('num',"a", numSocket);
      var inp2 = new Rete.Input('num2', "b", numSocket);
      var out = new Rete.Output('num', "Number", numSocket);
      //inp1.addControl(new NumControl(this.editor, 'num'))
      //inp2.addControl(new NumControl(this.editor, 'num2'))

      return node
          .addInput(inp1)
          .addInput(inp2)
          //.addControl(new NumControl(this.editor, 'preview', true))
          .addOutput(out);
  }

  worker(node, inputs, outputs) {
      var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
      var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
      var diff = n1 - n2;
      
      //this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
      outputs['num'] = diff;
  }
}

class ProductComponent extends Rete.Component {
  constructor(){
      super("Multiply");
  }

  builder(node) {
      var inp1 = new Rete.Input('num',"a", numSocket);
      var inp2 = new Rete.Input('num2', "b", numSocket);
      var out = new Rete.Output('num', "Number", numSocket);
      //inp1.addControl(new NumControl(this.editor, 'num'))
      //inp2.addControl(new NumControl(this.editor, 'num2'))

      return node
          .addInput(inp1)
          .addInput(inp2)
          //.addControl(new NumControl(this.editor, 'preview', true))
          .addOutput(out);
  }

  worker(node, inputs, outputs) {
      var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
      var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
      var prod = n1 * n2;
      
      //this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
      outputs['num'] = prod;
  }
}

(async () => {
    var container = document.querySelector('#rete');
    var components = [new NumComponent, new AddComponent, new SubtractComponent, new ProductComponent, new RootComponent, new DivideComponent ];
    
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin.default);
    editor.use(VueRenderPlugin.default);    
    editor.use(ContextMenuPlugin.default);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin.default);
    editor.use(HistoryPlugin);
    editor.use(ConnectionMasteryPlugin.default);

    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    // var n1 = await components[0].createNode({num: 2});
    // var n2 = await components[0].createNode({num: 0});
    // var add = await components[1].createNode();
    var root = await components[4].createNode();

    // n1.position = [80, 100];
    // n2.position = [80, 250];
    // add.position = [500, 150];
    //root.position = [1200, 100];

    editor.addNode(root);


    editor.on('process connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.on('nodecreated', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        counter++;
    });

    editor.on('noderemoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        counter--;
    });

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
})();
