class CaixaDaLanchonete {
  // Defina os itens do menu junto com suas descrições, preços e extras associados
  /*O método constructor() foi usado para inicializar as propriedades da classe "CaixaDaLanchonete",
  ele define a propriedade caardápio para um objeto contendo os itens de menu com suas descrições,
  preços e extras associados*/
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0, itensExtras: [] },
      chantily: {
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
        itensExtras: ["cafe"],
      },
      suco: { descricao: "Suco Natural", valor: 6.2, itensExtras: [] },
      sanduiche: { descricao: "Sanduíche", valor: 6.5, itensExtras: [] },
      queijo: {
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
        itensExtras: ["sanduiche"],
      },
      salgado: { descricao: "Salgado", valor: 7.25, itensExtras: [] },
      combo1: {
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.5,
        itensExtras: [],
      },
      combo2: {
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.5,
        itensExtras: [],
      },
    };

    // Calcula o custo total da compra com base na forma de pagamento e itens.
    this.formasDePagamentoValidas = ["debito", "credito", "dinheiro"];
    this.descontoDinheiro = 0.05;
    this.acrescimoCredito = 0.03;
  }

  
  /**
   * A função `calcularValorDaCompra` calcula o valor total de uma compra com base no pagamento
  método e itens no carrinho, aplicando descontos ou sobretaxas dependendo do método de pagamento.
   * $Parâmetro metodoDePagamento - O parâmetro "metodoDePagamento" representa a forma de pagamento escolhida
  pelo cliente. Pode ser "dinheiro" (dinheiro) ou "credito" (cartão de crédito).
  
   *$Parâmetro itens - Um array de strings representando os itens no carrinho. Cada string na matriz
  deve estar no formato "codigo,quantidade", onde "codigo" é o código do item e "quantidade" é
  a quantidade desse item.

   *$Return uma string que representa o valor total da compra, formatada como "R$ X,XX" (onde X
  representa o valor total com duas casas decimais).
   */
  calcularValorDaCompra(metodoDePagamento, itens) {
    // Verifique se o método de pagamento fornecido é válido.
    if (!this.formasDePagamentoValidas.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    // Verifica se não há itens no carrinho.

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    //Inicializa o valor total da compra
    let valorTotal = 0;

    // Loop por cada item do carrinho
    for (const itemStr of itens) {
      // Divida a string do item em código e quantidade do item
      const [codigo, quantidade] = itemStr.split(",");

      // Verifica se a quantidade é válida.
      if (parseInt(quantidade) <= 0) {
        return "Quantidade inválida!";
      }

      // Verifica se o código do item é válid
      if (!(codigo in this.cardapio)) {
        return "Item inválido!";
      }

      // Calcula o subtotal para o item atual.
      valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);

      // Verifica se existem extras associados e valida a sua presença.
      for (const extra of this.cardapio[codigo].itensExtras) {
        if (!itens.some((item) => item.startsWith(extra))) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }
    // Aplicar descontos ou sobretaxas com base na forma de pagamento.
    if (metodoDePagamento === "dinheiro") {
      valorTotal -= valorTotal * this.descontoDinheiro;
    } else if (metodoDePagamento === "credito") {
      valorTotal += valorTotal * this.acrescimoCredito;
    }

    // Formata o valor total e retorna.
    valorTotal = valorTotal.toFixed(2);

    return `R$ ${valorTotal.replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
