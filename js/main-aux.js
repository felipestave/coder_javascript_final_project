let cart = []
let containerCart = document.getElementById('cart-container')
const totalCartItems = document.getElementById('totalItems')
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart)
}

const deleteItem = (itemId) => {
    const item = cart.find((itemsF) => itemsF.id === itemId);
    const index = cart.indexOf(item)

    cart.splice(index, 1);
    console.log(cart)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Artículo eliminado'
    })
    updateCart();

}
const updateCart = () => {
    containerCart.innerHTML = "";
    const cartItems = document.createElement('div')
    cartItems.classList.add('row', 'justify-content-end')
    cartItems.innerHTML = `
        <div class="col-4 text-custom-2 fw-bold">Item</div>
                        <div class="col-4 text-custom-2 fw-bold text-end">Precio</div>
                        <div class="col-2 text-custom-2 fw-bold text-end">Cantidad</div>
                        <div class="col-2 text-custom-2 fw-bold text-end"></div>
        `;
    containerCart.appendChild(cartItems)
    cart.forEach(itemsFetch => {
        const row = document.createElement('div');
        row.classList.add('row');
        let total = 0;
        total += parseInt(itemsFetch.price);

        row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <image src="${itemsFetch.image}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                        <p class="text-custom-2">
                            ${itemsFetch.title.substring(0,20)}
                            </p>
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                        <p class="text-custom-2 text-center">
                        $${itemsFetch.price}
                        </p>

                        </div>
                        <div class="col-2 d-flex align-items-center justify-content-end p-2 border-bottom">
                        ${itemsFetch.cantidad}
                    </div>
                  

                        <div class="col-1 d-flex align-items-center justify-content-center p-2 border-bottom">
                        <a role="button" id= "deleteButton${itemsFetch.id}"><i class="fa-solid fa-trash icon-2"></i>
                        </div>`;
        containerCart.appendChild(row);

        const deleteBtn = document.getElementById(`deleteButton${itemsFetch.id}`)
        deleteBtn.addEventListener('click', () => {
            deleteItem(itemsFetch.id);
        })
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    const btnDeleteAll = document.createElement("div");
    btnDeleteAll.classList.add('row');
    btnDeleteAll.innerHTML = `
        <a id= "deleteAllCart" class="col-12 fw-bold text-center fa-solid fa-x btn btn-dark text-center" role="button" ></a>
        
        `
    totalCartItems.textContent = cart.reduce((a, itemsFetch) => a + itemsFetch.cantidad, 0);
    const totalPrice = cart.reduce((a, itemsFetch) => a + itemsFetch.price * itemsFetch.cantidad, 0);
    const totalCart = document.createElement('div');
    totalCart.classList.add('row', 'd-flex', 'justify-content-betweer');
    totalCart.innerHTML = `
        <div class="col-3 text-custom-2 fw-bold">Total:</div>
        <div class="col-8 text-custom-2 text-end fw-bold">$${totalPrice.toFixed(2)}</div>
        `;
    containerCart.appendChild(totalCart);
    containerCart.appendChild(btnDeleteAll);
    const btnDeleteAllCart = document.getElementById('deleteAllCart');



    btnDeleteAllCart.addEventListener("click", () => {
        if (cart.length == 0) {
            Swal.fire({
                icon: 'error',
                iconColor: "black",
                html: '<p class="text-custom-2">Tu carrito ya está vacío</p>'
            })
        } else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-dark',
                    cancelButton: 'btn btn-light'
                },
                buttonsStyling: false
                
            })

            swalWithBootstrapButtons.fire({
                title: '<p class="text-custom-2">Tu cesta se eliminará</p>',
                html: '<p class="text-custom-2">No podrás recuperar tu compra</p>',
                icon: 'warning',
                iconColor: "black",
                showCancelButton: true,
                confirmButtonText: 'Sí, proceder!',
                cancelButtonText: 'No, guardar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    cart.length = 0;
                    updateCart()
                    swalWithBootstrapButtons.fire(
                        'Tu cesta ha sido vaciada!'
                    )
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Tu cesta sigue guardada!'
                    )
                }
            })
        }
    })

}
updateCart()