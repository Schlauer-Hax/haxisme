/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@lucsoft/webgen/bin/components/Components.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/Components.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"action\": () => (/* binding */ action),\n/* harmony export */   \"switchButtons\": () => (/* binding */ switchButtons),\n/* harmony export */   \"span\": () => (/* binding */ span),\n/* harmony export */   \"mIcon\": () => (/* binding */ mIcon),\n/* harmony export */   \"img\": () => (/* binding */ img),\n/* harmony export */   \"custom\": () => (/* binding */ custom),\n/* harmony export */   \"dropdown\": () => (/* binding */ dropdown),\n/* harmony export */   \"input\": () => (/* binding */ input),\n/* harmony export */   \"list\": () => (/* binding */ list),\n/* harmony export */   \"multiStateSwitch\": () => (/* binding */ multiStateSwitch)\n/* harmony export */ });\n/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ \"./node_modules/@lucsoft/webgen/bin/components/Helper.js\");\n\nconst createElement = (type) => window.document.createElement(type);\nfunction action(element, type, value) {\n    element.dispatchEvent(new CustomEvent(type, { detail: value }));\n}\n/**\n * # Actions\n * @checked (boolean)\n * @disable (boolean)\n */\nfunction switchButtons(options) {\n    const span = createElement('span');\n    const switchE = createElement('switch');\n    const input = createElement('input');\n    input.classList.add(\"hide\");\n    input.type = \"checkbox\";\n    span.addEventListener(\"disabled\", (action) => {\n        const checkThing = action.detail;\n        (0,_Helper__WEBPACK_IMPORTED_MODULE_0__.conditionalCSSClass)(switchE, checkThing, 'disabled');\n        input.disabled = checkThing;\n    });\n    span.addEventListener(\"checked\", (action) => {\n        const checkThing = action.detail;\n        (0,_Helper__WEBPACK_IMPORTED_MODULE_0__.conditionalCSSClass)(switchE, checkThing, 'active');\n        input.checked = checkThing;\n    });\n    span.dispatchEvent(new CustomEvent(\"disabled\", { detail: options.disabled }));\n    span.dispatchEvent(new CustomEvent(\"checked\", { detail: options.checked }));\n    span.onclick = () => {\n        if (input.disabled)\n            return;\n        switchE.classList.toggle(\"active\");\n        input.checked = !input.checked;\n        options.onClick?.(input.checked);\n        setTimeout(() => options.onAnimationComplete?.(input.checked), 500);\n    };\n    span.append(switchE);\n    span.append(input);\n    return span;\n}\nconst span = (message, ...classList) => custom('span', message, ...classList);\nconst mIcon = (icon, ...classList) => custom(\"span\", icon, \"material-icons-round\", \"webgen-icon\", ...classList);\nconst img = (source, ...classList) => {\n    const img = createElement('img');\n    img.classList.add(...classList);\n    if (source)\n        img.src = source;\n    return img;\n};\nfunction custom(type, message, ...classList) {\n    const span = createElement(type);\n    span.classList.add(...classList);\n    if (typeof message == \"string\")\n        span.innerText = message;\n    else if (message != undefined)\n        span.append(message);\n    return span;\n}\n/**\n * # Actions\n * @value (number)\n * @disable (boolean)\n */\nfunction dropdown(options = { default: 0 }, ...entrys) {\n    const input = createElement('drop-down');\n    const title = createElement('span');\n    title.innerText = entrys[options.default].title ?? 'Unkown';\n    const ul = createElement('ul');\n    ul.tabIndex = 0;\n    title.onclick = () => {\n        input.classList.add('open');\n        ul.focus();\n    };\n    ul.onblur = () => {\n        input.classList.remove('open');\n    };\n    (0,_Helper__WEBPACK_IMPORTED_MODULE_0__.conditionalCSSClass)(input, options.autoWidth, 'auto-width');\n    (0,_Helper__WEBPACK_IMPORTED_MODULE_0__.conditionalCSSClass)(input, options.small, 'small');\n    input.addEventListener(\"disabled\", (action) => {\n        (0,_Helper__WEBPACK_IMPORTED_MODULE_0__.conditionalCSSClass)(input, action.detail, 'disabled');\n    });\n    input.addEventListener(\"value\", (action) => {\n        if (action.detail !== undefined)\n            title.innerText = entrys[action.detail].title ?? 'Unkown';\n    });\n    input.dispatchEvent(new CustomEvent(\"disabled\", { detail: options.disable }));\n    input.dispatchEvent(new CustomEvent(\"value\", { detail: options.default }));\n    entrys.forEach(element => {\n        const li = createElement('li');\n        li.innerText = element.title;\n        li.onclick = () => {\n            input.classList.remove('open');\n            title.innerText = element.title;\n            element.action();\n        };\n        ul.append(li);\n    });\n    input.append(title, ul);\n    return input;\n}\nfunction input(options) {\n    const input = createElement('input');\n    input.classList.add('tiny-input', 'ignore-default');\n    if (options.type)\n        input.type = options.type;\n    if (options.width)\n        input.style.width = options.width;\n    if (options.value)\n        input.value = options.value;\n    if (options.placeholder)\n        input.placeholder = options.placeholder;\n    return input;\n}\n/**\n * #Actions\n *  @value (list)\n */\nfunction list(options, ...listRaw) {\n    const listE = createElement('list');\n    if (!options.margin)\n        listE.classList.add('nomargin');\n    if (options.style !== \"none\")\n        listE.classList.add('style2');\n    if (options.noHeigthLimit)\n        listE.classList.add('noHeigthLimit');\n    listE.addEventListener(\"value\", (action) => {\n        listE.innerHTML = \"\";\n        for (const iterator of action.detail) {\n            const item = createElement('item');\n            if (iterator.click)\n                item.onclick = iterator.click;\n            const left = createElement('span');\n            if (typeof iterator.left === \"string\") {\n                left.classList.add('left');\n                left.innerText = iterator.left;\n            }\n            else\n                left.append(iterator.left);\n            item.append(left);\n            if (iterator.right !== undefined || (iterator.actions !== undefined && iterator.actions.length !== 0)) {\n                const right = createElement('span');\n                right.classList.add('right');\n                if (iterator.right) {\n                    if (iterator.actions && iterator.actions.length > 0)\n                        iterator.right.classList.add('always');\n                    right.append(iterator.right);\n                }\n                if (iterator.actions)\n                    for (const action of iterator.actions) {\n                        const act = mIcon(action.type);\n                        act.onclick = action.click;\n                        right.append(act);\n                    }\n                item.append(right);\n            }\n            listE.append(item);\n        }\n    });\n    listE.dispatchEvent(new CustomEvent(\"value\", { detail: listRaw }));\n    return listE;\n}\nfunction multiStateSwitch(style, ...test) {\n    const tinymenu = createElement('div');\n    tinymenu.classList.add('tinymenu', style);\n    for (const iterator of test) {\n        const button = custom('button', iterator.title);\n        button.onclick = iterator.action;\n        tinymenu.append(button);\n    }\n    return tinymenu;\n}\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/Components.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/Helper.js":
/*!***************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/Helper.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"conditionalCSSClass\": () => (/* binding */ conditionalCSSClass)\n/* harmony export */ });\nconst conditionalCSSClass = (element, condition, className) => {\n    if (condition === true)\n        element.classList.add(className);\n    else\n        element.classList.remove(className);\n};\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/Helper.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/defaultCard.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/defaultCard.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"defaultCard\": () => (/* binding */ defaultCard)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _css_cards_lline_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/cards.lline.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/cards.lline.webgen.static.css\");\n\n\nconst defaultCard = (options) => ({\n    getSize: () => ({ height: options.height, width: options.width }),\n    draw: (card) => {\n        if (options.small)\n            card.classList.add(\"small\");\n        card.classList.add(\"lline\");\n        card.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.custom)('h1', options.title, 'title'));\n        if (options.subtitle) {\n            card.classList.add(\"subtitle\");\n            card.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(options.subtitle, 'subtitle'));\n        }\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/defaultCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/headlessCard.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/headlessCard.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"headless\": () => (/* binding */ headless)\n/* harmony export */ });\nconst headless = (element) => ({\n    getSize: () => ({ height: undefined, width: undefined }),\n    draw: (card) => {\n        card.append(element);\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/headlessCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/loginCard.js":
/*!************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/loginCard.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginCard\": () => (/* binding */ loginCard)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../light-components/loadingWheel */ \"./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js\");\n/* harmony import */ var _richCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./richCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/richCard.js\");\n\n\n\nconst loginCard = ({ titleText, email, url, button, password, makeLogin, errorMessage }) => {\n    let form = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"form\");\n    let emailField = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\");\n    let passwordFiled = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\");\n    let urlField = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\");\n    if (url) {\n        urlField.type = \"url\";\n        urlField.classList.add('default');\n        urlField.placeholder = url.text;\n        if (url.default)\n            urlField.value = url.default;\n        form.append(urlField);\n    }\n    if (email) {\n        emailField.type = \"email\";\n        emailField.placeholder = email.text;\n        emailField.classList.add('default');\n        if (email.default)\n            emailField.value = email.default;\n        form.append(emailField);\n    }\n    if (password) {\n        passwordFiled.type = \"password\";\n        passwordFiled.placeholder = password.text;\n        passwordFiled.classList.add('default');\n        if (password.default)\n            passwordFiled.value = password.default;\n        form.append(passwordFiled);\n    }\n    let buttonInput = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\");\n    buttonInput.type = \"button\";\n    buttonInput.value = button || \"Login\";\n    if (password)\n        passwordFiled.onkeyup = (e) => {\n            if (e.key == \"Enter\")\n                buttonInput.click();\n        };\n    const loader = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\");\n    loader.classList.add('loader');\n    loader.append(buttonInput);\n    loader.append((0,_light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_1__.loadingWheel)());\n    const content = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.span)(errorMessage ?? 'wrong credentials', 'content');\n    form.append(loader, content);\n    buttonInput.onclick = () => {\n        if (loader.classList.contains('loading'))\n            return;\n        loader.classList.add('loading');\n        makeLogin({\n            password: passwordFiled.value,\n            email: emailField.value || undefined,\n            url: urlField.value || undefined\n        }).then((response) => {\n            if (!response) {\n                loader.classList.remove('loading');\n                content.classList.add('failed');\n            }\n        });\n    };\n    return (0,_richCard__WEBPACK_IMPORTED_MODULE_2__.richCard)({\n        title: titleText || \"Login\",\n        content: form\n    });\n};\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/loginCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/modernCard.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/modernCard.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"modernCard\": () => (/* binding */ modernCard)\n/* harmony export */ });\n/* harmony import */ var _css_cards_modern_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/cards.modern.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/cards.modern.webgen.static.css\");\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\n\nconst modernCard = (options) => ({\n    getSize: () => ({ height: options.height ? options.height + 1 : undefined, width: options.width }),\n    draw: (card) => {\n        let icon = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.img)(undefined);\n        if (options.icon) {\n            card.classList.add('img');\n            if (typeof options.icon == \"string\") {\n                icon.loading = \"lazy\";\n                icon.alt = options.title;\n                icon.width = 60;\n                icon.height = 60;\n                icon.src = options.icon;\n            }\n            else\n                icon = new DOMParser().parseFromString(options.icon.svg, \"image/svg+xml\").children[0];\n        }\n        if (options.icon && (options.align ?? 'right') != \"right\")\n            card.append(icon);\n        card.classList.add('modern');\n        card.classList.add(options.align ?? 'right');\n        const container = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');\n        container.classList.add('title-list');\n        if (options.subtitle !== undefined) {\n            card.classList.add(\"subtitle\");\n            const subtitle = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)('h1');\n            subtitle.classList.add('subtitle');\n            subtitle.innerText = options.subtitle;\n            container.append(subtitle);\n        }\n        container.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.custom)('h1', options.title, 'title'));\n        card.append(container);\n        if (options.icon && (options.align ?? 'right') == \"right\")\n            card.append(icon);\n        if (options.description) {\n            card.classList.add(\"description\");\n            card.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(options.description, 'description'));\n        }\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/modernCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/noteCard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/noteCard.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"noteCard\": () => (/* binding */ noteCard)\n/* harmony export */ });\n/* harmony import */ var _css_cards_note_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/cards.note.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/cards.note.webgen.static.css\");\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\n\nconst noteCard = (options) => ({\n    getSize: () => ({ height: options.height, width: options.width }),\n    draw: (card) => {\n        card.classList.add('note');\n        card.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(options.icon, 'icon'), (0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(options.title, 'text'));\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/noteCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/richCard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/richCard.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"richCard\": () => (/* binding */ richCard)\n/* harmony export */ });\n/* harmony import */ var _css_cards_rich_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/cards.rich.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/cards.rich.webgen.static.css\");\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\n\nconst richCard = (options) => ({\n    getSize: () => ({ height: options.height ? options.height + 1 : undefined, width: options.width }),\n    draw: (card) => {\n        if (options.title)\n            card.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.custom)('h1', options.title, 'rich-title'));\n        card.classList.add(\"rich\");\n        const container = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)('div');\n        container.classList.add('container');\n        if (typeof options.content == \"string\")\n            container.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(options.content, \"title\"));\n        else if (options.content instanceof HTMLElement)\n            container.append(options.content);\n        else\n            options.content.forEach(x => container.append(typeof x == \"string\" ? (0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(x, \"title\") : x));\n        card.append(container);\n        if (options.buttons) {\n            let buttonlist = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"buttonlist\");\n            card.classList.add('buttons');\n            options.buttons.forEach(x => {\n                const button = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.custom)('button', x.title, x.color);\n                button.onclick = x.action;\n                buttonlist.append(button);\n            });\n            card.append(buttonlist);\n        }\n        else\n            card.style.paddingBottom = \"var(--gap)\";\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/richCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/cards/searchCard.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/cards/searchCard.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchCard\": () => (/* binding */ searchCard)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _css_search_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/search.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/search.webgen.static.css\");\n\n\nconst searchCard = (settings) => ({\n    getSize: () => ({ height: undefined, width: settings.width }),\n    draw: (card) => {\n        let search = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"div\");\n        search.classList.add(\"search\");\n        let input = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"input\");\n        let ul = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"ul\");\n        input.placeholder = settings.placeholder || \"Search...\";\n        if (settings.actions?.close) {\n            let icon = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.mIcon)(\"close\");\n            icon.onclick = settings.actions?.close;\n            search.append(icon);\n        }\n        let list = [];\n        let lastsearch = \"\";\n        const reRenderElements = (x) => {\n            let tags = [];\n            x.tags?.filter((tag) => tags.push((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(tag, \"tag\")));\n            let li = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"li\");\n            li.onclick = () => settings.actions?.click?.(x);\n            const left = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"left\");\n            const right = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"right\");\n            if (x.icon) {\n                const image = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.img)(x.icon);\n                image.loading = \"lazy\";\n                left.append(image);\n            }\n            left.append(x.name);\n            if (x.category)\n                right.append((0,_Components__WEBPACK_IMPORTED_MODULE_1__.span)(x.category, \"tag\", \"category\"));\n            if (x.suffix)\n                right.append(x.suffix);\n            right.append(...tags);\n            if (settings.actions?.download) {\n                const download = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.mIcon)(\"get_app\");\n                download.onclick = () => settings.actions?.download?.(x);\n                right.append(download);\n            }\n            if (settings.actions?.edit) {\n                const edit = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.mIcon)(\"edit\");\n                edit.onclick = () => settings.actions?.edit?.(x);\n                right.append(edit);\n            }\n            if (settings.actions?.remove) {\n                const remove = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.mIcon)(\"delete\");\n                remove.onclick = () => settings.actions?.remove?.(x);\n                right.append(remove);\n            }\n            li.append(left);\n            li.append(right);\n            ul.append(li);\n        };\n        input.onkeyup = (d) => {\n            if (d.key == \"Enter\") {\n                if (ul.children.item.length == 1) {\n                    let element = ul.children[0];\n                    element?.click();\n                }\n            }\n            if (lastsearch == input.value)\n                return;\n            lastsearch = input.value;\n            if (settings.mode === 2 /* HideWhenEmpty */ && lastsearch === \"\") {\n                ul.innerHTML = \"\";\n                return;\n            }\n            if (settings.type == \"smart\" && settings.index) {\n                let smart = input.value.split(` `);\n                let tags = [];\n                let name = \"\";\n                smart.forEach(e => {\n                    if (e.startsWith(\"#\") || e.startsWith(\"!\"))\n                        tags.push(e);\n                    else\n                        name += \" \" + e;\n                });\n                name = name.slice(1);\n                list = settings.index;\n                tags.forEach(e => {\n                    if (e.startsWith(\"#\"))\n                        list = list.filter(x => x.tags ? x.tags.indexOf(e.slice(1)) != -1 : false);\n                    else if (e.startsWith(\"!\"))\n                        list = list.filter(x => x.tags ? x.tags.indexOf(e.slice(1)) == -1 : false);\n                    if (list.length == 0)\n                        return;\n                });\n                list = list.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));\n            }\n            else\n                list = settings.index.filter(x => x.name.toLowerCase().includes(input.value.toLowerCase()));\n            ul.innerHTML = \"\";\n            list.forEach(x => reRenderElements(x));\n            if (ul.childNodes.length == 0 && settings.notfound !== undefined) {\n                let li = (0,_Components__WEBPACK_IMPORTED_MODULE_1__.createElement)(\"li\");\n                li.onclick = () => settings?.actions?.click?.({ id: \"notfound\", name: \"notfound\" });\n                li.classList.add(\"gray\");\n                li.innerText = settings.notfound;\n                ul.append(li);\n            }\n        };\n        search.append(input);\n        search.append(ul);\n        if (settings.mode === 0 /* ShowBegin */) {\n            settings.index.forEach(x => reRenderElements(x));\n        }\n        card.append(search);\n        return card;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/cards/searchCard.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/generic/Button.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/generic/Button.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Button\": () => (/* binding */ Button)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\nconst Button = (settings) => ({\n    draw: () => {\n        let element = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"center\");\n        settings.list.forEach(x => {\n            let button = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\");\n            if (settings.big)\n                button.classList.add(\"one\");\n            button.innerHTML = x.text;\n            button.onclick = () => x.onclick(button);\n            element.append(button);\n        });\n        return element;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/generic/Button.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/generic/Card.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/generic/Card.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\nconst Card = ({ minColumnWidth, maxWidth, gap }, ...cardArray) => ({\n    draw: () => {\n        let element = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"cardlist\");\n        if (minColumnWidth)\n            element.style.setProperty('--card-min-width', minColumnWidth + \"rem\");\n        if (maxWidth)\n            element.style.setProperty('--max-width', maxWidth);\n        if (gap)\n            element.style.setProperty('--gap', minColumnWidth + \"rem\");\n        element.append(...cardArray.map(x => {\n            const card = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('card');\n            const { height, width } = x.getSize();\n            if (height && height > 0)\n                card.style.gridRow = `span ${height}`;\n            if (width && width > 0)\n                card.style.gridColumn = `span calc(${width})`;\n            return x.draw(card);\n        }));\n        return element;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/generic/Card.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/generic/Custom.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/generic/Custom.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Custom\": () => (/* binding */ Custom)\n/* harmony export */ });\nconst Custom = (text) => ({\n    draw: () => {\n        return text;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/generic/Custom.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/generic/PageTitle.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/generic/PageTitle.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PageTitle\": () => (/* binding */ PageTitle)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\nconst PageTitle = (text) => ({\n    draw: () => {\n        let element = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.span)(text, 'pagetitle');\n        return element;\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/generic/PageTitle.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/generic/Title.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/generic/Title.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Title\": () => (/* binding */ Title)\n/* harmony export */ });\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\nconst Title = (settings) => ({\n    draw: () => {\n        if (settings.type == \"big\") {\n            let element = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"span\");\n            if (settings.img != undefined) {\n                element.classList.add(\"titlew\", \"withimg\");\n                element.innerHTML = `<img src=\"${settings.img}\", stype=\"margin-bottom:3.2rem\"><br>${settings.title}${settings.subtitle ? `<span class=\"subtitlew\">${settings.subtitle}</span>` : ``}`;\n            }\n            else {\n                element.classList.add(\"titlew\");\n                element.innerHTML = `${settings.title}${settings.subtitle ? `<span class=\"subtitlew\" style=\"margin-left: 0;${(settings.title.indexOf(\"y\") != -1 || settings.title.indexOf(\"j\") != -1 || settings.title.indexOf(\"q\") != -1 || settings.title.indexOf(\"p\") != -1) ? 'margin-top: 0.5rem;' : ''}\">${settings.subtitle}</span>` : ''}`;\n            }\n            return element;\n        }\n        else if (settings.type === \"small\") {\n            let element = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h2\");\n            element.innerHTML = settings.title;\n            if (settings.subtitle) {\n                const shell = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n                let element2 = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h4\");\n                element2.innerHTML = settings.subtitle;\n                let element3 = (0,_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"br\");\n                shell.append(element, element2, element3);\n                return shell;\n            }\n            else\n                return element;\n        }\n        return (0,_Components__WEBPACK_IMPORTED_MODULE_0__.span)(undefined);\n    }\n});\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/generic/Title.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadingWheel\": () => (/* binding */ loadingWheel)\n/* harmony export */ });\nconst loadingWheel = () => {\n    const icon = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    icon.classList.add('loading-wheel');\n    icon.setAttribute(\"viewBox\", \"0 0 73 73\");\n    icon.setAttribute(\"xmlns\", \"http://www.w3.org/2000/svg\");\n    icon.setAttribute(\"fill\", \"none\");\n    icon.innerHTML = `<circle cx=\"36.5\" cy=\"36.5\" r=\"35.5\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>`;\n    return icon;\n};\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/themes.js":
/*!********************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/themes.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"blur\": () => (/* binding */ blur),\n/* harmony export */   \"dark\": () => (/* binding */ dark),\n/* harmony export */   \"white\": () => (/* binding */ white)\n/* harmony export */ });\nconst blur = `\n    :root {\n        --background-color: hsla(0, 0%, 4%, 1);\n        --on-background-text: white;\n        --background-card: hsla(0, 0%, 0%, 0.67);\n        --on-card-text: #ffffff;\n        --on-card-subtext: #646464;\n        --on-card-background: rgba(0, 0, 0, 0.6);\n        --text-red: #f81919;\n    }\n    body {\n        background: url(%base64Image%) no-repeat center center fixed;\n        background-size: cover;\n        background-attachment: fixed;\n    }\n    card, center > button {\n        backdrop-filter: blur(1rem);\n        -webkit-backdrop-filter: blur(1rem);\n    }\n    input:-webkit-autofill {\n        -webkit-box-shadow: 0 0 0 50px black inset !important;\n        -webkit-text-fill-color: var(--on-card-text) !important;\n    }\n    card.modern .subtitle {\n        color: #adadad;\n    }\n`;\nconst dark = `\n    :root {\n        --box-shadow: none;\n        --background-color: hsla(0, 0%, 4%, 1);\n        --on-background-text: #ececec;\n        --background-card: hsla(0, 0%, 9%, 1);\n        --on-card-text: #ffffff;\n        --on-card-subtext: #646464;\n        --on-card-background: hsl(0deg 0% 14%);\n        --text-red: #f81919;\n    }\n`;\nconst white = `\n    :root {\n        --box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 15%);\n        --background-color: hsla(0, 0%, 90%, 1);\n        --on-background-text: black;\n        --background-card: hsla(0, 0%, 100%, 1);\n        --on-card-text: #2d2d2d;\n        --on-card-subtext: #646464;\n        --on-card-background: rgb(255, 255, 255);\n        --text-red: #f81919;\n    }\n`;\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/themes.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/lib/RenderingX.js":
/*!************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/lib/RenderingX.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderingX\": () => (/* binding */ RenderingX)\n/* harmony export */ });\n/* harmony import */ var _components_Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _components_light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/light-components/loadingWheel */ \"./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js\");\n\n\nclass RenderingX {\n    constructor() {\n        this.checkIfOptionsIstCustomElement = (value) => {\n            return typeof value.customElement !== \"undefined\";\n        };\n        this.checkIfOptionsIstRenderingXResult = (value) => {\n            return typeof value.getState !== \"undefined\";\n        };\n        this.toBody = (options, initStateData, data) => this.toCustom({ ...options, shell: document.body }, initStateData, data);\n        const notify = document.querySelector('#notify');\n        if (notify)\n            this.staticNotify = notify;\n        else {\n            const notifyNew = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n            notifyNew.id = \"notify\";\n            notifyNew.classList.add('notify');\n            document.body.append(notifyNew);\n            this.staticNotify = notifyNew;\n        }\n        this.dialogShell = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n        this.dialogShell.classList.add('dialog-shell');\n        document.body.append(this.dialogShell);\n    }\n    notify(test, keepOpenUntilDone) {\n        const notifcation = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.span)(test);\n        if (keepOpenUntilDone === undefined)\n            setTimeout(() => notifcation.remove(), 6010);\n        else\n            keepOpenUntilDone().then(() => notifcation.remove());\n        this.staticNotify.append(notifcation);\n    }\n    toDialog(options) {\n        const dialogBackdrop = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.custom)('div', undefined, 'dialog-backdrop');\n        const closeDialog = (autoRemove = true) => {\n            dialogBackdrop.classList.remove('open');\n            document.body.style.overflowY = \"unset\";\n            if (autoRemove)\n                dialogBackdrop.remove();\n        };\n        if (this.checkIfOptionsIstCustomElement(options)) {\n            options.customElement.classList.add('dialog');\n            dialogBackdrop.append(options.customElement);\n        }\n        else {\n            const dialog = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('div');\n            if (options.userRequestClose !== undefined) {\n                document.addEventListener('keyup', (e) => {\n                    if (e.key == \"Escape\" && dialogBackdrop.classList.contains('open')) {\n                        const data = options.userRequestClose?.();\n                        if (data !== undefined && !dialog.querySelector('buttonlist.loading')) {\n                            closeDialog(data === 1 /* RemoveClose */);\n                        }\n                    }\n                });\n                dialogBackdrop.onclick = (e) => {\n                    if (e.target != dialogBackdrop)\n                        return;\n                    const data = options.userRequestClose?.();\n                    if (data !== undefined && !dialog.querySelector('buttonlist.loading')) {\n                        closeDialog(data === 1 /* RemoveClose */);\n                    }\n                };\n            }\n            dialog.classList.add('dialog');\n            dialogBackdrop.append(dialog);\n            if (options.title)\n                dialog.append((0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.span)(options.title, 'dialog-title'));\n            const renderedContent = options.content instanceof HTMLElement\n                ? options.content\n                : (this.checkIfOptionsIstRenderingXResult(options.content) ? options.content.getShell() : options.content.draw());\n            renderedContent.classList.add('dialog-content');\n            dialog.append(renderedContent);\n            if (options.buttons) {\n                const buttonList = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('buttonlist');\n                options.buttons.forEach(([language, action, color = 'normal']) => {\n                    const button = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.custom)('button', language, color);\n                    button.onclick = async () => {\n                        if (buttonList.classList.contains('loading'))\n                            return;\n                        if (action === 0 /* Close */)\n                            closeDialog(false);\n                        else if (action === 1 /* RemoveClose */)\n                            closeDialog();\n                        else {\n                            button.append((0,_components_light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_1__.loadingWheel)());\n                            buttonList.classList.add('loading');\n                            button.classList.add('loading');\n                            const data = await action();\n                            if (data !== undefined)\n                                closeDialog(data === 1 /* RemoveClose */);\n                            buttonList.classList.remove('loading');\n                            button.classList.remove('loading');\n                        }\n                    };\n                    buttonList.append(button);\n                });\n                dialog.append(buttonList);\n            }\n        }\n        this.dialogShell.append(dialogBackdrop);\n        return {\n            open: () => {\n                if (!this.checkIfOptionsIstCustomElement(options) && this.checkIfOptionsIstRenderingXResult(options.content))\n                    options.content.forceRedraw();\n                dialogBackdrop.classList.add('open');\n                document.body.style.overflowY = \"hidden\";\n            },\n            close: closeDialog\n        };\n    }\n    toCustom(options, initStateData, data) {\n        const shell = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('article');\n        let state = initStateData;\n        options.shell?.append(shell);\n        if (options.maxWidth) {\n            shell.classList.add('maxWidth');\n            shell.style.maxWidth = options.maxWidth;\n        }\n        let drawedElements = [];\n        const fetchedData = typeof data === \"function\" ? data((updateState) => {\n            if (updateState !== undefined) {\n                state = { ...state, ...updateState };\n                fullRedraw();\n            }\n            else\n                drawFromCache();\n        }) : data;\n        function singleRedrawFunction(index, updateState) {\n            if (updateState !== undefined)\n                state = { ...state, ...updateState };\n            const data = drawedElements.find(([findIndex]) => findIndex == index);\n            if (data)\n                data[2] = true;\n            drawFromCache();\n        }\n        function drawFromCache() {\n            drawedElements.forEach(([id, currentElement, requiresRerender]) => {\n                if (requiresRerender === false)\n                    return;\n                const reDrawElement = fetchedData[id];\n                const helpDraw = (data) => data instanceof HTMLElement ? data : data.draw();\n                const preRendered = typeof reDrawElement == \"object\"\n                    ? reDrawElement\n                    : reDrawElement(state, (updateState) => singleRedrawFunction(id, updateState));\n                const mappedrender = helpDraw(preRendered);\n                if (currentElement === undefined)\n                    shell.append(mappedrender);\n                else\n                    shell.replaceChild(mappedrender, currentElement);\n                drawedElements.find(([oldId]) => oldId == id)[1] = mappedrender;\n                return mappedrender;\n            });\n        }\n        function fullRedraw() {\n            drawedElements = fetchedData.map((_, index) => [\n                index, drawedElements[index]?.[1], true\n            ]);\n            drawFromCache();\n        }\n        fullRedraw();\n        return {\n            getState: () => state,\n            getShell: () => shell,\n            forceRedraw: (data, index) => {\n                if (data !== undefined) {\n                    state = { ...state, ...data };\n                }\n                if (index) {\n                    drawedElements.find(x => x[0] === index)[2] = true;\n                    drawFromCache();\n                }\n                else\n                    fullRedraw();\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/lib/RenderingX.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/lib/Style.js":
/*!*******************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/lib/Style.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Style\": () => (/* binding */ Style)\n/* harmony export */ });\n/* harmony import */ var _css_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/themes */ \"./node_modules/@lucsoft/webgen/bin/css/themes.js\");\n/* harmony import */ var _components_Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n\n\nclass Style {\n    constructor(autoLoadFonts, image, emitEventOnSameThemeChange) {\n        this.head = document.head;\n        this.current = 1 /* gray */;\n        this.hooks = [];\n        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');\n        this.onThemeUpdate = (action) => this.hooks.push(action);\n        this.image = image;\n        this.emitEventOnSameThemeChange = emitEventOnSameThemeChange;\n        if (autoLoadFonts) {\n            var roboto = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('link');\n            roboto.rel = \"stylesheet\";\n            roboto.href = \"https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500|Material+Icons+Round&display=swap\";\n            this.head?.append(roboto);\n        }\n        this.theme = (0,_components_Components__WEBPACK_IMPORTED_MODULE_0__.createElement)('style');\n        this.head.appendChild(this.theme);\n        this.mediaQuery.addEventListener('change', e => {\n            if (this.current == 5 /* autoDark */ || this.current == 6 /* autoWhite */)\n                this.updateTheme(e.matches ? 5 /* autoDark */ : 6 /* autoWhite */);\n        });\n    }\n    updateTheme(theme) {\n        const mapping = {\n            [0 /* white */]: _css_themes__WEBPACK_IMPORTED_MODULE_1__.white,\n            [1 /* gray */]: \"\",\n            [2 /* dark */]: _css_themes__WEBPACK_IMPORTED_MODULE_1__.dark,\n            [3 /* blur */]: _css_themes__WEBPACK_IMPORTED_MODULE_1__.blur.replace('%base64Image%', `'${this.image()}'`),\n            [6 /* autoWhite */]: _css_themes__WEBPACK_IMPORTED_MODULE_1__.white,\n            [5 /* autoDark */]: _css_themes__WEBPACK_IMPORTED_MODULE_1__.dark,\n        };\n        switch (theme) {\n            case 2 /* dark */:\n            case 0 /* white */:\n            case 3 /* blur */:\n            case 5 /* autoDark */:\n            case 6 /* autoWhite */:\n            case 1 /* gray */:\n                if (this.current == theme) {\n                    if (this.emitEventOnSameThemeChange)\n                        this.hooks.forEach(x => x(theme));\n                    return;\n                }\n                this.theme.innerHTML = mapping[theme];\n                this.current = theme;\n                this.hooks.forEach(x => x(theme));\n                break;\n            case 4 /* auto */:\n                this.updateTheme(this.mediaQuery.matches ? 5 /* autoDark */ : 6 /* autoWhite */);\n                break;\n            default:\n                break;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/lib/Style.js?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/webgen.js":
/*!****************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/webgen.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"action\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.action),\n/* harmony export */   \"createElement\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.createElement),\n/* harmony export */   \"custom\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.custom),\n/* harmony export */   \"dropdown\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.dropdown),\n/* harmony export */   \"img\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.img),\n/* harmony export */   \"input\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.input),\n/* harmony export */   \"list\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.list),\n/* harmony export */   \"mIcon\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.mIcon),\n/* harmony export */   \"multiStateSwitch\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.multiStateSwitch),\n/* harmony export */   \"span\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.span),\n/* harmony export */   \"switchButtons\": () => (/* reexport safe */ _components_Components__WEBPACK_IMPORTED_MODULE_7__.switchButtons),\n/* harmony export */   \"conditionalCSSClass\": () => (/* reexport safe */ _components_Helper__WEBPACK_IMPORTED_MODULE_8__.conditionalCSSClass),\n/* harmony export */   \"searchCard\": () => (/* reexport safe */ _components_cards_searchCard__WEBPACK_IMPORTED_MODULE_9__.searchCard),\n/* harmony export */   \"defaultCard\": () => (/* reexport safe */ _components_cards_defaultCard__WEBPACK_IMPORTED_MODULE_10__.defaultCard),\n/* harmony export */   \"headless\": () => (/* reexport safe */ _components_cards_headlessCard__WEBPACK_IMPORTED_MODULE_11__.headless),\n/* harmony export */   \"loginCard\": () => (/* reexport safe */ _components_cards_loginCard__WEBPACK_IMPORTED_MODULE_12__.loginCard),\n/* harmony export */   \"modernCard\": () => (/* reexport safe */ _components_cards_modernCard__WEBPACK_IMPORTED_MODULE_13__.modernCard),\n/* harmony export */   \"noteCard\": () => (/* reexport safe */ _components_cards_noteCard__WEBPACK_IMPORTED_MODULE_14__.noteCard),\n/* harmony export */   \"richCard\": () => (/* reexport safe */ _components_cards_richCard__WEBPACK_IMPORTED_MODULE_15__.richCard),\n/* harmony export */   \"Title\": () => (/* reexport safe */ _components_generic_Title__WEBPACK_IMPORTED_MODULE_16__.Title),\n/* harmony export */   \"Custom\": () => (/* reexport safe */ _components_generic_Custom__WEBPACK_IMPORTED_MODULE_17__.Custom),\n/* harmony export */   \"Card\": () => (/* reexport safe */ _components_generic_Card__WEBPACK_IMPORTED_MODULE_18__.Card),\n/* harmony export */   \"PageTitle\": () => (/* reexport safe */ _components_generic_PageTitle__WEBPACK_IMPORTED_MODULE_19__.PageTitle),\n/* harmony export */   \"Button\": () => (/* reexport safe */ _components_generic_Button__WEBPACK_IMPORTED_MODULE_20__.Button),\n/* harmony export */   \"loadingWheel\": () => (/* reexport safe */ _components_light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_21__.loadingWheel),\n/* harmony export */   \"RenderingX\": () => (/* reexport safe */ _lib_RenderingX__WEBPACK_IMPORTED_MODULE_22__.RenderingX),\n/* harmony export */   \"WebGen\": () => (/* binding */ WebGen)\n/* harmony export */ });\n/* harmony import */ var _lib_RenderingX__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lib/RenderingX */ \"./node_modules/@lucsoft/webgen/bin/lib/RenderingX.js\");\n/* harmony import */ var _lib_Style__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lib/Style */ \"./node_modules/@lucsoft/webgen/bin/lib/Style.js\");\n/* harmony import */ var _css_webgen_static_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/webgen.static.css\");\n/* harmony import */ var _css_cards_webgen_static_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/cards.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/cards.webgen.static.css\");\n/* harmony import */ var _css_dialog_webgen_static_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/dialog.webgen.static.css */ \"./node_modules/@lucsoft/webgen/bin/css/dialog.webgen.static.css\");\n/* harmony import */ var _css_elements_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/elements.css */ \"./node_modules/@lucsoft/webgen/bin/css/elements.css\");\n/* harmony import */ var _css_grouping_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/grouping.css */ \"./node_modules/@lucsoft/webgen/bin/css/grouping.css\");\n/* harmony import */ var _css_master_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/master.css */ \"./node_modules/@lucsoft/webgen/bin/css/master.css\");\n/* harmony import */ var _css_modern_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/modern.css */ \"./node_modules/@lucsoft/webgen/bin/css/modern.css\");\n/* harmony import */ var _components_Components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Components */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _components_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Helper */ \"./node_modules/@lucsoft/webgen/bin/components/Helper.js\");\n/* harmony import */ var _components_cards_searchCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/cards/searchCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/searchCard.js\");\n/* harmony import */ var _components_cards_defaultCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/cards/defaultCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/defaultCard.js\");\n/* harmony import */ var _components_cards_headlessCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/cards/headlessCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/headlessCard.js\");\n/* harmony import */ var _components_cards_loginCard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/cards/loginCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/loginCard.js\");\n/* harmony import */ var _components_cards_modernCard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/cards/modernCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/modernCard.js\");\n/* harmony import */ var _components_cards_noteCard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/cards/noteCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/noteCard.js\");\n/* harmony import */ var _components_cards_richCard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/cards/richCard */ \"./node_modules/@lucsoft/webgen/bin/components/cards/richCard.js\");\n/* harmony import */ var _components_generic_Title__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/generic/Title */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Title.js\");\n/* harmony import */ var _components_generic_Custom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/generic/Custom */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Custom.js\");\n/* harmony import */ var _components_generic_Card__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/generic/Card */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Card.js\");\n/* harmony import */ var _components_generic_PageTitle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/generic/PageTitle */ \"./node_modules/@lucsoft/webgen/bin/components/generic/PageTitle.js\");\n/* harmony import */ var _components_generic_Button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/generic/Button */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Button.js\");\n/* harmony import */ var _components_light_components_loadingWheel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/light-components/loadingWheel */ \"./node_modules/@lucsoft/webgen/bin/components/light-components/loadingWheel.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst WebGen = (options = {}) => {\n    console.log(\"Loaded @lucsoft/webgen\");\n    const theme = new _lib_Style__WEBPACK_IMPORTED_MODULE_23__.Style(options.autoLoadFonts ?? true, options.image ?? (() => ''), options.emitEventOnSameThemeChange ?? false);\n    if (options.onThemeUpdate)\n        theme.onThemeUpdate(options.onThemeUpdate);\n    if (options.updateThemeOnInit ?? true)\n        theme.updateTheme(options.theme ?? 4 /* auto */);\n    return {\n        theme,\n        render: new _lib_RenderingX__WEBPACK_IMPORTED_MODULE_22__.RenderingX()\n    };\n};\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/webgen.js?");

