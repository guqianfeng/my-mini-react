function createTextNode(nodeValue) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'string' ? createTextNode(child) : child)
        }
    }
}

// const textEl = createTextNode('app')
// const App = createElement('div', { id: 'app' }, textEl)

const App = createElement('div', { id: 'app' }, 'app ', 'hi ', 'mini-react')

function render(el, container) {
    // 1. 创建节点
    // 2. 设置非children的属性
    // 3. 处理children
    // 4. 添加节点
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type)
    Object.keys(el.props).forEach(key => {
        if (key !== 'children') {
            dom[key] = el.props[key]
        }
    })
    const children = el.props.children
    children.forEach(child => {
        // 递归处理
        render(child, dom)
    })
    container.append(dom)
}

render(App, document.querySelector('#root'))