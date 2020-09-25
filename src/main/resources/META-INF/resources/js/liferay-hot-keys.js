AUI().ready(
	'liferay-store',
	function() {
		var ACTION_LABEL_MAP = {
			click: 'Selector',
			focus: 'Selector',
			url: 'Url'
		};

		var ACTION_OBJECT_KEY_MAP = {
			click: 'selector',
			focus: 'selector',
			url: 'url'
		};

		var ACTION_PLACEHOLDER_MAP = {
			click: '#myButton',
			focus: '#myButton',
			url: '/group/intranet'
		};

		var ACTION_TYPE_MAP = {
			click: 'click',
			focus: 'focus',
			url: 'url'
		};

		var BADGE_TYPE_CLASS_MAP = {
			error: 'badge-danger',
			success: 'badge-success'
		};

		var MODAL_SIZE_CLASS_MAP = {
			large: 'modal-lg',
			medium: 'modal-md',
			small: 'modal-sm'
		};

		class HotKeys {
			constructor() {
				this.CONST_CUSTOM_DEFINITIONS = '_LIFERAY_HOTKEY_CUSTOM_DEFINITIONS_';

				this.customDefinitions = [];

				this.definitions = [];

				this.eventObjects = [];

				this.mousetrap = Mousetrap;

				this.deleteCustomDefinition = this.deleteCustomDefinition.bind(this);
				this.handleAddNewHotKeySubmit = this.handleAddNewHotKeySubmit.bind(this);
				this.initCustomDefinitions = this.initCustomDefinitions.bind(this);
				this.init = this.init.bind(this);
				this.register = this.register.bind(this);
				this.registerCustomDefinition = this.registerCustomDefinition.bind(this);
				this.registerClick = this.registerClick.bind(this);
				this.registerURL = this.registerURL.bind(this);
				this.removeEvents = this.removeEvents.bind(this);
				this.renderAddHotKeyModal = this.renderAddHotKeyModal.bind(this);
				this.renderHotKeysModalBody = this.renderHotKeysModalBody.bind(this);
				this.showAddHotKeyModal = this.showAddHotKeyModal.bind(this);
				this.showAvailableHotKeys = this.showAvailableHotKeys.bind(this);

				this.initCustomDefinitions();

				this.init();
			}

			addEvent(node, event, selector, handler) {
				this.eventObjects.push({
					event,
					handler,
					node,
					selector
				});

				node.on(
					event,
					selector,
					handler
				);
			}

			deleteCustomDefinition(i) {
				this.mousetrap.unbind(this.customDefinitions[i].keys);

				var newCustomDefinitions = this.customDefinitions.filter(
					(value, index, arr) => {
						return parseInt(index) !== parseInt(i);
					}
				);

				this.customDefinitions = newCustomDefinitions;

				Liferay.Store(this.CONST_CUSTOM_DEFINITIONS, JSON.stringify(newCustomDefinitions));
			}

			handleAddNewHotKeySubmit(e) {
				var target = e.target;

				var action = target[3].value;
				var index = target[0].value;
				var type = target[2].value;

				if (index >= 0) {
					this.deleteCustomDefinition(index);
				}

				var definition = {
					custom: true,
					definition: target[4].value,
					keys: target[1].value.trim(),
					type
				};

				var actionTypeMap = ACTION_TYPE_MAP;

				if (type === actionTypeMap.url) {
					definition.url = action;
				} else if (type === actionTypeMap.click || type === actionTypeMap.focus) {
					definition.selector = action;
				}
				console.log('definition', definition);
				this.registerCustomDefinition(definition);
				console.log('this.customDefinitions', this.customDefinitions);

				Liferay.Store(this.CONST_CUSTOM_DEFINITIONS, JSON.stringify([...this.customDefinitions]));
			}

			initCustomDefinitions() {
				if (themeDisplay.isSignedIn()) {
					Liferay.Store.get(
						this.CONST_CUSTOM_DEFINITIONS,
						definitions => {
							try {
								definitions = JSON.parse(definitions);
							}
							catch(e) {
								console.log('Definitions unable to be parsed', definitions);

								definitions = [];
							}

							definitions = Array.isArray(definitions) ? definitions : [];

							console.log('initCustomDefinitions', definitions);

							definitions.forEach(
								definition => {
									this.registerCustomDefinition(definition);
								}
							);
						}
					);
				}
			}

			init() {
				this.registerClick({
					definition: 'Toggle control panel.',
					keys: '`',
					selector: '#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_sidenavToggleId'
				});

				var search = $('.portlet-search-bar .search-bar-keywords-input').first();

				this.register({
					action: function(e) {
						e.preventDefault();

						search.focus();
					},
					active: search.length,
					definition: 'Focus header search.',
					keys: '/'
				});

				this.register({
					action: () => {
						var url = window.location.pathname.split('/').splice(0, 3);

						var switchUrlObj = {
							group: 'web',
							web: 'group'
						};

						fetch(url.join('/')).then(
							function(response) {
								if (response.status == 404) {
									url[1] = switchUrlObj[url[1]];
								}

								window.location.href = url.join('/');
							}
						);
					},
					active: true,
					definition: 'Go to current site home',
					keys: 'g s'
				});

				this.registerURL({
					active: !themeDisplay.isSignedIn(),
					custom: false,
					definition: 'Login',
					keys: 'l i',
					url: '/c/portal/login'
				});

				this.registerURL({
					active: themeDisplay.isSignedIn(),
					custom: false,
					definition: 'Logout',
					keys: 'l o',
					url: '/c/portal/logout'
				});

				this.registerURL({
					custom: false,
					definition: 'Navigate to home.',
					keys: 'g h',
					url: '/'
				});

				this.registerClick({
					definition: 'Show the site menu.',
					keys: 's s',
					selector: '#_com_liferay_product_navigation_product_menu_web_portlet_ProductMenuPortlet_manageSitesLink'
				});

				this.registerClick({
					definition: 'Toggle the user menu.',
					keys: 'u m',
					selector: '.personal-menu-dropdown .btn'
				});

				this.registerClick({
					definition: 'Edit the current page.',
					keys: 'e p',
					selector: '.user-control-group .control-menu-nav-item:first a'
				});

				this.registerClick({
					definition: 'Configure the current page.',
					keys: 'c p',
					selector: '.user-control-group .control-menu-nav-item:nth-child(2) a'
				});

				this.register({
					action: this.showAvailableHotKeys,
					active: true,
					definition: 'Show available hot keys.',
					keys: '?'
				});

				this.register({
					action: this.showAddHotKeyModal,
					active: themeDisplay.isSignedIn(),
					definition: 'Add a custom hot key. (Must be logged in.)',
					keys: 'a k'
				});
			}

			register(definition) {
				if (definition.active) {
					this.mousetrap.bind(definition.keys, definition.action);
				}

				if (definition.custom) {
					this.customDefinitions.push(definition);
				} else {
					this.definitions.push(definition);
				}
			}

			registerClick(definition) {
				var node = $(definition.selector);

				definition.action = () => {
					$(definition.selector)[0].click();
				};

				definition.active = node.length;

				this.register(definition);
			}

			registerCustomDefinition(definition) {
				var actionTypeMap = ACTION_TYPE_MAP;

				var type = definition.type;

				definition.custom = true;

				if (type === actionTypeMap.url) {
					this.registerURL(definition);
				} else if (type === actionTypeMap.click) {
					this.registerClick(definition);
				} else if (type === actionTypeMap.focus) {
					this.registerFocus(definition);
				}
			}

			registerFocus(definition) {
				var node = $(definition.selector);

				definition.action = () => {
					$(definition.selector)[0].focus();
				};

				definition.active = node.length;

				this.register(definition);
			}

			registerURL(definition) {
				definition.action = () => {
					window.location.href = definition.url;
				};

				definition.active = true;

				this.register(definition);
			}

			removeEvents() {
				this.eventObjects.forEach(
					eventObject => {
						eventObject.node.off(
							eventObject.event,
							eventObject.selector,
							eventObject.handler
						);
					}
				);

				this.eventObjects = [];
			}

			renderAction(type, value = '') {
				return `<div class="form-group" id="action">
					<label for="actionInput">${ACTION_LABEL_MAP[type]}</label>
					<input class="form-control" id="actionInput" placeholder="${ACTION_PLACEHOLDER_MAP[type]}" type="text" value="${value}">
				</div>`;
			}

			renderActionLinks(i) {
				return `<td class="text-right">
					<a class="btn btn-sm edit-definition lfr-portal-tooltip py-1" data-index="${i}" data-title="Edit" href="javascript:;">
						<span class="icon-edit icon">Edit</span>
					</a>
					<a class="btn btn-sm delete-definition lfr-portal-tooltip py-1" data-index="${i}" data-title="Delete" href="javascript:;">
						<span class="icon-remove icon">Delete</span>
					</a>
				</td>`;
			}

			renderAddHotKeyModal(i = -1) {
				var action = '';
				var definition = '';
				var keys = '';
				var type = 'url';

				if (i >= 0) {
					var defObj = this.customDefinitions[i];

					definition = defObj.definition;
					keys = defObj.keys;
					type = defObj.type;

					action = defObj[ACTION_OBJECT_KEY_MAP[type]];
				}

				return this.renderModal(
					'Add New Hot Key',
					`<form>
						<input name="index" type="hidden" value="${i}">
						<div class="form-group">
							<label for="keysInput">Shortcut Keys</label>
							<input autofocus class="form-control" id="keysInput" placeholder="g h" type="text" value="${keys}">
						</div>
						<div class="form-group">
							<label for="typeOfActionInput">Type of Action</label>
							<select class="form-control" id="typeOfActionInput">
								<option ${type === 'url' ? 'selected' : ''} value="url">URL Navigation</option>
								<option ${type === 'click' ? 'selected' : ''} value="click">Simulate Click</option>
								<option ${type === 'focus' ? 'selected' : ''} value="focus">Focus Element</option>
							</select>
						</div>
						${this.renderAction(type, action)}
						<div class="form-group">
							<label for="definitionInput">Definition</label>
							<input class="form-control" id="definitionInput" placeholder="Navigate to /group/intranet." type="text" value="${definition}">
						</div>
						<div class="form-group">
							<div class="btn-group">
								<div class="btn-group-item">
									<button class="btn btn-primary" type="submit">Save</button>
								</div>
							</div>
						</div>
					</form>`,
					'medium'
				);
			}

			renderBadge(content, type = 'success') {
				return `<span class="badge ${BADGE_TYPE_CLASS_MAP[type]}">
					<span class="badge-item badge-item-expand">${content}</span>
				</span>`;
			}

			renderCustomHotKeys(customDefinitions) {
				return `<div class="col-sm">
					<h4>Custom:</h4>
					${this.renderDefinitions(customDefinitions)}
					<a class="btn btn-secondary add-new-hot-key" href="javascript:;">Add New Hot Key</a>
				</div>`;
			}

			renderDefinition(definition, i) {
				return `<tr>
					<td class="definition-container">
						${definition.keys.split(' ').map(
							key => (
								`<kbd>${key}</kbd>`
							)
						).join(' + ')} : ${definition.definition}
					</td>
					<td class="text-right">
						${definition.active ? this.renderBadge('Active', 'success') : this.renderBadge('Inactive', 'error')}
					</td>
					${definition.custom ? this.renderActionLinks(i) : ''}
				</tr>`;
			}

			renderDefinitions(definitions) {
				return `<div class="table-responsive">
					<table class="table table-autofit table-list table-nowrap">
						<tbody>
							${definitions.map(
								(definition, i) => (
									this.renderDefinition(definition, i)
								)
							).join('')}
						</tbody>
					</table>
				</div>`;
			}

			renderHotKeysModalBody() {
				return `<div class="container-fluid">
					<div class="row">
						<div class="col-sm">
							<h4>Default:</h4>
							${this.renderDefinitions(this.definitions)}
						</div>
						${themeDisplay.isSignedIn() ? this.renderCustomHotKeys(this.customDefinitions) : ''}
					</div>
				</div>`;
			}

			renderModal(title, body, sizeClass) {
				return `<div aria-labelledby="clayDefaultModalLabel" class="fade  liferay-hot-keys-root modal" id="hotKeyModal" role="dialog" style="display: none;" tabindex="-1">
					<div class="modal-dialog ${sizeClass ? MODAL_SIZE_CLASS_MAP[sizeClass] : ''} position-relative">
						<div class="modal-content">
							<div class="modal-header">
								<div class="modal-title" id="clayDefaultModalLabel">${title}</div>

								<button aria-labelledby="Close" class="close" data-dismiss="modal" role="button" type="button">
									<span class="icon-remove icon icon-large"></span>
								</button>
							</div>
							<div class="modal-body">${body}</div>
							<div class="modal-footer">
								<div class="modal-item-last">
									<div class="btn-group">
										<div class="btn-group-item">
											<button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;
			}

			showAddHotKeyModal(i) {
				var modal = $(this.renderAddHotKeyModal(i));

				modal = this.showModal(modal);

				this.addEvent(
					modal,
					'shown.bs.modal',
					function(e) {
						modal.find('#keysInput').first().focus();
					}
				);

				this.addEvent(
					modal.find('#typeOfActionInput'),
					'change',
					e => {
						var actionContainer = modal.find('#action');

						actionContainer.replaceWith($(this.renderAction(e.currentTarget.value)));
					}
				);

				this.addEvent(
					modal.find('form'),
					'submit',
					e => {
						e.preventDefault();

						console.log('e', e);

						this.handleAddNewHotKeySubmit(e);

						modal.modal('hide');

						this.removeEvents();
					}
				);
			}

			showAvailableHotKeys() {
				var modal = $(
					this.renderModal(
						'Liferay Hot Keys',
						this.renderHotKeysModalBody()
					)
				);

				modal = this.showModal(modal);

				this.addEvent(
					modal,
					'click',
					'.delete-definition',
					e => {
						this.deleteCustomDefinition($(e.currentTarget).attr('data-index'));

						var modalBody = modal.find('.modal-body').first();

						modalBody.html(this.renderHotKeysModalBody());
					}
				);

				this.addEvent(
					modal,
					'click',
					'.edit-definition',
					e => {
						this.showAddHotKeyModal($(e.currentTarget).attr('data-index'));
					}
				);

				this.addEvent(
					modal,
					'click',
					'.add-new-hot-key',
					e => {
						this.showAddHotKeyModal();
					}
				);
			}

			showModal(modal) {
				var oldModal = $('#hotKeyModal');

				if (oldModal.length) {
					this.removeEvents();

					oldModal.find('.modal-dialog').first().replaceWith(modal.find('.modal-dialog').first());

					oldModal.modal('show');

					modal = oldModal;
				} else {
					var body = $('body');

					body.append(modal);

					modal.modal();
				}

				return modal;
			}
		}

		var hotKeys = new HotKeys();
	}
);
