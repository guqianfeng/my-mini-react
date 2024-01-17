import React from './core/React.js';

let testNum = 10
let props = {id: 'test'}
function Counter({ num }) {
    const handleClick = () => {
        // console.log('click');
        testNum++
        props = {}
        React.update()
    }
    return (
        <div {...props}>
            counter: { num }
            <button onClick={handleClick}>click</button>
            testNum: { testNum }
        </div>
    )
}



function App() {
    return (
        <div id="app">
            <div>jsx-heihei</div>
            <div>jsx-haha</div>
            <div>jsx-hehe</div>
            <Counter num={ 10 }></Counter>
        </div>
    )
}

export default App