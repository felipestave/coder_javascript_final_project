fetch("https://fakestoreapi.com/products/category/women's clothing")
    .then(res => res.json())
    .then(items => {
        main(items);
    })