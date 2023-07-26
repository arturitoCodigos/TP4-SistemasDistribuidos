
# TP4 de Sistemas Distribuídos - K8s

Este repositório contém código e informações referentes ao Trabalho Prático IV da matéria de Sistemas Distribuídos (BCC-362), ministrada pelo professor C. Fred na Universidade Federal de Ouro Preto (UFOP).


## Autores

- Arthur Negrão
- Igor Machado


## Sobre a aplicação

A aplicação construída consiste em um **servidor web que realiza consultas em um banco de dados.** Sua temática é um banco de dados de uma empresa que armazena seus funcionários, sendo cada funcionário constituído por 3 campos:

- **nome: String**
- **idade: Inteiro**
- **salario: Float**

#### Retorna todos os usuários

```http
  GET /
```

#### Insere um usuário no banco

```http
  POST /dados
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | **Obrigatório**. Nome do usuário a ser inserido |
| `idade`      | `int` | **Obrigatório**. Idade do usuário a ser inserido |
| `salario`      | `float` | **Obrigatório**. Salário do usuário a ser inserido |

#### Pesquisa por um usuário baseado em seu nome
```http
  GET /<nome>
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | **Parâmetro de rota.** **Obrigatório**. Nome do usuário a ser pesquisado |

Observe que esta é uma aplicação muito simples sem real valor de uso, já que o enfoque do trabalho é sobre a **infraestrutura kubernetes**.




### Stack utilizada

**Back-end:** Node, Express

**Banco de dados:** PostgreSQL


## Infraestrutura Kubernetes

Inicialmente é necessário instalar um controlador kubernetes em sua máquina. Algumas opções são:

- [Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)
- [K3s](https://k3s.io)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Para este trabalho, utilizaremos o **Docker Desktop**. Neste ambiente, basta ir na seção ***'Configurações'***, ***'Kubernetes'***, e então ***'Enable Kubernetes'***. Depois disso basta clicar em ***'Apply & restart'***.

### Gerando imagens docker

Antes de construir o cluster K8s é necessário **gerar as imagens docker através dos dockerfiles.** Para tal:

Em /TP4-APP, rode
```bash
  npm install 
  docker build -t aplicacao-web-server:1.0 .
```

Em /TP4-BD, rode
```bash
  docker build -t banco-postgres .
```

### Deploy do cluster

O deploy do cluster é extremamente simples:

Em /TP4-KUBERNETES, rode
```bash
  kubectl apply -f application.yaml
```

e então, rode
```bash
  kubectl expose deployment web-server-app-deployment --type=LoadBalancer --port=3000
```
Este comando é responsável por **expor seu webserver** a rede externa do cluster, permitindo acesso web.



## Rodando os testes

Para rodar os testes, no diretório base do repositório, rode o seguinte comando:

```bash
  python tests.py
```

Se alguma requisição falhar, uma mensagem será printada no console. Se não houver nenhum problema com sua rede local, não espera-se nenhuma falha.


## Acessando os logs dos pods
É interessante observar os logs gerados pelos pods de seu cluster, principalmente para observar o *load-balancing* em ação. Para tal, os seguintes comandos são úteis:

```bash
  kubectl get pods
```
Este comando retornará informações sobre **todos os pods** em seu cluster.

Para acessar os logs de um desses pods, basta pegar um dos nomes obtidos através do comando acima e utilizar:
```bash
  kubectl logs 'nome_do_pod'
```

## Desligando o cluster
O K8s é realmente tolerante a falhas. Tente desligar container por container (e falhe como nós falhamos).

Para desligar, dentro do Docker Desktop, volte a aba onde você ligou o Kubernetes. Neste local você pode **desmarcar a caixinha de *enable kubernetes*.**

Se quiser apagar o cluster, clique antes no botão vermelho ***Reset Kubernetes Cluster*.**