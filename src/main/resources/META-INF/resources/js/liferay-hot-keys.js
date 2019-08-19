/* mousetrap v1.6.3 craig.is/killing/mice */
(function(q,u,c){function v(a,b,g){a.addEventListener?a.addEventListener(b,g,!1):a.attachEvent("on"+b,g)}function z(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return n[a.which]?n[a.which]:r[a.which]?r[a.which]:String.fromCharCode(a.which).toLowerCase()}function F(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function w(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function A(a,b){var g,d=[];var e=a;"+"===e?e=["+"]:(e=e.replace(/\+{2}/g,"+plus"),e=e.split("+"));for(g=0;g<e.length;++g){var m=e[g];B[m]&&(m=B[m]);b&&"keypress"!=b&&C[m]&&(m=C[m],d.push("shift"));w(m)&&d.push(m)}e=m;g=b;if(!g){if(!p){p={};for(var c in n)95<c&&112>c||n.hasOwnProperty(c)&&(p[n[c]]=c)}g=p[e]?"keydown":"keypress"}"keypress"==g&&d.length&&(g="keydown");return{key:m,modifiers:d,action:g}}function D(a,b){return null===a||a===u?!1:a===b?!0:D(a.parentNode,b)}function d(a){function b(a){a=
a||{};var b=!1,l;for(l in p)a[l]?b=!0:p[l]=0;b||(x=!1)}function g(a,b,t,f,g,d){var l,E=[],h=t.type;if(!k._callbacks[a])return[];"keyup"==h&&w(a)&&(b=[a]);for(l=0;l<k._callbacks[a].length;++l){var c=k._callbacks[a][l];if((f||!c.seq||p[c.seq]==c.level)&&h==c.action){var e;(e="keypress"==h&&!t.metaKey&&!t.ctrlKey)||(e=c.modifiers,e=b.sort().join(",")===e.sort().join(","));e&&(e=f&&c.seq==f&&c.level==d,(!f&&c.combo==g||e)&&k._callbacks[a].splice(l,1),E.push(c))}}return E}function c(a,b,c,f){k.stopCallback(b,
b.target||b.srcElement,c,f)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=z(a);b&&("keyup"==a.type&&y===b?y=!1:k.handleKey(b,F(a),a))}function m(a,g,t,f){function h(c){return function(){x=c;++p[a];clearTimeout(q);q=setTimeout(b,1E3)}}function l(g){c(t,g,a);"keyup"!==f&&(y=z(g));setTimeout(b,10)}for(var d=p[a]=0;d<g.length;++d){var e=d+1===g.length?l:h(f||
A(g[d+1]).action);n(g[d],e,f,a,d)}}function n(a,b,c,f,d){k._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var e=a.split(" ");1<e.length?m(a,e,b,c):(c=A(a,c),k._callbacks[c.key]=k._callbacks[c.key]||[],g(c.key,c.modifiers,{type:c.action},f,a,d),k._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:d,combo:a}))}var k=this;a=a||u;if(!(k instanceof d))return new d(a);k.target=a;k._callbacks={};k._directMap={};var p={},q,y=!1,r=!1,x=!1;k._handleKey=function(a,
d,e){var f=g(a,d,e),h;d={};var k=0,l=!1;for(h=0;h<f.length;++h)f[h].seq&&(k=Math.max(k,f[h].level));for(h=0;h<f.length;++h)f[h].seq?f[h].level==k&&(l=!0,d[f[h].seq]=1,c(f[h].callback,e,f[h].combo,f[h].seq)):l||c(f[h].callback,e,f[h].combo);f="keypress"==e.type&&r;e.type!=x||w(a)||f||b(d);r=l&&"keydown"==e.type};k._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)n(a[d],b,c)};v(a,"keypress",e);v(a,"keydown",e);v(a,"keyup",e)}if(q){var n={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},C={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},B={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p;for(c=1;20>c;++c)n[111+c]="f"+c;for(c=0;9>=c;++c)n[c+96]=c.toString();d.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};d.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};d.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};d.prototype.reset=function(){this._callbacks={};
this._directMap={};return this};d.prototype.stopCallback=function(a,b){if(-1<(" "+b.className+" ").indexOf(" mousetrap ")||D(b,this.target))return!1;if("composedPath"in a&&"function"===typeof a.composedPath){var c=a.composedPath()[0];c!==a.target&&(b=c)}return"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};d.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};d.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b]);p=null};
d.init=function(){var a=d(u),b;for(b in a)"_"!==b.charAt(0)&&(d[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};d.init();q.Mousetrap=d;"undefined"!==typeof module&&module.exports&&(module.exports=d);"function"===typeof define&&define.amd&&define(function(){return d})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);

class HotKeys {
	constructor() {
		this.CONST_CUSTOM_DEFINITIONS = '_LIFERAY_HOTKEY_CUSTOM_DEFINITIONS_';

		this.customDefinitions = [];

		this.definitions = [];

		this.mousetrap = Mousetrap;

		this.deleteCustomDefinition = this.deleteCustomDefinition.bind(this);
		this.initCustomDefinitions = this.initCustomDefinitions.bind(this);
		this.init = this.init.bind(this);
		this.register = this.register.bind(this);
		this.registerCustomDefinition = this.registerCustomDefinition.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.registerURL = this.registerURL.bind(this);
		this.setCustomDefinition = this.setCustomDefinition.bind(this);
		this.showAddHotKeyModal = this.showAddHotKeyModal.bind(this);
		this.showAvailableHotKeys = this.showAvailableHotKeys.bind(this);

		{/*this.setCustomDefinition(
			{
				action: '.user-control-group .control-menu-nav-item [data-title="Edit"] a',
				definition: 'Edit the current page.',
				keys: 'e p',
				type: 'click'
			}
		);*/}

		this.initCustomDefinitions();
	}

	deleteCustomDefinition(i) {
		var customDefinitions = [...this.customDefinitions];

		i = i - this.definitions.length;

		var length = customDefinitions.length;

		if (length === 1) {
			customDefinitions = [];
		}
		else if (i === length - 1) {
			customDefinitions = customDefinitions.slice(0, i);
		}
		else {
			customDefinitions = customDefinitions.slice(0, i).concat(customDefinitions.slice(i + 1, customDefinitions.length));
		}

		this.customDefinitions = customDefinitions

		Liferay.Store(this.CONST_CUSTOM_DEFINITIONS, customDefinitions);

		this.showAvailableHotKeys();

		modal.modal('hide');
	}

	initCustomDefinitions() {
		if (Liferay.Store) {
			Liferay.Store.get(
				this.CONST_CUSTOM_DEFINITIONS,
				definitions => {
					this.customDefinitions = definitions;

					console.log('definitions:', definitions);

					definitions.forEach(
						definition => {
							this.registerCustomDefinition(definition);
						}
					);

					console.log('definitions', definitions);
				}
			);
		}
	}

	init() {
		var toggle = $('#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_sidenavToggleId');

		console.log('toggle:', toggle);

		this.register(
			'`',
			() => {
				console.log('toggle:', toggle);

				toggle.trigger('click');

				toggle.focus();
			},
			'Toggle control panel.',
			toggle.length
		);

		var search = $('.portlet-search-bar .search-bar-keywords-input').first();

		this.register(
			'/',
			function(e) {
				e.preventDefault();

				search.focus();
			},
			'Focus header search.',
			search.length
		);

		this.register(
			'a k',
			this.showAddHotKeyModal,
			'Add a custom hot key.',
			!!Liferay.Store
		);

		this.register(
			'?',
			this.showAvailableHotKeys,
			'Show available hot keys.',
			true
		);
	}

	register(keys, action, definition, active, custom) {
		if (active) {
			this.mousetrap.bind(keys, action);
		}

		this.definitions.push(
			{
				active,
				custom,
				definition,
				keys
			}
		);
	}

	registerClick(keys, selector, definition, custom) {
		var node = $(selector);

		this.register(
			keys,
			() => {
				$(selector).trigger('click');

				console.log('click', node);
			},
			definition,
			node.length,
			custom
		);
	}

	registerCustomDefinition(definition) {
		var type = definition.type;

		if (type === 'url') {
			this.registerURL(definition.keys, definition.action, definition.definition, true);
		}
		else if (type === 'click') {
			this.registerClick(definition.keys, definition.action, definition.definition, true);
		}
	}

	registerURL(keys, url, definition, custom) {
		this.register(
			keys,
			() => {
				window.location.href = url;
			},
			definition,
			true,
			custom
		);
	}

	renderAction(label, placeholder) {
		return '<div class="form-group" id="action">' +
			'<label for="actionInput">' + label + '</label>' +
			'<input class="form-control" id="actionInput" placeholder="' + placeholder + '" type="text">' +
		'</div>';
	}

	renderDefinition(definition, i) {
		var keys = definition.keys.split(' ');

		var deleteLink = definition.custom ? ' <a class="delete-definition" data-index="' + i + '" href="javascript:;">Delete</a>' : '';

		return '<div class="definition mb-3">' +
			keys.map(
				key => (
					'<kbd>' + key + '</kbd>'
				)
			).join(' + ') + 
			' : ' + definition.definition +
			deleteLink +
		'</div>';
	}

	renderModal(title, body) {
		return '<div aria-labelledby="clayDefaultModalLabel" class="fade modal" id="hotKeyModal" role="dialog" style="display: none;" tabindex="-1">' +
			'<div class="modal-dialog modal-dialog-sm position-relative">' +
				'<div class="modal-content">' + 
					'<div class="modal-header">' +
						'<div class="modal-title" id="clayDefaultModalLabel">' +
							title +
						'</div>' +

						'<button aria-labelledby="Close" class="close" data-dismiss="modal" role="button" type="button">' +
							'<span class="icon-remove icon icon-large"></span>' +
						'</button>' +
					'</div>' +
					'<div class="modal-body">' +
						body +
					'</div>' +
					'<div class="modal-footer">' +
						'<div class="modal-item-last">' +
							'<div class="btn-group">' +
								'<div class="btn-group-item">' +
									'<button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>' +
								'</div>'
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	setCustomDefinition(definition) {
		this.registerCustomDefinition(definition);

		var customDefinitions = this.customDefinitions;

		customDefinitions.push(definition);

		this.customDefinitions = customDefinitions

		Liferay.Store(this.CONST_CUSTOM_DEFINITIONS, customDefinitions);
	}

	showAddHotKeyModal() {
		var modal = $(
			this.renderModal(
				'Add New Hot Key',
				'<form>' +
					'<div class="form-group">' +
						'<label for="keysInput">Shortcut Keys</label>' +
						'<input class="form-control" id="keysInput" placeholder="g h" type="text">' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="typeOfActionInput">Type of Action</label>' +
						'<select class="form-control" id="typeOfActionInput">' +
							'<option value="url">URL Navigation</option>' +
							'<option value="click">Simulate Click</option>' +
						'</select>' +
					'</div>' +
					this.renderAction('URL', '/group/intranet') +
					'<div class="form-group">' +
						'<label for="definitionInput">Definition</label>' +
						'<input class="form-control" id="definitionInput" placeholder="Navigate to /group/intranet." type="text">' +
					'</div>' +
					'<div class="form-group">' +
						'<div class="btn-group">' +
							'<div class="btn-group-item">' +
								'<button class="btn btn-primary" type="submit">Save</button>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</form>'
			)
		);

		this.showModal(modal);

		var select = modal.find('#typeOfActionInput')

		select.on(
			'change',
			e => {
				console.log(e);

				var actionContainer = modal.find('#action');

				if (e.currentTarget.value === 'url') {
					actionContainer.replaceWith($(this.renderAction('URL', '/group/intranet')));
				}
				else {
					actionContainer.replaceWith($(this.renderAction('Selector', '#myButton')));
				}
			}
		);

		var form = modal.find('form');

		form.on(
			'submit',
			e => {
				e.preventDefault();

				console.log(e);

				var target = e.target;

				var keys = target[0].value;

				var type = target[1].value;

				var action = target[2].value;

				var definition = target[3].value;

				this.setCustomDefinition(
					{
						action,
						definition,
						keys,
						type
					}
				);

				console.log('modal:', modal);

				modal.modal('hide');
			}
		);
	}

	showAvailableHotKeys() {
		var modal = $(
			this.renderModal(
				'Liferay Hot Keys',
				this.definitions.map(
					(definition, i) => (
						this.renderDefinition(definition, i)
					)
				).join('')
			)
		);

		this.showModal(modal);

		modal.on(
			'click',
			'.delete-definition',
			e => {
				console.log('delete', $(e.target).attr('data-index'));

				this.deleteCustomDefinition($(e.target).attr('data-index'), modal);
			}
		);
	}

	showModal(modal) {
		var oldModal = $('#hotKeyModal');

		if (oldModal.length) {
			oldModal.replaceWith(modal);
		}
		else {
			var body = $('body');

			body.append(modal);
		}

		console.log('modal:', modal);

		modal.modal();
	}
}

 $(document).ready(
 	function() {
 		var hotKeys = new HotKeys();

 		hotKeys.init();
 	}
 );