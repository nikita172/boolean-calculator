import React, { useState } from 'react'

function ArgumentListItem(props) {
    const onNameChange = (e) => {
        props.updateArg({ name: e.target.value })

    }
    const onValueChange = (e) => {
        props.updateArg({ value: e.target.value === "true" })

    }
    console.log(props)

    return (
        <div>
            <input type="text" value={props.name} onChange={onNameChange} />
            <select value={props.value} onChange={onValueChange}>
                <option value={false}>false</option>
                <option value={true}>true</option>
            </select>
        </div>
    )
}

export default ArgumentListItem