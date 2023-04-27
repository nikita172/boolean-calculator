import { useState } from "react";
import ArgumentList from "./components/ArgumentList";
import Selector from "./components/Selector";
function App() {
  const [args, setArgs] = useState([{ name: "My Arg", value: false }]);
  const [result, setResult] = useState({});
  console.log(result)
  const getResult = (result) => {
    if (result.constant !== undefined) {
      return result.constant
    }
    else if (result.argument !== undefined) {
      return args[result.argument].value;
    }
    else if (result.operands !== undefined) {
      const temp = result.operands.map(getResult);
      if (result.operator === "and") {
        for (let i of temp) {
          if (!i) {
            return false;
          }

        }
        return true;
      } else {
        for (let i of temp) {
          if (i) {
            return true;
          }
        }
        return false;
      }
    }
    return false;
  }


  const getExp = (result) => {
    if (result.constant !== undefined) {
      return result.constant.toString();
    } else if (result.argument !== undefined) {
      return args[result.argument].name;
    } else if (result.operands !== undefined) {
      const temp = result.operands.map(getExp);
      if (result.operator === "and") {
        return "(" + temp.join(" && ") + ")";
      } else {
        return "(" + temp.join(" || ") + ")";
      }
    }
    return "undefined";
  };
  return (

    <div >
      <ArgumentList args={args} setArgs={setArgs} /> <br />
      <Selector result={result} setResult={setResult} args={args} setArgs={setArgs} /><br />
      <div>result : {getResult(result).toString()}</div>
      <pre>expression : {getExp(result)}</pre>

    </div>
  );
}

export default App;
