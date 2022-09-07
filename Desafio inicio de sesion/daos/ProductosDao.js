import faker from 'faker';
faker.locale = 'es';
import { write, writeFile } from 'fs';

let prods = "TITLE;PRICE;ID;STOCK";

for(let i = 0; i < 100; i++){
    headers+=name.firstName()+
    ";"+ title.titleProducto()+
    ";"+ id.idProduct()+
    ";"+ price.priceProduct()+
    ";"+ stock.locale()+
    "/n"
}
writeFile('./api/productos-test',data,err=>{
    if(err) return console.log(err);
    console.log('listos los productos');
})