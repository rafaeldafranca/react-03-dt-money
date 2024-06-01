import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

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
  fetchTransactons: (query?: string) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}
export const TransactionContext = createContext({} as TransactionTextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTranscations] = useState<Transaction[]>([])

  async function fetchTransactons(query?: string) {
    const response = await api.get('transactions', {
      params: { description: query },
    })

    setTranscations(response.data)
  }

  useEffect(() => {
    fetchTransactons()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactons }}>
      {children}
    </TransactionContext.Provider>
  )
}
