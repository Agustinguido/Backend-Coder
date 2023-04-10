class Producto{    
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


class ProductManager{
    constructor(){
        this.products = [];
    }    
    addProduct(newProduct){          
        //Reviso que tenga datos, ya que no puede agregar con un campo vacio
        if ( toString(newProduct.id).length>0 && newProduct.title.length>0 && newProduct.description.length>0 && toString(newProduct.price).length>0 && newProduct.thumbnail.length>0 && newProduct.code.length>0 && toString(newProduct.stock).length>0){
            //Utilicé el filter ya que con el "includes" no me dejaba ya que tengo objetos y no datos simples
            if (this.products.filter(product=> product.code==newProduct.code).length > 0)
            {
                console.error("Ya existe el producto");
            }
            else 
            {
                //En caso que no exista y sea un nuevo producto agrega el id automatico y el producto, para que si se ingresa un producto no valido no se agregue
                const idAutoincremental = ProductManager.idAutomatico()
                this.products.push({id: idAutoincremental,...newProduct});
            }        
        }else{
            console.error("Debe tener todos los campos completos para agregarlo")
        }
       
    }
    getProductos(){
        return this.products;
    }
    getProductById(id){
        //Me fijo si es diferente a undefined, ya que si es undefined no existe en el array, en caso de que exista lo devuelvo, en caso contrario devuelvo un error
        if (this.products.find(product => product.id == id)!=undefined){
            return this.products.find(product => product.id == id)
        }else{
            return "Product Not found";
        }
    }
    //Hice una clase estatica para el id automatico, así no tengo que ingresarlo y es autoincremental 

    static idAutomatico() {
        if (!this.idAnterior) {
          this.idAnterior = 1
        }
        else {
          this.idAnterior++
        }
        return this.idAnterior
      }

}


//Creo los productos (El link de firestore es de mi tp anterior de react)
const producto1=new Producto("Iphone 14","Celular Apple",228420,"https://firebasestorage.googleapis.com/v0/b/tiendareact-coder.appspot.com/o/14.png?alt=media&token=3722a811-c191-4ff5-b970-ac48533fb350","aaaa",23);
const producto2=new Producto("S22 Ultra","Celular Samsung",310000,"https://firebasestorage.googleapis.com/v0/b/tiendareact-coder.appspot.com/o/s22.png?alt=media&token=c7e79640-8283-4445-9ffb-660ea66c2940","aaab",26);
const producto3=new Producto("Z Flip 4","Celular Samsung",210000,"https://firebasestorage.googleapis.com/v0/b/tiendareact-coder.appspot.com/o/zflip.png?alt=media&token=13997786-d493-4ade-8c76-f064f2581f52","aaac",56);
const producto4=new Producto("Iphone 14 pro","Celular Apple",522000,"https://firebasestorage.googleapis.com/v0/b/tiendareact-coder.appspot.com/o/14pro.png?alt=media&token=c6cb0226-587a-4eef-88e5-4400b606076e","aaad",32);
const producto5=new Producto("PS5","Consola Sony",350000,"https://firebasestorage.googleapis.com/v0/b/tiendareact-coder.appspot.com/o/ps5.png?alt=media&token=7262370a-fec8-4b13-9293-2dac018ea72b","aaae",22);
const productoVacio=new Producto("","","","","","");
const productoPrueba=new Producto("producto prueba","Este es un producto prueba",200,"Sin Imagen","abc123",25);


//Creo un product manager
productMaganer=new ProductManager()

//Llamo al procedimiento para mostrar el array vacio
console.log(productMaganer.getProductos())

//Agrego los productos al product manager
productMaganer.addProduct(producto1);
productMaganer.addProduct(producto2);
productMaganer.addProduct(producto3);
productMaganer.addProduct(producto4);
productMaganer.addProduct(producto5);

//Esto de abajo dará un mensaje que dice "Debe tener todos los campos completos para agregarlo" ya que es un objeto "vacio"
productMaganer.addProduct(productoVacio);

productMaganer.addProduct(productoPrueba);



//Realizo las pruebas del tp
//Listo todos los productos
console.log(productMaganer.getProductos())
//Intento agregar nuevamente el mismo producto para probar que si está repetido el code no lo agrega, se verá el "ya existe el producto" en la consola
productMaganer.addProduct(productoPrueba);

console.log(productMaganer.getProductById(3)); 
console.log(productMaganer.getProductById(654966)); //Devuelve undefined aparte de el mensaje ya que no existe y el return no tiene nada, por lo tanto al querer mostrar algo que no tiene nada, da undefined (tambien podria devolver null al ponerle return null pero lo dejé asi ya que es practicamente lo mismo)
