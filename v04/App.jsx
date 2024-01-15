import React from './core/React.js';

function Counter() {
    return (
        <div>
            counter
        </div>
    )
}

function CounterContainer() {
    return (
        <Counter />
    )
}

const App = (
    <div id="app">
        <div>jsx-heihei</div>
        <div>jsx-haha</div>
        <div>jsx-hehe</div>
        <Counter />
        {/* <CounterContainer></CounterContainer> */}
    </div>
)

// function App() {
//     return (
//         <div id="app">
//             <div>jsx-heihei</div>
//             <div>jsx-haha</div>
//             <div>jsx-hehe</div>
//             <Counter />
//             {/* <CounterContainer></CounterContainer> */}
//         </div>
//     )
// }

export default App