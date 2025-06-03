
//CONSIGNA 
class ProductsRepository{
products = [
     
    { title: 'Tv Samsung', price: 4000, id: 1 },
    { title: 'Tv LG', price: 5000, id: 2 },
    { title: 'Tv Noblex', price: 6000, id: 3 }
    
];

create ({ title, price }) {
    const newProduct = {
        title,
        price,
        

    };


    this.products.push(newProduct);     
    console.log(this.products);        
    return newProduct;  

}

getAll(){
    return this.products;
}
}
 
const product_repository = new ProductsRepository();
export default product_repository;