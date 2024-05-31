import { ReactNode, createContext, useEffect, useState } from 'react'

interface Transaction {
  id: number
  description: string
  category: string
  createdAt: Date
  price: number
  type: 'income' | 'outcome'
}

interface TransactionTextType {
  transactions: Transaction[]
}

interface TransactionProviderProps {
  children: ReactNode
}
export const TransactionContext = createContext<TransactionTextType>(
  {} as TransactionTextType,
)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTranscations] = useState<Transaction[]>([])
  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    setTranscations(data)
  }
  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
