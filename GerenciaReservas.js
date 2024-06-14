const prompt = require("prompt-sync")();

class Hotel {
  constructor(id, nome, cidade, quartosTotais, quartosDisponiveis) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this.quartosTotais = quartosTotais;
    this.quartosDisponiveis = quartosDisponiveis;
  }
}
class Reserva {
  constructor(idReserva, idHotel, nomeCliente) {
    this.idReserva = idReserva;
    this.idHotel = idHotel;
    this.nomeCliente = nomeCliente;
  }
}

function adicionarHotel() {
  const id = prompt("Digite o ID do Hotel: ");
  const nome = prompt("Digite o nome do Hotel: ");
  const cidade = prompt("Digite a cidade do Hotel: ");
  const quartosTotais = parseInt(
    prompt("Digite o número total de quartos do Hotel: ")
  );
  const quartosDisponiveis = parseInt(
    prompt("Digite o número de quartos disponíveis do Hotel: ")
  );

  const novoHotel = new Hotel(
    id,
    nome,
    cidade,
    quartosTotais,
    quartosDisponiveis
  );
  Hotel[id] = novoHotel;
}

function buscarHoteisPorCidade() {
  const cidade = prompt("Digite a cidade para buscar hotéis: ");
  const hoteisEncontrados = [];

  for (const id in Hotel) {
    if (Hotel[id].cidade === cidade) {
      hoteisEncontrados.push(Hotel[id]);
    }
  }

  console.log("Hotéis encontrados na cidade:", cidade);
  console.log(hoteisEncontrados);
}

function fazerReserva() {
  const idReserva = prompt("Digite o ID da Reserva: ");
  const idHotel = prompt("Digite o ID do Hotel: ");
  const nomeCliente = prompt("Digite o nome do cliente: ");

  if (Hotel[idHotel].quartosDisponiveis > 0) {
    const novaReserva = new Reserva(idReserva, idHotel, nomeCliente);
    Reserva[idReserva] = novaReserva;
    Hotel[idHotel].quartosDisponiveis--;
    console.log("Reserva feita com sucesso!");
  } else {
    console.log("Não há quartos disponíveis neste Hotel.");
  }
}

function cancelarReserva() {
  const idReserva = prompt("Digite o ID da Reserva a ser cancelada: ");

  if (Reserva[idReserva]) {
    const idHotel = Reserva[idReserva].idHotel;
    Hotel[idHotel].quartosDisponiveis++;
    delete Reserva[idReserva];
    console.log("Reserva cancelada com sucesso!");
  } else {
    console.log("Reserva não encontrada.");
  }
}

function listarReservas() {
  console.log("Lista de Reservas:");
  for (const id in Reserva) {
    const idHotel = Reserva[id].idHotel;
    console.log("Reserva:", id);
    console.log("Hotel:", Hotel[idHotel].nome);
    console.log("Cliente:", Reserva[id].nomeCliente);
    console.log("--------------------");
  }
}

function checkIn() {
  const idReserva = prompt("Digite o ID da sua reserva para check-in: ");
  if (Reserva[idReserva]) {
    const idHotel = Reserva[idReserva].idHotel;
    if (Hotel[idHotel].quartosDisponiveis > 0) {
      Hotel[idHotel].quartosDisponiveis--;
      console.log("Check-in realizado com sucesso!");
    } else {
      console.log("Não há quartos disponíveis neste hotel");
    }
  } else {
    console.log("Reserva não encontrada");
  }
}

function checkOut() {
  const idReserva = prompt("Digite o ID da Reserva para check-out: ");
  if (Reserva[idReserva]) {
    const idHotel = Reserva[idReserva].idHotel;
    Hotel[idHotel].quartosDisponiveis++;
    console.log("Check-out realizado com sucesso!");
  } else {
    console.log("Reserva não encontrada");
  }
}

function gerarRelatorioOcupacao() {
  const id = prompt(
    "Digite o ID do hotel para o qual você deseja gerar o relatório: "
  );
  const hotel = Hotel[id];
  if (hotel) {
    const ocupacao =
      ((hotel.quartosTotais - hotel.quartosDisponiveis) / hotel.quartosTotais) *
      100;
    console.log(
      `A ocupação do hotel ${hotel.nome} é de ${ocupacao.toFixed(2)}%`
    );
  } else {
    console.log("Hotel não encontrado");
  }
}

function avaliarHotel() {
  const id = prompt("Digite o ID do hotel que você deseja avaliar: ");
  const hotel = Hotel[id];
  if (hotel) {
    const avaliacao = prompt("Digite sua avaliação (1-5): ");
    if (avaliacao < 1 || avaliacao > 5) {
      console.log("Avaliação inválida. Deve ser um número entre 1 e 5");
    } else {
      if (!hotel.avaliacao) {
        hotel.avaliacoes = [];
      }
      hotel.avaliacoes.push(avaliacao);
      console.log(
        `Obrigado por avaliar o hotel ${hotel.nome}. Sua avaliação foi de ${avaliacao} estrelas.`
      );
    }
  } else {
    console.log("Hotel não encontrado");
  }
}

function menu() {
  console.log("=== Gerenciamento de Reservas ===");
  console.log("1. Adicionar Hotel");
  console.log("2. Buscar Hotéis por Cidade");
  console.log("3. Fazer Reserva");
  console.log("4. Cancelar Reserva");
  console.log("5. Listar Reservas");
  console.log("6. Check-in");
  console.log("7. Check-out");
  console.log("8. Gerar relatório de ocupação");
  console.log("9. Avaliar o hotel de sua estadia");
  console.log("0. Sair");

  const opcao = parseInt(prompt("Digite a opção desejada: "));

  switch (opcao) {
    case 1:
      adicionarHotel();
      break;
    case 2:
      buscarHoteisPorCidade();
      break;
    case 3:
      fazerReserva();
      break;
    case 4:
      cancelarReserva();
      break;
    case 5:
      listarReservas();
      break;
    case 6:
      checkIn();
      break;
    case 7:
      checkOut();
      break;
    case 8:
      gerarRelatorioOcupacao();
      break;
    case 9:
      avaliarHotel();
      break;
    case 0:
      console.log("Saindo...");
      return;
    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }

  menu();
}

menu();
