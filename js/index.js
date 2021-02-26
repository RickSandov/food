// Initialize AOS
// AOS.init();

// INTERACTIONS

const summary = document.querySelector("#summary");
const summaryTitle = document.querySelector(".summary__title");
const scrim = document.querySelector(".scrim");

summaryTitle.addEventListener("click", (e) => {
  e.preventDefault();
  if (summary.classList.contains("dropdown")) {
    summary.classList.remove("dropdown");
    scrim.style.display = "none";
  } else {
    summary.classList.add("dropdown");
    scrim.style.display = "block";
  }
});

scrim.addEventListener("click", (e) => {
  e.preventDefault();
  summary.classList.remove("dropdown");
  scrim.style.display = "none";
});

// INTERACTIONS />

// VARIABLES
const totalElement = document.querySelector("#total");
let total = 0;

// Showroom groups
const navPollos = document.querySelector("#pollos");
const navComidas = document.querySelector("#comidas");
const navExtras = document.querySelector("#extras");
const navBar = document.querySelector("nav.nav");

// Containers
const showroom = document.querySelector("#showroom");
const dropdown = document.querySelector("#dropdown");
const snackbar = document.querySelector("#snackbar");

// Modal info\
const modal = document.querySelector("#modal");
const modalInfo = document.querySelector(".modal__info");
const modalSelect = document.querySelector("#modalSelect");
const modalTotal = document.querySelector("#modal-total");
const modalPrice = document.querySelector("#modal-price");
const modalExit = document.querySelector(".modal__exit");
const modalDelete = document.querySelector(".delete");
const ok = document.querySelector(".ok");

// Arrays
// const showroomItems = [];
const pollos = [];
const comidas = [];
const extras = [];
const dataPollos = [];
const dataComidas = [];
const dataExtras = [];
let dataSummaryItems = [];
const summaryItems = [];
let itemsAdded;

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
  const itemID = document.createAttribute("data-id");
  itemID.value = item.id;
  itemElement.setAttributeNode(itemID);
  itemElement.classList.add("dropdown-item");

  itemElement.innerHTML = `
  <span>${item.name}</span><u>${item.quantity}</u>$${item.price * item.quantity}
`;

  summaryItems.push(itemElement);
}

// to create a resume item and add to summary container
function addSummaryItem(product) {
  if (dataSummaryItems.find(i => i.id == product.id)) {
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
  while (summaryItems[0]) {
    summaryItems.pop();
  }

  dataSummaryItems = dataSummaryItems.filter((item) => item.quantity >= 1);

  dataSummaryItems.forEach((item) => {
    item.quantity > 0 ? createAddSummary(item) : null;
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
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      id: "",
    };

    itemParent.classList.contains("pollo")
      ? (targetArr = [...dataPollos])
      : itemParent.classList.contains("extras")
      ? (targetArr = [...dataExtras])
      : (targetArr = [...dataComidas]);

      let currentQuantity;

      currentQuantity = dataSummaryItems.find(i => i.id == itemID) ? currentQuantity = dataSummaryItems.find(i => i.id == itemID).quantity : 0;

    if (currentQuantity >= 5){
      createSnackbarError();
    } else {
      targetArr.forEach((e) => {
        // itemID == e._id ? itemPrice = e.price : null;
          if (itemID == e._id) {
            itemPrice = e.price;
            itemSchema.price = e.price;
            itemSchema.name = e.name;
            itemSchema.description = e.description;
            itemSchema.quantity += 1;
            itemSchema.id = e._id;
            // addSummaryItem(e.name, e.price, e.quantity);
  
            addSummaryItem(itemSchema);
            total += itemPrice;
            updateTotal();
            createSnackbar(itemSchema.name);
          }
          // console.log(e);
        } 
      )
    }
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
  dropdown.addEventListener("click", createModal);
}

function createSnackbar(name) {
  clearHTML(snackbar);

  const snack = document.createElement("div");
  snack.classList.add("snackbar");

  snack.innerHTML = `
    <p>${name} al carrito</p>
  `;

  snackbar.appendChild(snack);
};

function createSnackbarError() {
  clearHTML(snackbar);

  const snack = document.createElement("div");
  snack.classList.add('snackbar', 'snackbar-error');

  snack.innerHTML = `
    <p>Límite de 5 por producto</p>
  `;

  snackbar.appendChild(snack);
};

// Create modal with the content of the clicked item
function createModal(e) {
  if (
    e.target.hasAttribute("data-id") ||
    e.target.parentElement.hasAttribute("data-id")
  ) {
    const itemSelected = e.target.parentElement.hasAttribute("data-id")
      ? e.target.parentElement
      : e.target;

    dataSummaryItems.forEach((e) => {
      if (itemSelected.getAttribute("data-id") == e.id) {
        modalInfo.innerHTML = `\
        <h3>${e.name}</h3>
        <span>${e.description}</span>
        `;
        modalPrice.innerHTML = `
        $${e.price}c/u
        `;
        modalSelect.value = e.quantity;
        modalTotal.innerHTML = `
        <span>Total:</span> $${e.price * e.quantity}
        `;

        modalSelect.addEventListener("input", () => {
          e.quantity = modalSelect.value;
          modalTotal.innerHTML = `
          <span>Total:</span> $${e.price * e.quantity}
          `;
        });

        modalDelete.addEventListener("click", () => {
          e.quantity = 0;
          closeModal();
        });
      }
    });

    modal.style.display = "flex";

    modalExit.addEventListener("click", () => {
      closeModal();
    });

    ok.addEventListener("click", () => {
      closeModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    });
  }
}

function closeModal() {
  modal.style.display = "none";
  fillSummary();
  checkTotal();
  updateTotal();
}

function checkTotal() {
  total = 0;
  dataSummaryItems.forEach((e) => {
    total += e.price * e.quantity;
  });
}

// FUNCTIONS />

// CLASSES />

// PAGE CODE

// initializations
fillArrays();
loadEventListeners();
