// document.addEventListener('DOMContentLoaded', () => {
// 	const loadingScreen = document.getElementById('loadingScreen');

// 	 simulateLoading();

// 	function simulateLoading(){
// 		renderSkeletonLoading();
// 		setTimeout(() => {
// 			loadingScreen.style.opacity = '0';
// 			setTimeout(() => {
// 				loadingScreen.style.display = 'none';
// 			},500);
// 		}, 1500);
// 	}

// 	function renderSkeletonLoading() {
//         productsGrid.innerHTML = '';
//         for (let i = 0; i < 6; i++) {
//             const skeleton = document.createElement('div');
//             skeleton.classList.add('product-card', 'skeleton');
//             skeleton.innerHTML = `
//                 <div class="skeleton-image"></div>
//                 <div class="product-info">
//                     <div class="skeleton-text"></div>
//                     <div class="skeleton-text short"></div>
//                 </div>
//             `;
//             productsGrid.appendChild(skeleton);
//         }
//     }

//Sample product data
const products = [
	{
		id:1,
		title: "Oak Wood Chair",
		price: "$289",
		category: "furniture",
		image: "oak_wood_chair.webp"
	},
	{
		id:2,
		title: "Pendant Lamp",
		price: "$149",
		category: "lighting",
		image: "pendant_lamp.jpg"
	},
	{
		id: 3,
		title: "Ceramic Vase",
		price: "$79",
		category: "accessories",
		image: "ceramic_vase.jpg"
	},
	{
		id: 4,
		title: "Leather Sofa",
		price: "$1,299",
		category: "furniture",
		image: "leather_sofa.webp"
	},
	{
		id: 5,
		title: "Floor Lamp",
		price: "$299",
		category: "lighting",
		image: "floor_lamp.jpg"
	},
	{
		id: 6,
		title: "Wooden Tray",
		price: "$49",
		category: "accessories",
		image: "wooden_tray.webp"
	}
];

//DOM elements
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCount = document.querySelector('.cart-count');
let cartItems = [];

renderProducts(products);

//event listeners
filterBtns.forEach(btn => {
	btn.addEventListener('click', () =>{
		filterBtns.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');

		const category = btn.dataset.category;
		const filteredProducts = category === 'all'
			? products
			: products.filter(product => product.category === category);

		renderProducts(filteredProducts);
	});
});

//functions
function renderProducts(products){
	productsGrid.innerHTML = '';

	if (products.length === 0){
		productsGrid.innerHTML = '<p class="no-products"> No products found </p>';
		return;
	}

	products.forEach(product => {
		const productCard = document.createElement('div');
		productCard.classList.add('product-card');

		productCard.innerHTML = `
		<img src = "${product.image}" alt="${product.title}" class="product-image">
		<div class="product-info">
			<h3 class="product-title">${product.title}</h3>
			<p class="product-price">${product.price}</p>
			<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
		</div>
		`;
		const addBtn = productCard.querySelector('.add-to-cart');
		addBtn.addEventListener('click', () => addToCart(product.id));

		productsGrid.appendChild(productCard);

	});
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cartItems.push(product);
    updateCartCount();
    
    // Animation feedback
    const addBtn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    addBtn.textContent = 'Added!';
    setTimeout(() => {
        addBtn.textContent = 'Add to Cart';
    }, 1000);
}

function updateCartCount() {
    cartCount.textContent = cartItems.length;
}
//});