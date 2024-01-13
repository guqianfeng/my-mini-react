import React from './core/React.js';
// const App = React.createElement('div', { id: 'app' },
//     React.createElement('div', null, 'heihei'),
//     React.createElement('div', null, 'haha'),
//     React.createElement('div', null, 'hehe')
// )

const App = (
    <div id="app">
        <div>jsx-heihei</div>
        <div>jsx-haha</div>
        <div>jsx-hehe</div>
    </div>
)

console.log(App)


function AppTest () {
    return (
        <div id="test">app test</div>
    )
}
console.log(AppTest);


export default App