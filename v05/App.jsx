import React from './core/React.js';

function Counter({ num }) {
    const handleClick = () => {
        console.log('click');
    }
    return (
        <div>
            counter: { num }
            <button onClick={handleClick}>click</button>
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