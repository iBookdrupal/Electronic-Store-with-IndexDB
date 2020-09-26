import productdb, {
  bulkCreate
} from './Module.js';

let db = productdb('Productdb', {
products: `++id, name, seller, price`
});


//input tags
let userid = document.getElementById('userid');
let proname = document.getElementById('proname');
let seller = document.getElementById('seller');
let price = document.getElementById('price');

//buttons 
const btncreate = document.getElementById('btn-create');
const btnread = document.getElementById('btn-read');
const btnupdate = document.getElementById('btn-update');
const btndelete = document.getElementById('btn-delete');

//insert value using create button
btncreate.onclick = (event)=>{
  let flag= bulkCreate(db.products, {
    name: proname.value,
    seller: seller.value,
    price: price.value
  })  
  console.log(flag);
  proname.value = seller.value = price.value = "";
}