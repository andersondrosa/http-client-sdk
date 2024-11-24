# http-client-sdk

`http-client-sdk` é uma base de cliente HTTP flexível e desacoplada, projetada para construir SDKs personalizados de maneira simples e eficiente. Ele utiliza o `axios` como cliente HTTP padrão, mas sua arquitetura modular permite a fácil substituição do cliente por outra implementação, caso necessário. O pacote oferece suporte a operações HTTP comuns, como `GET`, `POST`, `PUT`, `DELETE` e `PATCH`, e inclui recursos avançados, como interceptores personalizados para manipulação de requisições e respostas.

## Características

- **Flexível e Desacoplado**: Embora utilize o `axios` por padrão, o design permite a substituição do cliente HTTP por outra implementação facilmente.
- **Interceptores Customizáveis**: Suporte para interceptores para manipulação e log de requisições e respostas, com rastreamento de `traceId` para monitoramento.
- **Métodos HTTP Comuns**: Implementação dos métodos HTTP essenciais (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`), com suporte a configurações personalizadas de cada requisição.
- **Fácil Integração**: A interface é simples e clara, permitindo fácil integração em projetos de qualquer tamanho e escalabilidade.
- **Erros Tratados**: Implementação de tratamento de erros com detalhes claros sobre falhas nas requisições.

## Instalação

Para instalar o pacote, utilize o seguinte comando:

```bash
npm install http-client-sdk
```

## Exemplo de Uso

- Aqui está um exemplo básico de como usar o **http-client-sdk**:

```typescript
import { HttpClient } from 'http-client-sdk';

const client = new HttpClient({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  headers: { 'Authorization': 'Bearer token' },
});

client.get('/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Request failed', error);
  });
```

## Configuração de Interceptor para Log de Requisições
O pacote permite configurar um interceptor para registrar todas as requisições e respostas em um serviço de monitoramento. O interceptor envia logs detalhados sobre cada requisição e resposta, incluindo cabeçalhos, status, corpo da resposta e outros dados relevantes.

```typescript
import { Interceptor } from 'http-client-sdk';

const interceptor = new Interceptor({ endpoint: 'https://logging.api/trace' });
const client = new HttpClient({ interceptor });
```

## Como Funciona
O http-client-sdk fornece uma interface simplificada (IHttpClient) com métodos como get, post, put, delete, e patch, que podem ser facilmente configurados para trabalhar com qualquer endpoint ou serviço. Ele também pode ser estendido para incluir comportamentos customizados, como interceptores para log ou modificação de cabeçalhos.

## Contribuindo
Contribuições são bem-vindas! Para contribuir, siga os passos:

1. Faça um fork deste repositório.
2. Crie uma branch para suas alterações (git checkout -b feature-xyz).
3. Faça commit das suas alterações (git commit -am 'Add new feature').
4. Envie a branch para o seu fork (git push origin feature-xyz).
5. Abra um Pull Request para revisão.

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

