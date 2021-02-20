/*var LIST	=	$('.bl-list');

var ITEM_TEMPLATE	=	$('.bl-row').html();

function	addItem(title)	
{
	var node =	$(ITEM_TEMPLATE);	//Create	new	HTML	node
	node.find(".bl-product").text(title);	//Set	product	title
	//Delete	Action
	node.find(".bl-delbut").click(function(){
	node.remove();
	});
	LIST.append(node);	//Add	to	the	end	of	the	list
}*/

const Item = (text) => `
	<div class="bl-row">
		<div class="bl-product">
			${text}
		</div>
		<div class="bl-count">
			<button class="bl-minus" data-tooltip="minus">-</>-</button>
			<span class="bl-num">1</span>
			<button class="bl-plus" data-tooltip="plus">+</button>
		</div>
		<div class="bl-del">
			<button class="bl-buttons" data-tooltip="Bought">Купленo</button> <button class="bl-buttons bl-delbut" data-tooltip="Delete"><b><FONT COLOR=white>x</FONT></b></button>
		</div>
	</div>
`;

const ItemRight = (text) => `
	<div class="bl-prod">${text}<div class="bl-prod-num">1</div></div>
`;

const addNewItem = $('button[data-tooltip="Add"]');
addNewItem.click(() => {
	const input = $('#productNameInput');
	const productName = input.val();
	if (!productName) return;
	const list = $('#productList');
	list.append(Item(productName));
	const listRight = $('#remainingProduct');
	listRight.append(ItemRight(productName));
	input.val("");
});

const plus = $('button[data-tooltip="plus"]');
plus.click( () => {
	const input = 
});