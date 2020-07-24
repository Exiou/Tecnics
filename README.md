# Tecnics
> A aplicação consiste em um local centralizado para a compra de peças de hardware.

Trabalho de Conclusão de Curso submetido ao corpo docente da Etec Francisco Garcia como parte dos requisitos necessários à obtenção do título de Técnico em Desenvolvimento de Sistemas.

![](/github/tecnics.png)

## Instalação

### Docker

Certifique-se de ter o **[Docker](https://www.docker.com/)** instalado em sua máquina

Execute o comando no terminal:

```sh
docker-compose up
```

Será criado um banco de dados local populado com alguns processadores e uma loja de id ```5e4c3a618241ac59f5892829```

O **frontend** pode ser acessado em ```http://localhost:3000```

### Manualmente

Defina as variáveis ambiente baseadas no ```.env.example```

```sh
cd backend
cp .env.example .env
```
Após copiar os exemplos, preencha as variáveis com novos valores.

Para rodar o backend:

```sh
cd backend
yarn install
yarn dev
```

Para rodar o frontend:

```sh
cd frontend
yarn install
yarn start
```

## Exemplos de uso

![](/github/products.gif)
![](/github/stores.gif)
![](/github/profile.gif)

[Protótipo da interface web no Figma](https://www.figma.com/proto/oKmiMntD9A37sddVLmPqwF/Web)

[Protótipo da interface mobile (ainda não desenvolvida) no Figma](https://www.figma.com/proto/bgTEUO1wYeFQQUQiZ4lcjf/Mobile)

## Contato

Twitter: https://twitter.com/exiouuu

Discord: Ëxiou#3128
