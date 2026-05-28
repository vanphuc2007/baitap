const BASE_URL =
"https://6a0b17dc21e445625697483c.mockapi.io/cafebook/api/v1";

let allDrinks = [];

let cart = [];

let currentCategory = "all";

async function getDrinks(){

    const response =
    await fetch(`${BASE_URL}/drinks`);

    const drinks =
    await response.json();

    allDrinks = drinks;

    renderDrinks(drinks);

}

function renderDrinks(drinks){

    let html = "";

    drinks.forEach(drink => {

        html += `

            <div class="col-lg-3 col-md-6 mb-4">

                <div class="drink-card">

                    <img src="${drink.image}">

                    <div class="drink-content">

                        <span class="badge bg-dark mb-3">
                            ${drink.category || 'coffee'}
                        </span>

                        <h4>
                            ${drink.name}
                        </h4>

                        <div class="price">
                            ${drink.price} VNĐ
                        </div>

                        <button
                            class="cart-btn"
                            onclick="
                            addToCart(
                            '${drink.name}',
                            '${drink.price}'
                            )
                            "
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

    document.getElementById("drinkList")
    .innerHTML = html;

}

getDrinks();

/* SEARCH */

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(
    "keyup",
    filterDrinks
);

/* FILTER */

document
.querySelectorAll(".filter-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelectorAll(".filter-btn")
        .forEach(b => {

            b.classList.remove("active");

        });

        btn.classList.add("active");

        currentCategory =
        btn.dataset.category;

        filterDrinks();

    });

});

function filterDrinks(){

    const keyword =
    searchInput.value.toLowerCase();

    const filtered =
    allDrinks.filter(drink => {

        const matchName =
        drink.name
        .toLowerCase()
        .includes(keyword);

        const matchCategory =
        currentCategory === "all"
        ||
        drink.category === currentCategory;

        return (
            matchName &&
            matchCategory
        );

    });

    renderDrinks(filtered);

}

/* CART */

function addToCart(name,price){

    cart.push({name,price});

    updateCart();

    alert(`${name} added`);

}

function updateCart(){

    document.getElementById(
        "cartCount"
    ).innerText = cart.length;

    let html = "";

    let total = 0;

    cart.forEach(item => {

        total += parseInt(item.price);

        html += `

            <div class="border-bottom py-3">

                <h6 class="fw-bold">
                    ${item.name}
                </h6>

                <small>
                    ${item.price} VNĐ
                </small>

            </div>

        `;

    });

    document.getElementById(
        "cartItems"
    ).innerHTML = html;

    document.getElementById(
        "cartTotal"
    ).innerText = `${total} VNĐ`;

    document.getElementById(
        "paymentTotal"
    ).innerText = `${total} VNĐ`;

}

/* TABLE */

const tables =
document.querySelectorAll(".table-item");

const selectedTableInput =
document.getElementById("selectedTable");

let selectedTable = "";

tables.forEach(table => {

    table.addEventListener("click", () => {

        tables.forEach(t => {

            t.classList.remove("active");

        });

        table.classList.add("active");

        selectedTable =
        table.dataset.table;

        selectedTableInput.value =
        selectedTable;

    });

});

/* RESERVATION */

const reservationForm =
document.getElementById("reservationForm");

reservationForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        if(selectedTable === ""){

            alert("Vui lòng chọn bàn");

            return;

        }

        const booking = {

            customerName:
            document.getElementById(
                "customerName"
            ).value,

            phone:
            document.getElementById(
                "phone"
            ).value,

            email:
            document.getElementById(
                "email"
            ).value,

            date:
            document.getElementById(
                "date"
            ).value,

            time:
            document.getElementById(
                "time"
            ).value,

            table:selectedTable

        };

        await fetch(
            `${BASE_URL}/reservations`,
            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(booking)

            }
        );

        alert("Đặt bàn thành công");

        reservationForm.reset();

    }
);

/* PAYMENT */

const paymentForm =
document.getElementById("paymentForm");

paymentForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        alert("Thanh toán thành công");

        cart = [];

        updateCart();

    }
);

/* CARD FORMAT */

const cardNumber =
document.getElementById("cardNumber");

cardNumber.addEventListener(
    "input",
    (e) => {

        let value =
        e.target.value
        .replace(/\D/g,'');

        value =
        value.replace(
            /(.{4})/g,
            '$1 '
        );

        e.target.value =
        value.trim();

    }
);