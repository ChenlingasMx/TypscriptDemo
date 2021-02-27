import React from 'react'

const ReactContext = React.createContext()
const Father = () => {
  return (
    <ReactContext.Provider value={'我是儿子'}>
      <div>我是爸爸</div>
      <Son />
    </ReactContext.Provider>
  )
}

const Son = () =>{
  return (
    <ReactContext.Consumer>
      {val=><div>{val&&val}</div>}
    </ReactContext.Consumer>
  )
}