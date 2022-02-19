import {useState} from 'react'

const useCacheSend = (drizzle, drizzleState, contractName, methodName) => {
  const {transactions, transactionStack} = drizzleState
  const [stackIDs, setStackIDs] = useState([])
  const TXObjects = stackIDs.map(
      stackID => transactions[transactionStack[stackID] || 'undefined']
  )
  const contractMethod = drizzle.contracts[contractName].methods[methodName]
  return {
    TXObjects,
    send: (...args) =>
        setStackIDs( [...stackIDs, contractMethod.cacheSend(...args)]),
    status:
        TXObjects[TXObjects.length - 1] && TXObjects[TXObjects.length - 1].status
  }
}
export {useCacheSend}
