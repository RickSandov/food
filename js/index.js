// Initialize AOS
// AOS.init();

// INTERACTIONS

let summary = document.querySelector("#summary");

summary.addEventListener("click", (e) => {
  e.preventDefault();
  summary.classList.contains("dropdown")
    ? summary.classList.remove("dropdown")
    : summary.classList.add("dropdown");
});

// INTERACTIONS />

// VARIABLES
const totalElement = document.querySelector("#total");
let total = 0;

// Showroom groups
let navPollos = document.querySelector("#pollos");
let navComidas = document.querySelector("#comidas");
let navExtras = document.querySelector("#extras");
let navBar = document.querySelector("nav.nav");

// Containers
const showroom = document.querySelector("#showroom");
const dropdown = document.querySelector("#dropdown");
const snackbar = document.querySelector('#snackbar');

// Arrays

// const showroomItems = [];
const pollos = [];
const comidas = [];
const extras = [];
const dataPollos = [];
const dataComidas = [];
const dataExtras = [];
const dataSummaryItems = [];
const summaryItems = []

// fetch
const products = [
  {
    _id: 1,
    name: "1 Pollo",
    description: "Rostizado y bañado",
    category: "pollo",
    image: "chicken.png",
    price: 105,
  },
  {
    _id: 2,
    name: "2 Pollos",
    description: "Rostizados y bañados",
    category: "pollo",
    image: "chicken.png",
    price: 200,
  },
  {
    _id: 3,
    name: "Arroz",
    description: "1/2L de arroz blanco con elote",
    category: "extras",
    image: "burger.png",
    price: 15,
  },
  {
    _id: 4,
    name: "Pollo a la Mexicana",
    description: "250gr de delicioso pollo a la mexicana",
    category: "comidas",
    image: "burger.png",
    price: 30,
  },
  {
    _id: 5,
    name: "Salpicón",
    description: "1/2L de salpicón",
    category: "comidas",
    image: "burrito.png",
    price: 30,
  },
  {
    _id: 6,
    name: "Papas",
    description: "Ricas papas asadas",
    category: "extras",
    image: "chicken.png",
    price: 25,
  },
];

// VARIBLES />

// FUNCTIONS

// to create food card and add it to the showroom :D
function createAddCard(product, arr) {
  const card = document.createElement("div");
  const category = product.category;

  card.classList.add("food__card", "card", category);

  card.innerHTML = `
  <div class="description">
    <h2>${product.name}</h2>
    <span>${product.description}</span>
  </div>
  <div class="image">
    <img src="images/${product.image}" alt="pollo">
  </div>
  <div class="resume">
    <p><span>Precio:</span>$${product.price}</p>
    <a data-id="${product._id}" class="btn btn-primary add" href="#">Añadir</a>
  </div>
  `;
  arr.push(card);
}

function createAddSummary(item) {
  const itemElement = document.createElement("p");

  itemElement.innerHTML = `
  <span>${item.name}</span><u>x${item.quantity}</u>$${(item.price)*(item.quantity)}
`;

  summaryItems.push(itemElement);
}

// to create a resume item and add to summary container
function addSummaryItem(product) {
  // const item = document.createElement("p");

  // price *= product.quantity;

  // item.innerHTML = `
  //   <span>${name}</span><u>x${quantity}</u>$${price}
  // `;
  console.log(product);

  if (product.quantity > 1) {
    dataSummaryItems.forEach((e) => {
      product.id == e.id ? e.quantity++ : null;
    });
  } else {
    dataSummaryItems.push(product);
  }

  fillSummary();
}

function fillSummary() {
  // summaryItems = [];
  while(summaryItems[0]){
    summaryItems.pop();
  }
  
  dataSummaryItems.forEach((item) => {
    // dropdown.appendChild(item);
    createAddSummary(item);
  });

  loadDropdown(summaryItems);
}

function loadDropdown(arr) {
  clearHTML(dropdown);

  arr.forEach((e) => {
    dropdown.appendChild(e);
    // console.log("elemento agregado");
  });
}

// to clean HTML of a container
function clearHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function loadShowroom(arr) {
  clearHTML(showroom);

  arr.forEach((e) => {
    showroom.appendChild(e);
    // console.log("elemento agregado");
  });
}

// Nav Active
function navActive(newActive) {
  let active = document.querySelector(".active");
  active.classList.remove("active");

  newActive.classList.add("active");
}

// Fill Arrays
function fillArrays() {
  products.forEach((e) => {
    // e.category === 'pollo' ? createAddCard(e, pollos) : e.category === 'comidas' ? createAddCard(e, comidas) : createAddCard(e, extras);

    e.quantity = 1;
    if (e.category === "pollo") {
      createAddCard(e, pollos);
      dataPollos.push(e);
    } else if (e.category === "comidas") {
      createAddCard(e, comidas);
      dataComidas.push(e);
    } else {
      createAddCard(e, extras);
      dataExtras.push(e);
    }
  });
  loadShowroom(pollos);
  updateTotal();
}

// Update total
function updateTotal() {
  totalElement.innerHTML = `
    <span>Total: </span>$${total}
  `;
}

function addItem(e) {
  e.preventDefault();

  if (e.target.classList.contains("add")) {
    const item = e.target;
    const itemParent = e.target.parentElement.parentElement;
    const itemID = item.getAttribute("data-id");
    let targetArr;
    let itemPrice;

    const itemSchema = {
      name: '',
      price: 0,
      quantity: 0,
      id: ''
    };

    itemParent.classList.contains("pollo")
      ? (targetArr = [...dataPollos])
      : itemParent.classList.contains("extras")
      ? (targetArr = [...dataExtras])
      : (targetArr = [...dataComidas]);

    targetArr.forEach((e) => {
      // itemID == e._id ? itemPrice = e.price : null;
      if (itemID == e._id) {
        itemPrice = e.price;
        itemSchema.price = e.price;
        itemSchema.name = e.name;
        itemSchema.quantity = e.quantity;
        itemSchema.id = e._id;
        // addSummaryItem(e.name, e.price, e.quantity);

        e.quantity++;
        addSummaryItem(itemSchema);
      }
    });

    total += itemPrice;
    updateTotal();
    createSnackbar(itemSchema.name);
  }
}

// Event listener

function loadEventListeners() {
  navPollos.addEventListener("click", () => {
    navActive(navPollos);
    loadShowroom(pollos);
  });

  navComidas.addEventListener("click", () => {
    navActive(navComidas);
    loadShowroom(comidas);
  });

  navExtras.addEventListener("click", () => {
    navActive(navExtras);
    loadShowroom(extras);
  });

  showroom.addEventListener("click", addItem);
}

function createSnackbar(name) {
  clearHTML(snackbar);

  const snack = document.createElement('div');
  snack.classList.add('snackbar');


  snack.innerHTML = `
    <p>${name} al carrito</p>
  `;

  snackbar.appendChild(snack);
}

// FUNCTIONS />

// CLASSES

// class Product {
//   // #price = 0;
//   constructor(name, description, image, price) {
//     this.name = name;
//     this.description = description;
//     this.image = image;
//     this.price = price;
//   }
// }

// CLASSES />

// PAGE CODE

// initializations
fillArrays();
loadEventListeners();

console.log(products);
