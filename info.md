vaga-frontend
Vaga de front-end/mobile na 2SOW
O desafio para a vaga é um sistema de cadastro de usuários
Esse sistema deverá conter

Uma tela de login, que redirecionará para a listagem

Uma tela com um formulário para inserir/editar um usuário

Uma tela de listagem dos usuários

Um topbar/navbar que estará fixo nas telas acima, com um nome bem criativo para seu sistema e dois botões de navegação, um para cada tela acima citada. Também deverá ter uma forma de logout, jogando o usuário pra tela de login

O formulário deverá ser responsivo

O formulário e a listagem deverão ser acessadas apenas por usuários autenticados na tela de login

Especificações técnicas
Deve ser feito com React

react-router

Algum toast/notification

Se quiser usar uma lib de UI components, dê preferencia para o SemanticUI

*styled-components

*typescript

*testes unitários

*hooks

Os itens marcados com um asterísco são um extra - não são obrigatórios, mas seria bacana se você usasse :)

Sobre a API
Para emular uma API REST completa (CRUD) no backend, você deverá usar o json-server

yarn global add json-server

Se quiser instalar local no projeto e rodar o servidor via npm scripts, fique a vontade

Rodando o json-server na raíz do projeto, ele criará um arquivo db.json

Apague o conteúdo do arquivo e cole o seguinte lá:

  {
    "usuarios": []
  }
O endpoint que você fará o GET, POST, PUT e DELETE será: http://localhost:5000/usuarios

Para rodar o servidor, use o comando:

json-server --watch db.json --delay 2000 --port 5000

O delay é pra dar aquela esperada, como acontece normalmente com uma API de verdade :)

Não é necessário (nem recomendado) criar um backend, pois a vaga é 100% frontend

Sobre a tela de login
Deverá ter um campo email e um campo de senha

As únicas validações serão

Email em formato válido
Senha maior que 4 caracteres
Após o submit, deverá guardar um token no local-storage

Sobre o formulário
Deverá conter um campo para cada um dos itens abaixo:

Nome, CPF, Email, CEP, Rua, Número, Bairro e Cidade
O objeto de envio para a API deverá ser nessa estrutura JSON:

  {
      nome: 'foo bar',
      cpf: '213.123.123-45',
      email: 'foo_bar@email.com',
      endereco: {
          cep: 13454000,
          rua: 'rua talvez',
          numero: 785,
          bairro: 'bairro azul',
          cidade: 'cidade eterna',
      }
  }
Observações
Todos os campos são obrigatórios
O formato do email deverá ser validado
Os campos de CEP deverão ser Inputs com máscaras
Deverá haver uma integração com o ViaCEP para preenchimento dos campos de endereço
Sobre a listagem
Deverá ser uma tabela com uma coluna pra nome, CPF, email e cidade

Deverá conter um botão para excluir o registro e um para editar

Deverá permitir fazer uma busca por nome: https://github.com/typicode/json-server#full-text-search

Não precisa ser responsiva

Extras:

Paginação / Carregar mais / Infinite loading

Sort https://github.com/typicode/json-server#sort

Sobre os testes
Seria fantástico se você escrevesse testes automatizados para essa aplicação. Há um tempo começamos a criar essa cultura também no front-end

Aqui usamos o @testing-library/react, @testing-library/jest-dom, jest e nock

Essa parte é realmente importante para ir pra próxima etapa

Considerações finais
Prezamos muito pela usabilidade do sistema, então onde você achar que cabe uma facilidade para o uso do sistema, manda bala!

Por exemplo: Após colocar o CEP e preencher todos os campos de endereço, mude o foco do cursor para o campo de número, para que o usuário não precise tirar a mão do teclado :)
