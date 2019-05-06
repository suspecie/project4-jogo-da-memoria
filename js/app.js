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
 * Remove todas as classes order
 */
function removeAllClassOrder(arrayCards) {
    arrayCards.forEach((el, index) => {
        $(`#card-${index}`).removeClass(`order-${el}`);
    });
}

/**
 * Adiciona a classe order no array embaralhado.
 */
function addClassOrder() {
    const arrayCards = countCards();
    const arrayShuffle = shuffle(arrayCards);
    removeAllClassOrder(arrayCards);
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
    $(`#${id}`).removeClass('wrong');
}

/**
 * Fecha todas as cartas/
 */
function closedAllCards() {
    $('.card').removeClass('open');
    $('.card').removeClass('match');
    $('.card').addClass('closed');
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
 * Habilita o clique em todas as cartas fechadas.
 */
function enableAllClick() {
    $('.closed').removeClass('disabled-click');
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
 * Reinica as variaveis.
 */
function resetVariables() {
    countClick = 0;
    lastCardClicked = '';
    lastIconDisplayed = '';
    enableAllClick();
}

/**
 * Vira as cartas erradas.
 */
function turnWrongCards(currentCard) {
    closedCard(currentCard);
    closedCard(lastCardClicked);
    resetVariables();
}

/**
 * Exibe a mensagem de parabéns.
 */
function showCongratulationsMessage() {
    $('#congratulations-message').removeClass('not-show');
    $('#pack-cards').addClass('not-show');
    $('header').addClass('not-show');
}

/**
 * Esconde a mensagem de parabéns e mostra jogo.
 */
function hideCongratulationsMessage() {
    $('#congratulations-message').addClass('not-show');
    $('#pack-cards').removeClass('not-show');
    $('header').removeClass('not-show');
}


/**
 * Se ainda existir algum card com a classe closed retorna true,
 * se não retorna false. Se retornar false, o jogo acabou.
 */
function gameContinues() {
    return $('.card').hasClass('closed');
}

/**
 * Começa um novo jogo
 */
function startNewGame() {
    closedAllCards();
    resetVariables();
    addClassOrder();
    hideCongratulationsMessage();
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
            resetVariables();
            if (!gameContinues()) {
                showCongratulationsMessage();
            }
        } else {
            console.log('not match.');
            addWrongClass(id);
            setTimeout(function() {
                turnWrongCards(id);
            }, 2000);
        }
    }
});