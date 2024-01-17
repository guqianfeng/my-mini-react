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
            children: children.map(child => {
                const isTextNode = typeof child === 'string' || typeof child === 'number'
                return isTextNode ? createTextNode(child) : child
            })
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
    root = nextWorkOfUnit
}

let currentRoot = null
let root = null
let nextWorkOfUnit = null
function workLoop(IdleDeadline) {
    let shouldYield = false // 是否需要让步，初始值不让步，这样能进入while循环做任务
    while (!shouldYield && nextWorkOfUnit) {
        // run task
        nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
        // 当剩余时间小于1的时候，我就让步不做任务了，跳出循环
        shouldYield = IdleDeadline.timeRemaining() < 1
    }

    if (!nextWorkOfUnit && root) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function commitRoot () {
    commitWork(root.child)
    commitRoot = root
    root = null
}

function commitWork (fiber) {
    if (!fiber) return
    let fiberParent = fiber.parent
    while (!fiberParent.dom) {
        fiberParent = fiberParent.parent
    }
    if (fiber.effectTag === 'update') {
        updateProps()
    } else if(fiber.effectTag === 'placement') {
        if (fiber.dom) {
            fiberParent.dom.append(fiber.dom)
        }
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function createDom(type) {
    return type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(type)
}

function updateProps(dom, props) {
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            if (key.startsWith('on')) {
                const eventType = key.slice(2).toLowerCase()
                dom.addEventListener(eventType, props[key])
            } else {
                dom[key] = props[key]
            }
        }
    })
}

function initChildren(fiber, children) {
    let oldFiber = fiber.alternate?.child
    // console.log(fiber);
    // 3. 转换列表 设置好指针
    let prevChild = null
    children.forEach((child, index) => {
        const isSameType = oldFiber && oldFiber.type === child.type
        let newFiber
        if (isSameType) {
            // update
            newFiber = {
                type: child.type,
                props: child.props,
                child: null,
                parent: fiber,
                sibling: null,
                dom: oldFiber.dom, // 更新不会创建新的dom
                effectTag: 'update', // 区分更新还是创建
                alternate: oldFiber
            }
        } else {
            // create
            newFiber = {
                type: child.type,
                props: child.props,
                child: null,
                parent: fiber,
                sibling: null,
                dom: null,
                effectTag: 'placement' // 区分更新还是创建
            }
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling // 多个孩子情况：更新oldFiber为他的兄弟节点
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevChild.sibling = newFiber
        }
        prevChild = newFiber
    })
}

function updateFunctionComponent (fiber) {
    const children = [fiber.type(fiber.props)]
    initChildren(fiber, children)
}

function updateHostComponent (fiber) {
    if (!fiber.dom) {
        // 1. 创建dom
        const dom = (fiber.dom = createDom(fiber.type))
        // fiber.parent.dom.append(dom)
        // 2. 处理props
        updateProps(dom, fiber.props)
    }
    const children = fiber.props.children
    initChildren(fiber, children)
}

/**
 * @param {*} fiber 任务
 * @returns 返回下一个任务
 */
function performWorkOfUnit(fiber) {
    // 判断是否是函数式组件
    const isFunctionComponent = (typeof fiber.type === 'function')
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    // 4. 返回下个任务 （先是孩子，再是兄弟，最后才是叔叔）
    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while(nextFiber) {
        if(nextFiber.sibling) return nextFiber.sibling
        nextFiber = nextFiber.parent
    }
}

function update() {
    nextWorkOfUnit = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot
    }
    root = nextWorkOfUnit
}

const React = {
    createElement,
    render,
    update
}

export default React
