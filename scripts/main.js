$( document ).ready(function() {
    
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}

	function shoppintCartUI() {
		$('#cartTable').append(shoppingCartHTML());

		$(".removeButton").click( function(event) {
			let index = event.target.getAttribute("data-place");
			event.target.parentElement.parentElement.remove();
			removeFromCart(index);
		});

	}

	function shoppingCartHTML(){
		let table = "";

		let cart = JSON.parse(localStorage.getItem("bunStore"));
		for (var i = 0; i < cart.items.length; i++) {
			table += `<tr>  <td>${ cart.items[i].flavors.join(' ') }</td>  <td>${cart.items[i].quantity}</td>  <td>2</td>   <td><button data-place="${i}" class="removeButton">X</button></td>  </tr>`;
		}
		return table;
	}

	//checks for local storage and updates the ui
	function checkLocal() {
		if (localStorage.bunStore === undefined) {
			localStorage.setItem("bunStore", JSON.stringify({}));
		} else {
			updateCartNav(JSON.parse(localStorage.getItem("bunStore")));
		}
	}

	function addItemToCart(item) {
		


		if (localStorage.bunStore === undefined) {
			localStorage.setItem("bunStore", JSON.stringify({items: []}));
		} 

		
		let cart = JSON.parse(localStorage.getItem("bunStore"));
		cart.items.push(item);
		localStorage.setItem("bunStore", JSON.stringify(cart));
		updateCartNav(cart);
	}

	//updates ui
	function updateCartNav(cart){
		let count = cart.items.length
		$('#cartNav').replaceWith('<span id="cartNav"> Cart: ' + count + '</span>');
	}


	//get rid of item
	function removeFromCart(i) {
		let cart = JSON.parse(localStorage.getItem("bunStore"));
		cart.items.splice(i, 1);
		localStorage.setItem("bunStore", JSON.stringify(cart));
		updateCartNav(cart);
		location.reload();
	}



	$( ".order" ).click(function() {
		let items =[];
  		let item = decodeURI($.urlParam('item'));
  		items.push(item);
  		$('input[type=checkbox]:checked').toArray().forEach(function(v) {
  			items.push(v.name);
  		});
  		let quantity = $('#rollQuantity').find(":selected").text();
  		addItemToCart({flavors: [items], quantity: quantity});
	});

	function productUI() {
		try {
			let item = decodeURI($.urlParam('item'));
			$('#productName').html(`<h3>${item}<h3>`);
		} catch(err){
			console.log(err);
		}
	}



	let checkbox = `
						<br>
						<h3>Select Up to two other Flavors</h3>
							<input type="checkbox" name="Maple Apple Pecan" > Maple Apple Pecan<br>
							<input type="checkbox" name="Bacon" > Bacon<br>
							<input type="checkbox" name="Walnut" > Walnut<br>
							<input type="checkbox" name="Original (Gluten-free)" > Original (Gluten-free)<br>
							<input type="checkbox" name="Original (Vegan)" > Original (Vegan) <br>
							<input type="checkbox" name="Original " > Original <br>
							<input type="checkbox" name="Pumpkin Spice" > Pumpkin Spice<br>
							<input type="checkbox" name="Caramel Pecan" > Caramel Pecan<br>
							<input type="checkbox" name="Carrot Cake" > Carrot Cake<br>
							<input type="checkbox" name="Old Fashioned Buttermilk" > Old Fashioned Buttermilk<br>
							<input type="checkbox" name="Strawberry Rhubarb" > Strawberry Rhubarb<br>
							<input type="checkbox" name="Birthday Cake" > Birthday Cake<br>
							<input type="checkbox" name="Lemon Lavendar" > Lemon Lavendar<br>
							<input type="checkbox" name="Cranberry" > Cranberry<br>
							<input type="checkbox" name="Blackberry" > Blackberry
					`


	$('#rollQuantity').on('change', function(e) {
		let quantity = $('#rollQuantity').find(":selected").text();
		if (quantity != '1 Roll') {
			$('#extraFlavors').html(checkbox);
			let limit = 2;
			$('input[type=checkbox]').on('change', function (e) {
			    if ($('input[type=checkbox]:checked').length > limit) {
			        $(this).prop('checked', false);
			        alert("allowed only 3");
			    }
			});
			$("#productImg").attr("src","images/c6.png");
		} else {
			$('#extraFlavors').html('');
			$("#productImg").attr("src","images/c2.png");
		}
	});




	productUI();
	checkLocal();
	shoppintCartUI();
});


cart = {
	items: [
		{
			flavors: ['cinamon'],
			quantity: '1 pack',
		},
		{	flavors: ['bacon'],
			quantity: '12 pack'
		}
	]
}









