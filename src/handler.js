const {nanoid} = require('nanoid');
const books = require('./books.js');
const ci = require('case-insensitive');

const saveTheBooksHandler = (request, h)=>{
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished;
  let isReadPageMoreThanPageCount;


  if (pageCount < readPage) {
    isReadPageMoreThanPageCount=true;
    finished = false;
  } else if (pageCount > readPage) {
    isReadPageMoreThanPageCount=false;
    finished = false;
  } else if (pageCount === readPage) {
    isReadPageMoreThanPageCount=false;
    finished = true;
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (isReadPageMoreThanPageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };


  books.push(newBook);

  const isIdOk = books.filter((buku)=>buku.id===id).length>0;


  if (isIdOk) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllTheBooksHandler = (request, h) =>{
  const {name, reading, finished} = request.query;
  if (name || reading || finished) {
    const query = books.filter((buku)=>ci(buku.name).includes(name)||
      buku.reading == reading ||
      buku.finished == finished);

    const response = h.response({
      status: 'success',
      data: {
        books: query.map((q)=>({
          id: q.id,
          name: q.name,
          publisher: q.publisher,
        })),
      },
    });


    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((buku)=>({
        id: buku.id,
        name: buku.name,
        publisher: buku.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getTheBookByIdHandler = (request, h)=>{
  const {id} = request.params;

  const book =books.filter((buku) => buku.id ===id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editTheBookByIdHandler = (request, h)=>{
  const {id} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;


  const indexId = books.findIndex((buku)=>buku.id==id);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (indexId !== -1) {
    books [indexId]={
      ...books[indexId],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      insertedAt,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response =h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteTheBookbyIdHandler= (request, h)=>{
  const {id}=request.params;

  const indexId = books.findIndex((buku)=>buku.id==id);

  if (indexId !== -1) {
    books.splice(indexId, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = {saveTheBooksHandler,
  getAllTheBooksHandler,
  getTheBookByIdHandler,
  editTheBookByIdHandler,
  deleteTheBookbyIdHandler};
