/*
 * Open IndexDB!
 */
var dbPromise = idb.open('myDb', 1, function (upgradeDb) {
  upgradeDb.createObjectStore('myTable', {
    keyPath: 'id',
    autoIncrement: true
  });
})

/*
 * Add
 */
function writeIDB(st, data) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite').objectStore(st).put(data);
      return tx.complete;
    })
    .catch(function (er) {
      console.log('Error', er);
    });
}

/*
 * Get Item ID
 */
function getId(st, id) {
  return dbPromise
    .then(function (dbItem) {
      var transaction = dbItem.transaction(st),
        store = transaction.objectStore(st);
      return store.get(id)
    });
}

/*
 * Get All Item
 */
function getAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}

/*
 * Delete All IndexDB Entries
 */
function clearAllFx() {
  return dbPromise
    .then((db) => {
      const tx = db.transaction('myTable', 'readwrite');
      tx.objectStore('myTable').clear();
      return tx.complete;
    })
}

/*
 * Delete Individual Entry
 */
function deleteItem(id) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction('myTable', 'readwrite');
      tx.objectStore('myTable').delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log('Item deleted!');
    });
}

/*
 * Update
 */
function updateItem(id) {
  return dbPromise
    .then(function (db) {
      let tx = db.transaction('myTable', 'readwrite'),
        store = tx.objectStore('myTable');
      store.get(id)
        .then(function (res) {
          var code = document.getElementById('maincode'),
            codeId = document.getElementById('id'),
            buyPrice = document.getElementById('buy-price'),
            sellPrice = document.getElementById('sell-price'),
            volume = document.getElementById('volume');

          code.value = res.code;
          codeId.value = res.id;
          buyPrice.value = res.buyPrice;
          sellPrice.value = res.sellPrice;
          volume.value = res.volume;
        });

      return tx.complete;
    })
}