/***/ }),

/***/ "./src/imgs/discord_dnd.svg":
/*!**********************************!*\
  !*** ./src/imgs/discord_dnd.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"dcda7.svg\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/discord_dnd.svg?");

/***/ }),

/***/ "./src/imgs/discord_idle.svg":
/*!***********************************!*\
  !*** ./src/imgs/discord_idle.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"17c65.svg\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/discord_idle.svg?");

/***/ }),

/***/ "./src/imgs/discord_offline.svg":
/*!**************************************!*\
  !*** ./src/imgs/discord_offline.svg ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"183cd.svg\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/discord_offline.svg?");

/***/ }),

/***/ "./src/imgs/discord_online.svg":
/*!*************************************!*\
  !*** ./src/imgs/discord_online.svg ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"0968f.svg\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/discord_online.svg?");

/***/ }),

/***/ "./src/imgs/memoji.png":
/*!*****************************!*\
  !*** ./src/imgs/memoji.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"cd322.png\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/memoji.png?");

/***/ }),

/***/ "./src/imgs/spotify_listening.svg":
/*!****************************************!*\
  !*** ./src/imgs/spotify_listening.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"162fc.svg\");\n\n//# sourceURL=webpack://lucsoft.de/./src/imgs/spotify_listening.svg?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/cards.lline.webgen.static.css":
/*!****************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/cards.lline.webgen.static.css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/cards.lline.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/cards.modern.webgen.static.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/cards.modern.webgen.static.css ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/cards.modern.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/cards.note.webgen.static.css":
/*!***************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/cards.note.webgen.static.css ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/cards.note.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/cards.rich.webgen.static.css":
/*!***************************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/cards.rich.webgen.static.css ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/cards.rich.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/cards.webgen.static.css":
/*!**********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/cards.webgen.static.css ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/cards.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/dialog.webgen.static.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/dialog.webgen.static.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/dialog.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/elements.css":
/*!***********************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/elements.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/elements.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/grouping.css":
/*!***********************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/grouping.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/grouping.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/master.css":
/*!*********************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/master.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/master.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/modern.css":
/*!*********************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/modern.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/modern.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/search.webgen.static.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/search.webgen.static.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/search.webgen.static.css?");

/***/ }),

