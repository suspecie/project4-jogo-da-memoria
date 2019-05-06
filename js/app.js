/**
 * Variavel Global
 */
let countClick = 0;
let lastCardClicked = '';
let lastIconDisplayed = '';


/**
 * Embaralha o array.
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
 * Adiciona a classe order no array embaralhado.
 */
function addClassOrder() {
    const arrayCards = countCards();
    const arrayShuffle = shuffle(arrayCards);

    arrayShuffle.forEach((el, index) => {
        $(`#card-${index}`).addClass(`order-${el}`);
    });
}


/**
 * Mostra a carta.
 */
function showCard(id) {
    $(`#${id}`).addClass('open');
    $(`#${id}`).removeClass('closed');
    return $(`#${id}`).children().attr('class');
}

/**
 * Fecha a carta
 */
function closedCard(id) {
    $(`#${id}`).addClass('closed');
    $(`#${id}`).removeClass('open');
}

/**
 * Verifica se é a primeira carta do par a ser mostrada.
 */
function isFirstCardOfPair() {
    countClick++;
    console.log('countClick', countClick);
    return countClick === 1 ? true : false;
}

/**
 * Desabilita o clique de uma carta aberta.
 * @param {*} id 
 */
function disabledClick(id) {
    $(`#${id}`).addClass('disabled-click');
}

/**
 * Desabilita o clique de todas as cartas fechadas.
 */
function disabledAllClick() {
    $('.closed').addClass('disabled-click')
}

/**
 * Verifica se o par é igual ou não
 */
function isMatchPair(currentIconDisplayed) {
    return currentIconDisplayed === lastIconDisplayed ? true : false;
}

/**
 * Marca as cartas iguais
 */
function addMatchClass(currentCard) {
    $(`#${currentCard}`).addClass('match');
    $(`#${lastCardClicked}`).addClass('match');
}

/**
 * Marca as cartas que não são iguais
 */
function addWrongClass(currentCard) {
    $(`#${currentCard}`).addClass('wrong');
    $(`#${lastCardClicked}`).addClass('wrong');
}

/**
 * Vira as cartas erradas.
 */
function turnWrongCards(currentCard) {
    closedCard(currentCard);
    closedCard(lastCardClicked);
}

/**
 * Reinica as variaveis.
 */
function reset() {
    countClick = 0;
    lastCardClicked = '';
    lastIconDisplayed = '';
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
 * Inicia o Jogo embaralhando as cartas.
 */
$(function () {
    addClassOrder();
});

/**
 * Chama as regras ao clicar nas cartas.
 */
$('.card').click(function () {
    const id = $(this).attr('id');
    const iconDisplayed = showCard(id);
    if(isFirstCardOfPair()){
        console.warn('primeiro click', id, iconDisplayed);
        lastCardClicked = id;
        lastIconDisplayed = iconDisplayed;
        disabledClick(id);
    } else {
        console.warn('segundo click', id, iconDisplayed);
        disabledClick(id);
        disabledAllClick();
        if (isMatchPair(iconDisplayed)) {
            console.log('is match!!');
            addMatchClass(id);
        } else {
            console.log('not match.');
            addWrongClass(id);
            setTimeout(function() {
                turnWrongCards(id);
            });
        }
    }
});