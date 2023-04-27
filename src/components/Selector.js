import React, { useState } from 'react'

function Selector({ result, setResult, args }) {
    const [selected, setSelected] = useState("");
    const onSelectChange = (e) => {
        switch (e.target.value) {
            case "constant": {
                setResult({ constant: false })
                break;
            }
            case "argument": {
                setResult({ argument: 0 })
                break
            }
            case "and":
            case "or": {
                if (result.operands) {
                    setResult({ ...result, operator: e.target.value })
                } else {
                    setResult({ operands: [{}, {}], operator: e.target.value })
                }
            }
        }
        setSelected(e.target.value);
    }

    const resetSelection = (e) => {
        setSelected("");
        setResult({});
    }

    const onSelectConstant = (e) => {
        setResult({ constant: e.target.value === "true" })

    }
    const onSelectArgument = (e) => {
        setResult({ argument: e.target.value })
    }

    const setSubResult = (index) => (value) => {
        const newResult = { ...result };
        newResult.operands[index] = value;
        setResult(newResult);
    }
    const addOperand = () => {
        setResult({ ...result, operands: [...result.operands, {}] })
    }

    return (
        <div>
            {
                selected === "" ?
                    <select value={selected} onChange={onSelectChange}>
                        <option value="" disabled >select...</option>
                        <option>constant</option>
                        <option>argument</option>
                        <option>and</option>
                        <option>or</option>
                    </select>
                    : selected === "constant" ?
                        <select value={result.constant} onChange={onSelectConstant} >
                            <option>false</option>
                            <option>true</option>
                        </select> : selected === "argument" ?
                            <select value={result.argument} onChange={onSelectArgument} >
                                {
                                    args.map((arg, index) => (
                                        <option key={index} value={index}>{arg.name}</option>
                                    ))
                                }
                            </select>
                            : null
            }

            {
                selected === "and" || selected === "or" ?
                    <div>
                        <select value={selected} onChange={onSelectChange}>
                            <option>and</option>
                            <option>or</option>
                        </select>
                        <button onClick={resetSelection}>X</button>
                        <div style={{ marginLeft: "20px" }}>
                            {
                                result.operands?.map((operand, index) => (
                                    <Selector key={index} result={operand} setResult={setSubResult(index)} args={args} />
                                ))
                            }
                        </div>
                        <button onClick={addOperand}>+ add op</button>
                    </div> : <button onClick={resetSelection}>X</button>}
        </div>
    )
}

export default Selector