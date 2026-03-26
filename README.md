# Desafio Técnico QA Sênior - Mouts IT 💻

Este repositório contém a solução para o desafio técnico de automação de testes (Frontend e API) proposto pela Mouts IT. O projeto foi desenvolvido utilizando **Cypress** e **JavaScript**, com foco em boas práticas de engenharia de software, escalabilidade e manutenibilidade.

A aplicação alvo dos testes é o [ServeRest](https://serverest.dev/), um ambiente construído especificamente para a prática de testes de software.

## 🏗️ Arquitetura e Padrões de Projeto Aplicados

Para demonstrar senioridade e garantir a qualidade do código, os seguintes padrões foram adotados:

* **Page Object Model (POM):** Separação dos elementos da interface (seletores `data-testid`) da lógica de testes no Frontend, facilitando a manutenção.
* **Custom Commands:** Criação de comandos customizados globais (ex: `cy.apiLogin()`) para reaproveitamento de código e otimização de requisições API.
* **Massa de Dados Dinâmica:** Geração de identificadores únicos (via `Date.now()`) para garantir que os testes possam rodar paralelamente ou repetidas vezes sem conflitos no banco de dados.
* **Setup e Teardown via API:** Criação e exclusão de massa de dados via rotas de API nos hooks `before` e `after`, garantindo que os testes de E2E sejam focados apenas na jornada do usuário e não deixem "sujeira" no ambiente (*flakiness* mitigation).
* **Validação de Contrato (API):** Testes de integração não validam apenas o *status code*, mas também a tipagem, estrutura e chaves do JSON retornado.

## 📂 Estrutura do Projeto

A organização de pastas foi pensada para separar claramente as responsabilidades:

```text
📦 mouts-qa-challenge
 ┣ 📂 .github
 ┃ ┗ 📂 workflows
 ┃   ┗ 📜 cypress.yml      # Pipeline de CI/CD (GitHub Actions)
 ┣ 📂 cypress
 ┃ ┣ 📂 e2e
 ┃ ┃ ┣ 📂 api             # Cenários de teste de integração (API)
 ┃ ┃ ┗ 📂 frontend        # Cenários de teste de interface (E2E)
 ┃ ┣ 📂 support
 ┃ ┃ ┣ 📂 pages           # Classes do padrão Page Objects
 ┃ ┃ ┣ 📜 commands.js     # Comandos customizados Cypress
 ┃ ┃ ┗ 📜 e2e.js          # Configurações de setup do E2E
 ┣ 📜 .gitignore           # Arquivos e pastas ignorados pelo Git (incluindo reports)
 ┣ 📜 cypress.config.js    # Configurações globais, URLs e de relatórios
 ┣ 📜 package.json         # Dependências do projeto
 ┗ 📜 README.md            # Documentação do projeto
 ```

## ⚙️ Pré-requisitos

[cite_start]Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
* [Git](https://git-scm.com/)

## 🚀 Instalação

1. Clone este repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>

2. Acesse a pasta do Projeto:
    ```bash
   cd <NOME_DA_PASTA>

3. Instale as dependências de desenvolvimento:
    ```bash
   npm install

## Como Executar os Testes 🏃‍♂️

A suíte de testes pode ser executada de duas maneiras:

1. Ideal para visualizar os testes rodando passo a passo no navegador durante o desenvolvimento.:
   ```bash
   npx cypress open

2. Ideal para esteiras de CI/CD. Este comando executa os testes em background e gera o relatório HTML automaticamente.
    ```bash
   npx cypress run

## 📊 Relatórios de Execução

Este projeto utiliza o plugin `cypress-mochawesome-reporter`. Ao executar os testes no modo *headless* (`npx cypress run`), um relatório detalhado e visual em formato HTML será gerado automaticamente.

Para visualizar, navegue até a pasta gerada localmente e abra o arquivo no navegador:
`cypress/reports/html/index.html`

*(Nota: A pasta de relatórios está incluída no `.gitignore` por ser um artefato gerado dinamicamente, mantendo o repositório limpo).*

## 🔄 Integração Contínua (CI/CD)

O projeto conta com um workflow configurado no **GitHub Actions**. A cada novo `push` ou `Pull Request` na branch principal, a esteira de testes é acionada automaticamente em um ambiente Ubuntu, garantindo a integridade contínua do código antes de qualquer integração.

---
*Desenvolvido por Lucas - QA Engineer.*