/***/ "./node_modules/@lucsoft/webgen/bin/css/webgen.static.css":
/*!****************************************************************!*\
  !*** ./node_modules/@lucsoft/webgen/bin/css/webgen.static.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./node_modules/@lucsoft/webgen/bin/css/webgen.static.css?");

/***/ }),

/***/ "./src/styles/devices.css":
/*!********************************!*\
  !*** ./src/styles/devices.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./src/styles/devices.css?");

/***/ }),

/***/ "./src/styles/footer.css":
/*!*******************************!*\
  !*** ./src/styles/footer.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./src/styles/footer.css?");

/***/ }),

/***/ "./src/styles/navigation.css":
/*!***********************************!*\
  !*** ./src/styles/navigation.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./src/styles/navigation.css?");

/***/ }),

/***/ "./src/styles/opener.css":
/*!*******************************!*\
  !*** ./src/styles/opener.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lucsoft.de/./src/styles/opener.css?");

/***/ }),

/***/ "./src/components/activities.ts":
/*!**************************************!*\
  !*** ./src/components/activities.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderActivites\": () => (/* binding */ renderActivites)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Card.js\");\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/cards/defaultCard.js\");\n/* harmony import */ var _data_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/eventListener */ \"./src/data/eventListener.ts\");\n/* harmony import */ var _styles_devices_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/devices.css */ \"./src/styles/devices.css\");\n\r\n\r\n\r\nlet activityData = [];\r\nconst renderActivites = () => {\r\n    const shell = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.span)(undefined);\r\n    const list = () => (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_3__.Card)({ minColumnWidth: 24 }, ...activityData.map(name => {\r\n        return (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_4__.defaultCard)({\r\n            title: name[0],\r\n            subtitle: name[1],\r\n            small: true\r\n        });\r\n    })).draw();\r\n    shell.innerHTML = \"\";\r\n    shell.append(list());\r\n    (0,_data_eventListener__WEBPACK_IMPORTED_MODULE_0__.registerEvent)((data) => {\r\n        activityData = data.discord[0].filter((x) => x.name != \"Custom Status\" && x.name != \"Spotify\").map((data) => [data.name, 'playing']);\r\n        shell.innerHTML = \"\";\r\n        shell.append(list());\r\n    });\r\n    return shell;\r\n};\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/activities.ts?");

