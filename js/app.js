/**
 * Variavel Global
 */
let lastCardCliked = '';
let idLastCardClicked = '';
let cardsShow = 0;


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
 * Verifica se a dupla de cartas são iguais.
 * Se for igual muda a cor para verde e deixa as cartas para cima.
 * Se não for igual vira a carta para baixo.
 * Se virou duas cartas e não são iguais vira a dupla para baixo.
 */
function compareCoupleCards(idCard, cardClicked) {
    cardsShow++;
    if (cardsShow <= 1) {
        idLastCardClicked = idCard;
        lastCardCliked = cardClicked;
        console.log('cliquei a primeira vez', lastCardCliked);
    } else {
        if (lastCardCliked === cardClicked) {
            $(`#${idCard}`).addClass('match');
            $(`#${idLastCardClicked}`).addClass('match');

            console.log('é igual');
        } else {
            setTimeout(function () {
                console.log('entrei no setimeout');
                $(`#${idCard}`).removeClass('open');
                $(`#${idLastCardClicked}`).removeClass('open');
                lastCardCliked = '';
                idLastCardClicked = '';
                cardsShow = 0;
            }, 2000);
            console.log('nao é igual');
        }
    }
}

/**
 * Mostra a carta e compara se é igual
 */
$('.card').click(function (evt) {
    const id = $(this).attr('id');
    $(`#${id}`).addClass('open');
    const iconClicked = $(`#${id}`).children().attr('class');
    compareCoupleCards(id, iconClicked);
});

/**
 * Inicia o Jogo embaralhando as cartas
 */
$(function () {
    addClassOrder();
});

