fetch("https://fakestoreapi.com/products/category/men's clothing")
    .then(res => res.json())
    .then(items => {
        main(items);
    })