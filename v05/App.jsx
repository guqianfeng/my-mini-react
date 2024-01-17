import React from './core/React.js';

function Counter({ num }) {
    return (
        <div>
            counter: { num }
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
            <Counter num={ 20 }></Counter>
        </div>
    )
}

export default App