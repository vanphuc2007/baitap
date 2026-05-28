async function getAdminDrinks(){

    const response =
    await fetch(`${BASE_URL}/drinks`);

    const drinks =
    await response.json();

    renderAdminDrinks(drinks);

}

function renderAdminDrinks(drinks){

    let html = "";

    drinks.reverse().forEach(drink => {

        html += `
            <div class="col-md-4 mb-4">

                <div class="card shadow">

                    <img
                        src="${drink.image}"
                        class="card-img-top"
                    >

                    <div class="card-body">

                        <h5>
                            ${drink.name}
                        </h5>

                        <p>
                            ${drink.price} VNĐ
                        </p>

                        <button
                            class="btn btn-danger w-100"
                            onclick="deleteDrink('${drink.id}')"
                        >
                            Xóa
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    document.getElementById("adminDrinkList").innerHTML = html;

}

async function deleteDrink(id){

    await fetch(`${BASE_URL}/drinks/${id}`,{

        method:"DELETE"

    });

    getAdminDrinks();

}

const addDrinkForm =
document.getElementById("addDrinkForm");

addDrinkForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const newDrink = {

        name:
        document.getElementById("drinkName").value,

        price:
        document.getElementById("drinkPrice").value,

        image:
        document.getElementById("drinkImage").value

    };

    await fetch(`${BASE_URL}/drinks`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(newDrink)

    });

    addDrinkForm.reset();

    getAdminDrinks();

});

getAdminDrinks();