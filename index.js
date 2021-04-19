const buyInput = $('#buy__input');
const buyBtn = $('#buy__btn');
const buyList = $('#buy__list');
const buyRemaining = $('#remaining');
const bought = $('.bl-cart-bought');

const items = [
    {
        name: 'Помідори',
        quantity: 3,
    },
    {
        name: 'Печиво',
        quantity: 3,
    },
    {
        name: 'Сир',
        quantity: 3,
    }
];

const itemTemplate = (name, quantity = 1) =>  `
<div class="bl-row">
    <div class="bl-product" contenteditable="true" spellcheck="false">
        ${name}
    </div>
    <div class="bl-count">
        <button class="bl-minus" data-tooltip="minus">-</button>
        <span class="bl-num">${quantity}</span>
        <button class="bl-plus" data-tooltip="plus">+</button>
    </div>

    <div class="bl-del">
        <button class="bl-buttons bl-not-bought" data-tooltip="Bought">Не куплено</button> <button class="bl-buttons bl-bought" data-tooltip="Bought">Купленo</button> <button class="bl-buttons bl-delbut" data-tooltip="Delete"><b><FONT COLOR=white>x</FONT></b></button>
    </div>
</div>`;

const remainingTemplate = (name, quantity = 1) => `
<div class="bl-prod">${name}<div class="bl-prod-num">${quantity}</div></div>
`;

const renewDeleteListener = () => {
    const deleteBtns = $('.bl-delbut');

    deleteBtns.click((e) => {
        const target = $(e.target).parents('.bl-row');
        const name = target.find('.bl-product').text();
        const targetRemaining = buyRemaining.find(`.bl-prod:contains(${name.trim()})`);
        targetRemaining.remove();
        target.remove();
    });
}

const renewQuantityListener = () => {
    $('.bl-minus, .bl-plus').click((e) => {
        const target = $(e.target);
        const isPlus = target.hasClass('bl-plus')
        const quantity = target.parent().find('.bl-num');
        const currentQuantity = isPlus ? +quantity.text() + 1 : +quantity.text() > 1 && quantity.text() - 1;
        target.parent().find('.bl-minus').prop('disabled', false);
        quantity.text(currentQuantity);
        if (!isPlus && quantity.text() === '1') target.prop('disabled', true);

        const name = target.parents('.bl-row').find('.bl-product').text().trim();
        const remaining = buyRemaining.find(`.bl-prod:contains(${name})`);
        remaining.find('.bl-prod-num').text(currentQuantity);
    });
}

const renewNotBoughtListener = () => {
    const notBoughtBtns = $('.bl-not-bought');
    notBoughtBtns.hide();   
    notBoughtBtns.click(e => {
        const target = $(e.target);

        const row = target.parents('.bl-row');
        row.find('.bl-plus').css('visibility', 'visible');
        row.find('.bl-minus').css('visibility', 'visible');
        row.find('.bl-product').css('text-decoration', 'none');
        const name = row.find('.bl-product').text().trim();
        buyRemaining.find(`.bl-prod:contains(${name})`).show();
        bought.find(`.bl-prod:contains(${name})`).hide();
        row.find('.bl-del').children().show();
        target.hide();
    });
}

const renewBoughtListener = () => {
    const boughtBtns = $('.bl-bought');
    boughtBtns.click(e => {
        const target = $(e.target);
        const row = target.parents('.bl-row');
        row.find('.bl-plus').css('visibility', 'hidden');
        row.find('.bl-minus').css('visibility', 'hidden');
        row.find('.bl-product').css('text-decoration', 'line-through');
        const name = row.find('.bl-product').text().trim();
        buyRemaining.find(`.bl-prod:contains(${name})`).hide();
        bought.find(`.bl-prod:contains(${name})`).show();
        row.find('.bl-del').children().hide();
        row.find('.bl-del').find('.bl-not-bought').show();
    });
}

$(document).ready(() => {
    items.forEach(({name, quantity}) => {
        buyList.append(itemTemplate(name, quantity));
        buyRemaining.append(remainingTemplate(name, quantity));
        bought.append(remainingTemplate(name, quantity));
        bought.children().hide();
    });

    renewDeleteListener();
    renewQuantityListener();
    renewBoughtListener();
    renewNotBoughtListener();
})

buyBtn.click(() => {
    const value = buyInput.val();
    const itemHtml = itemTemplate(value, 3);
    const remainingHtml = remainingTemplate(value, 3);
    buyList.append(itemHtml);
    buyRemaining.append(remainingHtml);
    bought.append(remainingHtml);
    bought.find(`.bl-prod:contains(${value})`).hide();
    buyInput.val('');
    renewDeleteListener();
    renewQuantityListener();
    renewBoughtListener();
    renewNotBoughtListener();
});

