import React, { useState } from 'react'
import ArgumentListItem from './ArgumentListItem'

export default function ArgumentList({ args, setArgs }) {

    const updateArg = (index) => (updatedArg) => {
        setArgs((args) => {
            const newArgs = [...args];
            newArgs[index] = { ...newArgs[index], ...updatedArg }
            return newArgs;
        })
    }
    const addArg = () => {
        setArgs((args) => {
            const newArgs = [...args];
            newArgs.push({ name: "My Arg " + (newArgs.length + 1), value: false });
            return newArgs;
        })
    }

    return (
        <div>
            {
                args.map((arg, index) => (
                    <ArgumentListItem key={index} {...arg} updateArg={updateArg(index)} />
                ))
            }
            <button onClick={addArg}>+ add args</button>
        </div>
    )
}
