const productdb =(dbname, table) => {
  //create a new db

  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

/*
  const db = new Dexie('myDb');
db.version(1).stores({
  friends: 'name, age'
});
*/
  
  return db;
}


//insert function 
const bulkCreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);     
  } else {
    alert("Please provide Data");
  }
  
  return flag;
}

//check empty boxes 
const empty = object => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
}


//Get count of items inserted in the database 
//* fn - a higher order function is a function that takes another function as an argument 
const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each(table => {
        obj = sortObj(table);
        fn(obj, index++);

        
      })
    } else {
      fn(0);
    }
  });
}


//Sort Data 
const sortObj = sortobj => {
  let obj = {};
  obj = {
    id: sortobj.id, 
    name: sortobj.name, 
    seller: sortobj.seller,
    price: sortobj.price

  }

  return obj;
}

//Create dynamic Element 
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
  
}



export default productdb;
export {
  bulkCreate, 
  getData,
  createEle
};