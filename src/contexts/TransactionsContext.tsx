import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  category: string
  createdAt: Date
  price: number
  type: 'income' | 'outcome'
}

interface TransactionProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt?: Date
}

interface TransactionTextType {
  transactions: Transaction[]
  fetchTransactons: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionTextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactons = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: { description: query, _sort: 'createdAt', _order: 'desc' },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactons()
  }, [fetchTransactons])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactons, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
