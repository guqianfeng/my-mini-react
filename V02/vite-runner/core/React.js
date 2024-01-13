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
    console.log('自己写的createElement');
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'string' ? createTextNode(child) : child)
        }
    }
}

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

const React = {
    createElement,
    render,
}

export default React
