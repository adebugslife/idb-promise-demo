# IndexedDB API

## Demo
* [IndexedDB with Promise library in CRUD demo](https://adebugslife.github.io/idb-promise-demo/)

## Coverage
1. [Create Database and Table](#)
1. [Create](#)
2. [Read](#)
3. [Update](#)
4. [Delete](#)

## Create Database and Table
```html
 <script type="text/javascript" src="utilities/idb.js"></script>
```

```js


/*
 * Open IndexDB!
 */
var dbPromise = idb.open('myDb', 1, function (upgradeDb) {
  upgradeDb.createObjectStore('myTable', {
    keyPath: 'id',
    autoIncrement: true
  });
})
```


### Create

```js
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
```

### Read

```js
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
```

### Update

```js
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
```


### Delete

```js
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
```

## Author
* **Ann G.** ⊂(・﹏・⊂) [Adebugslife](http://adebugslife.com)



**Free Reference, Hell Yeah! (￣▽￣)ゞ**
