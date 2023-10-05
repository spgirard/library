// SITE JAVASCRIPT

// SITE JAVASCRIPT
console.log('Welcome to the personal library...');

// for arrow hover effect
const toTop = document.getElementById("arrow");
toTop.addEventListener("mouseenter", (event) => {toTop.classList.toggle('fa-bounce')});
toTop.addEventListener("mouseleave", (event) => {toTop.classList.toggle('fa-bounce')});

// book area
const bookContent = document.getElementById('bookContent');

// create library
const myLibrary = [];

// book object
function Book(title, author, pages, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read   
}

Book.prototype.toggleRead = function() {
    if(this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

// add a book
function addBookToLibrary(book) {
    myLibrary.push(book);
    }
    
// remove a book
function removeBookFromLibrary(book) {
    let bookIndex = myLibrary.indexOf(book);

    console.log(book, bookIndex);
    myLibrary.splice(bookIndex,  1);
}

// dummy books
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
addBookToLibrary(theHobbit);
let fellow = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423);
addBookToLibrary(fellow);
let tower = new Book('The Two Towers', 'J.R.R. Tolkien', 352);
addBookToLibrary(tower);
let king = new Book('The Return of the King', 'J.R.R. Tolkien', 464);
addBookToLibrary(king);
let sil = new Book('The Silmarillion', 'J.R.R. Tolkien', 384);
addBookToLibrary(sil);

// clears all books for refresh
function clearBooks(){
    while (bookContent.firstChild){
        bookContent.removeChild(bookContent.firstChild)
    }
}

// builds library of each book
function buildLibrary() {
    clearBooks();
    let bookNumber = 0;
    myLibrary.forEach((book) => {
        
    let bookCard = document.createElement('article');
    bookCard.classList.add('book-card');
    
    let bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;

    let bookRow2 = document.createElement('div');
    bookRow2.classList.add('book-row2');

    let bookAuthor = document.createElement('span');
    bookAuthor.textContent = 'by: ' + book.author

    let bookPages = document.createElement('span');
    bookPages.textContent = book.pages + ' pages'

    let bookRow3 = document.createElement('div');
    bookRow3.classList.add('book-row3');

    if(book.read) {
        bookRow3.textContent = "You have read this book.";
    } else {
        bookRow3.textContent = "You have not read this book.";
    }
    
    let bookActions = document.createElement('div');
    bookActions.classList.add('book-actions');

    let bookRead = document.createElement('button')
    bookRead.textContent = 'Toggle Status';
    bookToggleId = 'tog'+bookNumber;
    bookRead.setAttribute('id', bookToggleId);

    let bookDelete = document.createElement('button')
    bookDelete.textContent = 'Delete Book';    
    bookDeleteId = 'del'+bookNumber;
    bookDelete.setAttribute("id", bookDeleteId);

    // add children

    bookCard.appendChild(bookTitle);

    bookRow2.appendChild(bookAuthor);
    bookRow2.appendChild(bookPages);
    bookCard.appendChild(bookRow2);

    bookCard.appendChild(bookRow3);

    bookActions.appendChild(bookRead);
    bookActions.appendChild(bookDelete);
    bookCard.appendChild(bookActions);

    bookContent.appendChild(bookCard);

    bookDeleteAction = document.getElementById(bookDeleteId);
    bookDeleteAction.addEventListener('click', () => {
        if(confirm('Delete ' + book.title + '?') == true) {
            removeBookFromLibrary(book);
            buildLibrary();
        }
      });

      bookToggleAction = document.getElementById(bookToggleId);
      bookToggleAction.addEventListener('click', () => {
          if(confirm('Toggle ' + book.title + ' read/unread?') == true) {
              book.toggleRead();
              buildLibrary();
          }
        });


    bookNumber ++;

    })
}

// console.log(myLibrary);

buildLibrary();