/***/ }),

/***/ "./src/components/cards.ts":
/*!*********************************!*\
  !*** ./src/components/cards.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderCards\": () => (/* binding */ renderCards)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/generic/Card.js\");\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/cards/modernCard.js\");\n/* harmony import */ var _data_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/eventListener */ \"./src/data/eventListener.ts\");\n/* harmony import */ var _imgs_discord_online_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../imgs/discord_online.svg */ \"./src/imgs/discord_online.svg\");\n/* harmony import */ var _imgs_discord_idle_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../imgs/discord_idle.svg */ \"./src/imgs/discord_idle.svg\");\n/* harmony import */ var _imgs_discord_dnd_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../imgs/discord_dnd.svg */ \"./src/imgs/discord_dnd.svg\");\n/* harmony import */ var _imgs_discord_offline_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../imgs/discord_offline.svg */ \"./src/imgs/discord_offline.svg\");\n/* harmony import */ var _imgs_spotify_listening_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../imgs/spotify_listening.svg */ \"./src/imgs/spotify_listening.svg\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet status = 'online';\r\nlet discordlogo = _imgs_discord_online_svg__WEBPACK_IMPORTED_MODULE_1__.default;\r\nlet spotifylogo = _imgs_spotify_listening_svg__WEBPACK_IMPORTED_MODULE_5__.default;\r\nlet spotifyname = \"Not Playing\";\r\nlet spotifydevice = \"\";\r\nconst renderCards = () => {\r\n    const shell = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_6__.span)(undefined);\r\n    const list = () => (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_7__.Card)({}, (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_8__.modernCard)({\r\n        align: \"right\",\r\n        icon: discordlogo,\r\n        title: status.charAt(0).toUpperCase() + status.slice(1),\r\n        subtitle: \"Discord\",\r\n        description: \"Add me: Hax#6775\"\r\n    }), (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_8__.modernCard)({\r\n        align: \"right\",\r\n        icon: spotifylogo,\r\n        title: spotifydevice,\r\n        subtitle: \"Spotify\",\r\n        description: spotifyname\r\n    })).draw();\r\n    shell.innerHTML = \"\";\r\n    shell.append(list());\r\n    (0,_data_eventListener__WEBPACK_IMPORTED_MODULE_0__.registerEvent)((data) => {\r\n        status = data.discord[1];\r\n        switch (status) {\r\n            case \"online\":\r\n                discordlogo = _imgs_discord_online_svg__WEBPACK_IMPORTED_MODULE_1__.default;\r\n                break;\r\n            case \"idle\":\r\n                discordlogo = _imgs_discord_idle_svg__WEBPACK_IMPORTED_MODULE_2__.default;\r\n                break;\r\n            case \"dnd\":\r\n                discordlogo = _imgs_discord_dnd_svg__WEBPACK_IMPORTED_MODULE_3__.default;\r\n                break;\r\n            case \"offline\":\r\n                discordlogo = _imgs_discord_offline_svg__WEBPACK_IMPORTED_MODULE_4__.default;\r\n                break;\r\n        }\r\n        if (data.spotify.is_playing) {\r\n            spotifylogo = data.spotify.item.album.images[0].url;\r\n            spotifyname = data.spotify.item.name + \" - \" + data.spotify.item.artists.map((artist) => artist.name).join(', ');\r\n            spotifydevice = data.spotify.device.name;\r\n        }\r\n        else {\r\n            spotifylogo = _imgs_spotify_listening_svg__WEBPACK_IMPORTED_MODULE_5__.default;\r\n            if (data.spotify.item) {\r\n                spotifyname = \"Last song: \" + data.spotify.item.name + \" - \" + data.spotify.item.artists.map((artist) => artist.name).join(', ');\r\n            }\r\n            spotifydevice = \"Playback Paused\";\r\n        }\r\n        shell.innerHTML = \"\";\r\n        shell.append(list());\r\n    });\r\n    return shell;\r\n};\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/cards.ts?");

