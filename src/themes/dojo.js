JSONEditor.defaults.themes.dojo = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += ' dijit dijitInline dijitLeft dijitTextBox dijitValidationTextBox dijitReset dijitInputField dijitInputContainer';
    el.style.padding = '1px';
    el.style['margin-left'] = '10px';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += ' dijit dijitInline dijitLeft dijitTextBox dijitValidationTextBox dijitReset dijitInputField dijitInputContainer';
      el.style.padding = '1px';
      el.style['margin-left'] = '10px';
    }
    else {
      el.style.marginTop = '10px';
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');
    if(label && input.type === 'checkbox') {
      group.className += ' checkbox';
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.appendChild(label);
    } 
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if(description) group.appendChild(description);
    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.textContent = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    
    require(["dojo/query","dojo/dom-construct"], function(query, domConstruct){

      var div = domConstruct.create("div", {"class":"container"}, el, "after");
      div.innerHTML = '<span class="dijit dijitReset dijitInline dijitButton" role="presentation">'+
                        '<span class="dijitReset dijitInline dijitButtonNode" role="presentation" button_container="1">'+
                        '<span class="dijitReset dijitStretch dijitButtonContents" role="button" tabindex="0" title="logintitle" style="-webkit-user-select: none;">'+
                        '<span class="dijitReset dijitInline dijitIcon dijitNoIcon"></span>'+
                        '<span class="dijitReset dijitToggleButtonIconChar">[icon_here]</span>'+
                        '<span class="dijitReset dijitInline dijitButtonText">'+text+'</span>'+
                        '</span>'+
                        '</span></span>';

        // move the refNode inside our wrapping node
        //domContruct.place(el, div);
        var q = "[button_container=\"1\"]";
        dojo.query(q, div).forEach(function(node) {
            node.appendChild( el ); 
        });
    
    });




    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('a');
    el.className = 'list-group-item';
    el.setAttribute('href','#');
    el.appendChild(text);
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  }
});
