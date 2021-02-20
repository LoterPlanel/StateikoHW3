var LIST	=	$('.bl-list');

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
}