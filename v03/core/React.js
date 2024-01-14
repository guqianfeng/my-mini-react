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
    nextWorkOfUnit = {
        dom: container,
        props: {
            children: [el]
        }
    }
}

let nextWorkOfUnit = null
function workLoop(IdleDeadline) {
    let shouldYield = false // 是否需要让步，初始值不让步，这样能进入while循环做任务
    while (!shouldYield && nextWorkOfUnit) {
        // run task
        nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
        // 当剩余时间小于1的时候，我就让步不做任务了，跳出循环
        shouldYield = IdleDeadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function createDom(type) {
    return type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(type)
}

function updateProps(dom, props) {
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            dom[key] = props[key]
        }
    })
}

function initChildren(fiber) {
    // 3. 转换列表 设置好指针
    const children = fiber.props.children
    let prevChild = null
    children.forEach((child, index) => {
        const newFiber = {
            type: child.type,
            props: child.props,
            child: null,
            parent: fiber,
            sibling: null,
            dom: null,
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevChild.sibling = newFiber
        }
        prevChild = newFiber
    })
}

/**
 * @param {*} fiber 任务
 * @returns 返回下一个任务
 */
function performWorkOfUnit(fiber) {
    if (!fiber.dom) {
        // 1. 创建dom
        const dom = (fiber.dom = createDom(fiber.type))
        fiber.parent.dom.append(dom)
        // 2. 处理props
        updateProps(dom, fiber.props)
    }
    // 3. 转换列表 设置好指针
    initChildren(fiber)
    // 4. 返回下个任务 （先是孩子，再是兄弟，最后才是叔叔）
    if (fiber.child) {
        return fiber.child
    }

    if (fiber.sibling) {
        return fiber.sibling
    }

    return fiber.parent?.sibling
}

const React = {
    createElement,
    render,
}

export default React
