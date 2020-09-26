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
    alert("data inserted successfully");
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


export default productdb;
export {
  bulkCreate
};