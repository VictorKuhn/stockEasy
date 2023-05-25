const ptBrCurrencyFormat = {
    style: 'currency',
    currency: 'BRL'
};

Number.prototype.formatCurrency = function () {
    return this.toLocaleString('pt-BR', ptBrCurrencyFormat);
};