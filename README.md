# DT Money

Projeto de aula da RocketSeat da jornada de React. Projeto [03]

Orientaçoes:

- [Figma DT Money](https://www.figma.com/community/file/1138814493269096792)

## Dependências [npm install]

- styled-components
- @types/styled-components `desenvolvimento`
- phosphor-react
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- json-server `desenvolvimento`
- react-hook-form
- @hookform/resolvers
- zod
- axios

### Links importantes
- [radix-ui](https://www.radix-ui.com/)

###Mockando a API
- isntando o Jsonserver
```
npm i json-server -D
```
- criando o arquivo .json no raiz do projeto
- rodando o json-server na porta 3333 com monitoramento com delay de 500
```
npx json-server server.json -p 3333 -w -d 500
```