import React from 'react';
import './App.css';
import './bootstrap.css';
/*import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import Counter from './components/counter/Counter';*/
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className="App">
      {/*<Counter></Counter>*/}
      <TodoApp/>
    </div>
  );
}

/*class LearningComponents extends Component {
  render() {
    return (
      <div className="App">
        My Hello World!
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
      </div>
    );
  }
}*/

export default App;
