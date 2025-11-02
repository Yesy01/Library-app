const myLibrary = [];

function makeId() {
  return (crypto && crypto.randomUUID) ? crypto.randomUUID() : `book-${Date.now()}-${Math.random()}`;
}

function Book(title, author, pages, hasRead) {
  this.id = makeId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Book(title, author, pages, hasRead);
  myLibrary.push(book);
  renderLibrary();
}

function removeBookFromLibrary(id) {
  const idx = myLibrary.findIndex(b => b.id === id);
  if (idx !== -1) {
    myLibrary.splice(idx, 1);
    renderLibrary();
  }
}

function renderLibrary() {
  const container = document.querySelector('#library');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p class="status">${book.hasRead ? 'Read' : 'Not read yet'}</p>
      <div class="actions">
        <button class="toggle-btn">Toggle read</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // toggle read
    card.querySelector('.toggle-btn').addEventListener('click', () => {
      book.toggleRead();
      renderLibrary();
    });

    // remove
    card.querySelector('.remove-btn').addEventListener('click', () => {
      removeBookFromLibrary(book.id);
    });

    container.appendChild(card);
  });
}

// form + button wiring
const form = document.querySelector('#book-form');
const newBookBtn = document.querySelector('#new-book-btn');

newBookBtn.addEventListener('click', () => {
  form.classList.toggle('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // don't reload
  const data = new FormData(form);
  const title = data.get('title');
  const author = data.get('author');
  const pages = Number(data.get('pages'));
  const hasRead = data.get('read') === 'on';

  addBookToLibrary(title, author, pages, hasRead);
  form.reset();
  form.classList.add('hidden');
});

// seed some data
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Clean Code', 'Robert C. Martin', 464, true);
addBookToLibrary('1984', 'George Orwell', 328, true);