/***/ }),

/***/ "./src/components/devices.ts":
/*!***********************************!*\
  !*** ./src/components/devices.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderDevices\": () => (/* binding */ renderDevices)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _data_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/eventListener */ \"./src/data/eventListener.ts\");\n/* harmony import */ var _styles_devices_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/devices.css */ \"./src/styles/devices.css\");\n\r\n\r\n\r\nlet batteryData = [];\r\nconst renderDevices = () => ({\r\n    draw: () => {\r\n        const shell = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.span)(undefined);\r\n        (0,_data_eventListener__WEBPACK_IMPORTED_MODULE_0__.registerEvent)((data) => {\r\n            batteryData = [];\r\n            data.apple.forEach((device) => {\r\n                batteryData.push([device.name, device.battery, device.time]);\r\n            });\r\n            skillsArea.innerHTML = '';\r\n            skillsArea.append(mySkills, ...batteryData.map(x => renderProgressBar(x[0], x[1], x[2])));\r\n            shell.innerHTML = \"\";\r\n            shell.append(skillsArea);\r\n        });\r\n        const skillsArea = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('section', undefined, \"skills-area\");\r\n        const mySkills = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('h2', \"MY DEVICES\", 'my-skills');\r\n        const renderProgressBar = (name, progress, timestamp) => {\r\n            var date = new Date(timestamp);\r\n            var hours = date.getHours();\r\n            var minutes = \"0\" + date.getMinutes();\r\n            var seconds = \"0\" + date.getSeconds();\r\n            var time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);\r\n            const background = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('div', undefined, 'skill-bar');\r\n            const foreground = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('div', (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.span)(name + \" - \" + progress + \"% - \" + time));\r\n            foreground.style.width = `${progress}%`;\r\n            background.append((0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.span)(name + \" - \" + progress + \"% - \" + time), foreground);\r\n            return background;\r\n        };\r\n        shell.innerHTML = \"\";\r\n        shell.append(skillsArea);\r\n        return shell;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/devices.ts?");

