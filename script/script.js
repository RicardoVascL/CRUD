// Array para armazenar os usuários temporariamente (simulando um banco de dados)
let usuarios = [];
let usuarioSelecionado = null;
let idContador = 1; // Contador para gerar IDs únicos

// Referências aos elementos do DOM
const nomeInput = document.getElementById("nome");
const numtelInput = document.getElementById("numtel"); // Correção do nome da variável
const dataNascimentoInput = document.getElementById("dataNascimento");
const salarioInput = document.getElementById("salario");
const tabelaBody = document.getElementById("pessoasBody");
const inputPesquisa = document.getElementById("inputPesquisa");


function adicionarUsuario() {
  const nome = nomeInput.value;
  const numtel = document.getElementById("numtel").value; // Obtém o valor do campo de telefone
  const dataNascimento = dataNascimentoInput.value;
  const salario = salarioInput.value;
  const regexNome = /^[A-Za-z\s]+$/; // Expressão regular para permitir letras e espaços

  // Validação do campo de nome
  if (!regexNome.test(nome)) {
      alert("Por favor, preencha o campo Nome com letras e espaços apenas.");
      return;
  }

  // Validação do campo de telefone
  const regexNumtel = /^\d{8,13}$/;
  if (!regexNumtel.test(numtel)) {
      alert("Número de telefone inválido. Insira apenas dígitos numéricos e o número deve conter de 8 a 15 caracteres.");
      return;
  }

  if (nome && numtel && dataNascimento && salario) {
      const novoUsuario = {
          chave: idContador++,
          nome: nome,
          numtel: numtel, // Adiciona o telefone ao objeto do usuário
          dataNascimento: dataNascimento,
          salario: salario,
      };

      usuarios.push(novoUsuario);
      atualizarTabela();
      limparCampos();
  } else {
      alert("Por favor, preencha todos os campos antes de adicionar um usuário.");
  }
}

// Função para atualizar a tabela com os usuários
function atualizarTabela() {
  tabelaBody.innerHTML = "";

  usuarios.forEach((usuario) => {
    const newRow = tabelaBody.insertRow();
    newRow.innerHTML = `
      <td>${usuario.numtel}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.dataNascimento}</td>
      <td>${usuario.salario}</td>
      <td>
        <button data-id="${usuario.chave}" class="btnEditar" onclick="editarUsuario(event)">Editar</button>
        <button data-id="${usuario.chave}" class="btnExcluir" onclick="excluirUsuario(event)">Excluir</button>
      </td>
    `;
  });
}

// Função para limpar os campos do formulário após adicionar um usuário
function limparCampos() {
  nomeInput.value = "";
  numtelInput.value = ""; // Correção do nome da variável
  dataNascimentoInput.value = "";
  salarioInput.value = "";
}

function pesquisarUsuario() {
  const searchTerm = inputPesquisa.value.toLowerCase();

  if (searchTerm.trim() === "") {
    // Se o campo de pesquisa estiver vazio, mostra todos os registros
    atualizarTabela();
  } else {
    // Caso contrário, faz a pesquisa normalmente
    const resultados = usuarios.filter((usuario) => {
      const nomeLowerCase = usuario.nome.toLowerCase();
      const chaveLowerCase = usuario.chave.toString().toLowerCase();

      return nomeLowerCase.includes(searchTerm) || chaveLowerCase.includes(searchTerm);
    });

    atualizarTabelaComResultados(resultados);
  }
}

// Função para atualizar a tabela com os resultados da pesquisa
function atualizarTabelaComResultados(resultados) {
  tabelaBody.innerHTML = "";

  resultados.forEach((usuario) => {
    const newRow = tabelaBody.insertRow();
    newRow.innerHTML = `
      <td>${usuario.chave}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.dataNascimento}</td>
      <td>${usuario.salario}</td>
      <td>
        <button data-id="${usuario.chave}" class="btnEditar" onclick="editarUsuario(event)">Editar</button>
        <button data-id="${usuario.chave}" class="btnExcluir" onclick="excluirUsuario(event)">Excluir</button>
      </td>
    `;
  });
}

// Função para excluir um usuário
function excluirUsuario(event) {
  const chave = parseInt(event.target.dataset.id);
  usuarios = usuarios.filter((usuario) => usuario.chave !== chave);
  atualizarTabela();
}

// Função para selecionar um usuário para edição
function editarUsuario(event) {
  const chave = parseInt(event.target.dataset.id);
  usuarioSelecionado = usuarios.find((usuario) => usuario.chave === chave);

  if (usuarioSelecionado) {
    // Preencher os campos do formulário com os dados do usuário selecionado
    nomeInput.value = usuarioSelecionado.nome;
    numtelInput.value = usuarioSelecionado.numtel;
    dataNascimentoInput.value = usuarioSelecionado.dataNascimento;
    salarioInput.value = usuarioSelecionado.salario;
  } else {
    alert("Usuário não encontrado.");
  }
}

// Função para atualizar o usuário selecionado
function atualizarUsuario() {
  if (usuarioSelecionado) {
    const nome = nomeInput.value;
    const numtel = parseInt(numtelInput.value);
    const dataNascimento = dataNascimentoInput.value;
    const salario = salarioInput.value;

    if (nome && numtel && dataNascimento && salario) {
      // Atualiza os dados do usuário selecionado
      usuarioSelecionado.nome = nome;
      usuarioSelecionado.numtel = numtel;
      usuarioSelecionado.dataNascimento = dataNascimento;
      usuarioSelecionado.salario = salario;

      // Atualiza a tabela e limpa os campos do formulário
      atualizarTabela();
      limparCampos();
    } else {
      alert("Por favor, preencha todos os campos antes de atualizar o usuário.");
    }
  } else {
    alert("Nenhum usuário selecionado para atualizar.");
  }
}

document.getElementById("pesquisa").addEventListener("submit", function (event) {
  event.preventDefault();
  pesquisarUsuario();
});

function validarNome(event) {
  const input = event.target;
  const newValue = input.value.replace(/[0-9]/g, '');
  input.value = newValue;
}

// Inicializa a tabela com os usuários
atualizarTabela();
