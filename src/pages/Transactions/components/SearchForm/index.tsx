import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { memo } from 'react'

/**
 * Por que um componente renderiza ?
 * - Hooks changed (mudou o estado, contexto, reducer)
 * - Props changed ( mudou propriedades)
 * - Parent rerendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização ?
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versão HTML recriada com a versão anterior
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo: (APENAS PARA INTERFACES COMPLEXAS )
 * 0. hooks changed, Props changed (deep comparison)
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: SE mudou algo, ele vai permitir a nova renderizacao
 **/

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

// export function SearchFormComponent() { /** usado pra exportar como memo */
export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

// export const SearchForm = memo(SearchFormComponent)
