import productdb, {
  bulkCreate,
  getData,
  createEle
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

const notfound = document.getElementById('notfound');

//insert value using create button
btncreate.onclick = (event)=>{
  let flag= bulkCreate(db.products, {
    name: proname.value,
    seller: seller.value,
    price: price.value
  })  
  //console.log(flag);
  proname.value = seller.value = price.value = "";

  getData(db.products, (data) => {
    userid.value = data.id+1 || 1;
  });

  table();

  let insertMsg = document.querySelector('.insertMsg');
  getMsg(flag, insertMsg);
}


//* create event on btn read
btnread.onclick = table;

//* update event 
btnupdate.onclick = () => {
  const id = parseInt(userid.value || 0);
  if (id) {
    db.products.update(id, {
      name: proname.value,
      seller: seller.value,
      price: price.value
    }).then((updated) => { 

      let get = updated ? true : false;
      let updateMsg = document.querySelector('.updateMsg');
      getMsg(get, updateMsg);

      proname.value = seller.value = price.value = "";
    })
      
  }
}


//! Delete all records 
btndelete.onclick=()=>{
  db.delete();
  db = productdb('Productdb', {
    products: `++id, name, seller, price`
  });
  db.open();
  table();
  textID(userid);


  let deletemsg = document.querySelector('.deleteMsg');
  getMsg(true, deletemsg);
}

window.onload = () => {
  textID(userid);
}

function textID(textboxid) {
  getData(db.products, data => {
    textboxid.value = data.id + 1 || 1;
  })
}




function table() {

  let tbody = document.getElementById('tbody');

  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.products,(data)=> {
    if (data) {
      createEle('tr', tbody, tr => {
        
        for (const value in data) {
          createEle('td', tr, td => {
            td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
          })
        }

        createEle('td', tr, td => {
          createEle('i', td, i => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute('data-id', data.id);
            i.onclick = editBtn;
          })
        })

        createEle('td', tr, td => {
          createEle('i', td, i => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute('data-id', data.id);
            i.onclick = deleteBtn;
          })
        })

      });

      
    } else {
      notfound.textContent = 'No record found in the database...';
    }
  })
}

function editBtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.products.get(id, data => {
    userid.value = data.id || 0;
    proname.value = data.name || "";
    seller.value = data.seller || "";
    price.value = data.price || "";
  })
}


//Delete 
function deleteBtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.products.delete(id);
  table();
}



function getMsg(flag, element) {
  if (flag) {
    element.className += "movedown";


    setTimeout(() => {
      element.classList.forEach(classname => {
        classname == 'movedown' ? undefined : element.classList.remove("movedown");        
      })  
    }, 4000)
  }
}