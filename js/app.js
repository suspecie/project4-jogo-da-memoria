/**
 * Embaralha o array
 * Método utilizado do http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Conta quantos cards tem na tela e retorna um array de 0 até a quantidade.
 */
function countCards() {
    let arrayCards = [];
    $('.card').each(function (item) {
        arrayCards.push(item);
    });

    return arrayCards;
}

/**
 * Adiciona a classe order embaralhada em cada card.
 */
function addClassOrder() {
    const arrayCards = countCards();
    const arrayShuffle = shuffle(arrayCards);

    arrayShuffle.forEach((el, index) => {
        $(`#card-${index}`).addClass(`order-${el}`);
    });
}


/**
 * Inicia o Jogo embaralhando as cartas
 */
$(function () {
    addClassOrder();
});
