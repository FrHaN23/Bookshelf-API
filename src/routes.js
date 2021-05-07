const {saveTheBooksHandler,
  getAllTheBooksHandler,
  getTheBookByIdHandler,
  editTheBookByIdHandler,
  deleteTheBookbyIdHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveTheBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllTheBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getTheBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editTheBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteTheBookbyIdHandler,
  },
];


module.exports =routes;
