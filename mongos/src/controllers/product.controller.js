import product_repository from "../repositories/products.repository.js";

//responsabilidad de recibir y mandar
class ProductController {

    create (request, response){
       console.log( "Body:", request.body)
        product_repository.create({
        title: request.body.title,
        price: request.body.price,
        //id: request.body.id
    })
    response.send({
        message: 'producto recibido',
        ok: true
    })
  
    }
      
      getAll (request, response){
        const products = product_repository.getAll()
        response.send({
            ok:true,
            products: products
        })
   }
}
const productController = new ProductController()
export default productController