/***/ }),

/***/ "./src/components/footer.ts":
/*!**********************************!*\
  !*** ./src/components/footer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderFooter\": () => (/* binding */ renderFooter)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _styles_footer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/footer.css */ \"./src/styles/footer.css\");\n\r\n\r\nconst renderFooter = () => ({\r\n    draw: () => {\r\n        const footer = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__.span)(undefined, 'footer');\r\n        const right = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__.span)(undefined);\r\n        right.innerHTML = `<a href=\"https://bbn.one/p/imprint.html\">Imprint</a>`;\r\n        footer.append((0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__.span)(\"HaxIs.me – Copyright 2021\"), right);\r\n        return footer;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/footer.ts?");

/***/ }),

/***/ "./src/components/navigation.ts":
/*!**************************************!*\
  !*** ./src/components/navigation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderNavigation\": () => (/* binding */ renderNavigation)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _styles_navigation_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/navigation.css */ \"./src/styles/navigation.css\");\n\r\n\r\nconst navigationElements = [\r\n    { title: 'HaxIs.me', url: 'https://haxis.me' },\r\n    { title: 'GitHub', url: 'https://github.com/Schlauer-Hax' },\r\n    { title: 'BBN', url: 'https://bbn.one' },\r\n    { title: 'Contact', url: 'mailto:mail@haxis.me' }\r\n];\r\nconst renderNavigation = () => ({\r\n    draw: () => {\r\n        const nav = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__.custom)('div', undefined, 'nav');\r\n        navigationElements.forEach((x) => {\r\n            const label = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_1__.custom)('a', x.title);\r\n            label.href = x.url;\r\n            nav.append(label);\r\n        });\r\n        return nav;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/navigation.ts?");

