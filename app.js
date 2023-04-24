const fs = require('fs');
const ruta = "./desafio2Archivo.txt";
const crearArchivo = async (ruta) => {
    if (!fs.existsSync(ruta)){
        await fs.promises.writeFile(ruta, "[]")
    }else if ((await fs.promises.readFile(ruta,"utf-8")).length==0){
        await fs.promises.writeFile(ruta, "[]")
    }
}
class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


class ProductManager {
    constructor() {
        this.path = ruta;
    }
    addProduct = async (newProduct) => {
        if (toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0 && newProduct.thumbnail.length > 0 && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; //Esto para que sea incremental dependiendo del ultimo elemento
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return "No se encontró el producto que desea ver"
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
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
productManager = new ProductManager()

const tests = async () => {
    await crearArchivo(ruta); //Es para que si no tiene el array vacio al inicio se lo ponga así evitamos errores, y para asegurarnos que existe el archivo
    console.log(await productManager.getAllProducts()); //Debe aparecer []
    await productManager.addProduct(productoPrueba);
    console.log(await productManager.getAllProducts()); //Debe aparecer el producto prueba (o todos en caso de haber mas)
    console.log(await productManager.getProductById(1)); //Debe aparecer el producto con el id 1 (el de prueba), en caso de no existir tira error
    await productManager.updateProduct({id: 1, title:"Prueba cambiando titulo y descripcion del elemento 1", description:"Exito"}) //Debe actualizar los campos que están solamente, sin perder el id (en caso de querer cambiar todos, tambien se puede)
    console.log(await productManager.getProductById(1));
    await productManager.deleteProductById(1); //Elimina el producto que corresponde con el id 1 (el de prueba), en caso de no existir tira error
    
}
tests();