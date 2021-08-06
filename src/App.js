import './App.css';
import {useState} from "react";
import Tree from "./components/Tree";

const tree = require('./treeData.json')

function App() {
  const [jsonData, setJsonData] = useState(tree.data)
  const [hide, setHide] = useState(true)
  console.log(jsonData)
  const callback = (status) => {
    setHide(status);
  }
  return (
    <div className="App">
      {jsonData.map((el, index) => <Tree key={index} hide={hide} parentCallback={callback} level={0} data={el} />)}
    </div>
  );
}

export default App;
