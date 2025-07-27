const form = document.getElementById("conversor-form");
const inputValor = document.getElementById("valor-brl");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  resultado.style.display = "block";

  const valorBRL = parseFloat(inputValor.value);
  if (isNaN(valorBRL) || valorBRL <= 0) {
    resultado.textContent = "Por favor, insira um valor válido.";
    return;
  }

  try {
    const resposta = await fetch(
      "https://economia.awesomeapi.com.br/json/last/BRL-USD"
    );
    if (!resposta.ok) {
      throw new Error("Erro ao buscar cotação");
    }

    const dados = await resposta.json();
    const cotacao = parseFloat(dados.BRLUSD.bid);
    const valorUSD = valorBRL * cotacao;

    resultado.textContent = `R$ ${valorBRL.toFixed(2)} = $${valorUSD.toFixed(
      2
    )} USD`;
  } catch (erro) {
    resultado.textContent =
      "Erro ao buscar cotação. Tente novamente mais tarde.";
    console.error(erro);
  }
});
