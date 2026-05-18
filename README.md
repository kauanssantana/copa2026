# 🏆⚽ Central do Regulamento — FIFA 2026™

> O painel interativo e definitivo para acompanhar grupos, jogos, estatísticas e regras da Copa do Mundo FIFA 2026!

![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📖 Sobre o Projeto

A **Central do Regulamento** é uma aplicação web Single Page Application (SPA) desenvolvida para servir como um *dashboard* informativo e interativo sobre a Copa do Mundo FIFA 2026™ (sediada no Canadá, México e EUA). 

O sistema foi construído puramente com tecnologias nativas de Front-end (Vanilla JS), garantindo alta performance e carregamento instantâneo. A interface apresenta um design imersivo em *Dark Mode* e com tipografia moderna baseados na identidade visual oficial da competição e um layout 100% responsivo (Mobile-First).

<img width="1600" height="806" alt="9357f6d8-15e7-466d-a895-bb0b096467be" src="https://github.com/user-attachments/assets/7d75438a-c208-4455-bf38-00bdcefdf373" />


<img width="1600" height="806" alt="432d3f00-1e7a-43f6-8915-eb1b00d04d21" src="https://github.com/user-attachments/assets/80befd2c-83d0-4b03-8540-dbe0354fcb27" />

---

## ✨ Principais Funcionalidades

* ⏳ **Contagem Regressiva em Tempo Real:** Um cronômetro dinâmico exibindo os dias, horas, minutos e segundos exatos até a partida de abertura no dia 11 de junho de 2026.
* 📊 **Simulador de Classificação:** Insira placares fictícios nos jogos da fase de grupos e veja a tabela de classificação (Pontos, Saldo de Gols, Gols Pró) sendo recalculada e reordenada instantaneamente pelo JavaScript. Navegue entre os grupos (A a L) com botões dinâmicos.
* 🔎 **Filtros Avançados de Jogos:** Pesquise entre as 104 partidas oficiais utilizando menus suspensos cruzados. Encontre exatamente quando e onde a sua seleção vai jogar (ex: *Ver todos os jogos do Brasil em Miami*).
* 📜 **Regulamento com Busca Dinâmica:** Um acordeão interativo contendo os principais artigos da FIFA (Cartões, Pênaltis, Desistências). Inclui uma barra de pesquisa em tempo real que filtra e expande apenas os artigos relevantes.
* 🌐 **Renderização de Dados Modular:** Toda a estrutura de jogos, datas, cidades-sede e bandeiras é gerada dinamicamente via arrays e objetos JavaScript, facilitando a manutenção e futuras atualizações de placares.

---

## 💻 Tecnologias Utilizadas

O projeto foca em otimização extrema e componentização visual sem a necessidade de frameworks externos ou back-end complexo.

**Front-end:**
* **HTML5:** Estruturação semântica, acessibilidade e organização de dados.
* **CSS3:** Variáveis nativas (`:root`), Flexbox, CSS Grid, Media Queries avançadas, transições suaves e animações de interface (como o *bgFloat* do cabeçalho).
* **JavaScript (ES6+):** Manipulação de DOM em tempo real, filtragem de arrays, cálculos matemáticos dinâmicos para o simulador e manipulação do objeto genérico de bandeiras (padrão FIFA/COI).

---

## 🚀 Como Executar o Projeto

Como a aplicação é 100% Front-end e não requer comunicação com banco de dados ou servidores, a execução é extremamente simples:

1. Faça o clone deste repositório:
   ```bash
   git clone [https://github.com/kauanssantana/central-fifa-2026.git](https://github.com/kauanssantana/central-fifa-2026.git)

2. Acesse a pasta do projeto:
   ```bash
   cd central-fifa-2026

3. Abra o arquivo index.html em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari).
   Opcional: Para uma melhor experiência de desenvolvimento, você pode abrir com o Live Server do VS Code.

---

## 🛡️ Licença & Copyright

Copyright (c) 2026 Kauan Santana Almeida. Todos os direitos reservados.

A cópia, distribuição, modificação ou uso comercial deste código, seja parcial ou integral, é estritamente proibida sem a autorização prévia e expressa do autor. O uso não autorizado deste software está sujeito às penalidades previstas na lei de direitos autorais.
