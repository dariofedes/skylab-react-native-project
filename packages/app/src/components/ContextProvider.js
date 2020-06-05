import React, { useState } from 'react'

const Context = React.createContext([{}, () => { }])

function Provider({ children, language }) {
    const [state, setState] = useState({ language })

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export  { Context, Provider }