/***/ }),

/***/ "./src/components/opener.ts":
/*!**********************************!*\
  !*** ./src/components/opener.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderOpener\": () => (/* binding */ renderOpener)\n/* harmony export */ });\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/components/Components.js\");\n/* harmony import */ var _imgs_memoji_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../imgs/memoji.png */ \"./src/imgs/memoji.png\");\n/* harmony import */ var _styles_opener_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/opener.css */ \"./src/styles/opener.css\");\n\r\n\r\n\r\nconst renderOpener = () => ({\r\n    draw: () => {\r\n        const opener = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('div', undefined, \"opener\");\r\n        const imageContainer = document.createElement('div');\r\n        const images = ['image'].map(x => {\r\n            const image = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.img)('img', _imgs_memoji_png__WEBPACK_IMPORTED_MODULE_0__.default, x);\r\n            image.src = _imgs_memoji_png__WEBPACK_IMPORTED_MODULE_0__.default;\r\n            image.height = 280;\r\n            image.width = 280;\r\n            return image;\r\n        });\r\n        imageContainer.append(...images);\r\n        opener.append(imageContainer);\r\n        opener.append((0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_2__.custom)('h1', \"Hax - COO of BBN\", \"opener-text\"));\r\n        return opener;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/components/opener.ts?");

