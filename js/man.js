fetch("https://fakestoreapi.com/products/category/men's clothing")
    .then(res => res.json())
    .then(items => {
        console.log(items);
        cargarItems(items);
    })


function cargarItems(items) {
    const colItems = document.querySelector('#items');
    colItems.innerHTML = '';
    items.forEach(item => {
        let colItem = document.createElement('col');


        colItem.innerHTML = `<img src=${item.image} class="card-img-top border-custom-2" width="100%" height="225"
        alt="chaqueta de hombre">

    <div class="card-body overflow-hidden ">

        <h5 class="text-center text-item bg-black border-custom">${item.title}</h5>
        <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group w-100">
                <a role="button" href="#" class="btn btn-dark text-center">Agregar</a>
            </div>

        </div>
    </div>`;
    colItems.appendChild( colItem );

    });
}