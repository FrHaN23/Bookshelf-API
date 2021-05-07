const books = require('./books');

// buat testing script

const arr =[
  {id: '0000', name: 'ujang', sales: 60},
  {id: '0001', name: 'ujang', sales: 60},
  {id: '0003', name: 'ujang', sales: 60},

];

const filter = arr.filter((fill)=> fill.name=='' ||
fill.name==null ||
fill.name.length < 1 ||
!fill.name.trim());

const filterLen = filter.length;
const isFilterHaveNull = filterLen===0;

console.log(filter);
console.log(filterLen);
console.log(isFilterHaveNull);

const id = '0002';

const arri = arr.filter((buku)=>buku.id === id)[0];

console.log(arri);


const isNameOk = books.filter((buku)=>buku.name==''||
buku.name.length< 1 ||
buku.name === null ||
buku.name ==='null' ||
!buku.name.trim()).length===0;

console.log(isNameOk);