/***/ }),

/***/ "./src/data/eventListener.ts":
/*!***********************************!*\
  !*** ./src/data/eventListener.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerEvent\": () => (/* binding */ registerEvent),\n/* harmony export */   \"emitEvent\": () => (/* binding */ emitEvent)\n/* harmony export */ });\nconst events = [];\r\nfunction registerEvent(event) {\r\n    events.push(event);\r\n}\r\nfunction emitEvent(data) {\r\n    events.forEach(element => element(data));\r\n}\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/data/eventListener.ts?");

/***/ }),

/***/ "./src/data/init.ts":
/*!**************************!*\
  !*** ./src/data/init.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"startConnection\": () => (/* binding */ startConnection)\n/* harmony export */ });\n/* harmony import */ var _eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListener */ \"./src/data/eventListener.ts\");\n\r\nfunction startConnection() {\r\n    const websocket = new WebSocket('wss://' + location.hostname);\r\n    websocket.onmessage = (message) => {\r\n        (0,_eventListener__WEBPACK_IMPORTED_MODULE_0__.emitEvent)(JSON.parse(message.data));\r\n    };\r\n    websocket.onopen = () => {\r\n        console.log('Connected');\r\n    };\r\n    websocket.onclose = () => {\r\n        setTimeout(() => {\r\n            startConnection();\r\n        }, 5000);\r\n        console.log('Closed');\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/data/init.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lucsoft_webgen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lucsoft/webgen */ \"./node_modules/@lucsoft/webgen/bin/webgen.js\");\n/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/cards */ \"./src/components/cards.ts\");\n/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/footer */ \"./src/components/footer.ts\");\n/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/navigation */ \"./src/components/navigation.ts\");\n/* harmony import */ var _components_opener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/opener */ \"./src/components/opener.ts\");\n/* harmony import */ var _components_devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/devices */ \"./src/components/devices.ts\");\n/* harmony import */ var _components_activities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/activities */ \"./src/components/activities.ts\");\n/* harmony import */ var _data_init__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/init */ \"./src/data/init.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst web = (0,_lucsoft_webgen__WEBPACK_IMPORTED_MODULE_7__.WebGen)();\r\nweb.render.toBody({ maxWidth: '80rem' }, {}, () => [\r\n    (0,_components_navigation__WEBPACK_IMPORTED_MODULE_2__.renderNavigation)(),\r\n    (0,_components_opener__WEBPACK_IMPORTED_MODULE_3__.renderOpener)(),\r\n    (0,_components_cards__WEBPACK_IMPORTED_MODULE_0__.renderCards)(),\r\n    (0,_components_activities__WEBPACK_IMPORTED_MODULE_5__.renderActivites)(),\r\n    (0,_components_devices__WEBPACK_IMPORTED_MODULE_4__.renderDevices)(),\r\n    (0,_components_footer__WEBPACK_IMPORTED_MODULE_1__.renderFooter)()\r\n]);\r\n(0,_data_init__WEBPACK_IMPORTED_MODULE_6__.startConnection)();\r\n\n\n//# sourceURL=webpack://lucsoft.de/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;