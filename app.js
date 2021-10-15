let myLibrary = [];
let form = document.getElementById("book-form");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let addBookBtn = document.querySelector("#add-book");
let collection = document.querySelector(".collection");

if(!localStorage.length){
  populateStorage();
  console.log(localStorage);
}
else{
  displayLocalStorage();
}

addBookBtn.addEventListener("click", openModal);
form.addEventListener("submit", delegateBookInfo);
overlay.addEventListener("click", closeOverlay);
function closeOverlay(e) {
  modal.setAttribute("style", "display:none");
  overlay.setAttribute("style", "display:none");
}
function openModal(e) {
  modal.setAttribute("style", "display:block");
  overlay.setAttribute("style", "display:block");
}

function delegateBookInfo(e) {
  e.preventDefault();
  addBookForm = new FormData(this);
  let author = addBookForm.get("author");
  let bookName = addBookForm.get("book-name");
  let pages = addBookForm.get("pages");
  let hasRead = addBookForm.get("status");
  let bookExists = checkIfBookExists(bookName);
  if (!bookExists) {
    modal.setAttribute("style", "display:none");
    overlay.setAttribute("style", "display:none");
    this.reset();
    addBookToLibrary(author, bookName, pages, hasRead);
  }
}
function checkIfBookExists(bookName) {
  let bookExists;
  for (i = 0; i < myLibrary.length; i++) {
    if (bookName === myLibrary[i]["bookName"]) {
      alert("this book already exists");
      bookExists = true;
      return bookExists;
    }
  }
  return bookExists;
}

function populateStorage(){
  myLibrary.forEach((book)=> {
    localStorage.setItem(`${book.bookName}`,JSON.stringify(book));
  })
}
function displayLocalStorage(){
 
  /*localStorage.forEach((item)=>{
    myLibrary.push(JSON.parse(item));
    displayBook(JSON.parse(item));
  })*/
    for(i=0;i<localStorage.length;i++){
      myLibrary.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      displayBook(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

}

function Book(author, bookName, pages, hasRead) {
  this.author = author;
  this.bookName = bookName;
  this.pages = pages;
  this.hasRead = hasRead;
}
function addBookToLibrary(author, bookName, pages, hasRead) {
  let book = new Book(author, bookName, pages, hasRead);
  myLibrary.push(book);
  localStorage.setItem(`${bookName}`,JSON.stringify(book));
  displayBook(book);
}
function displayBook(book) {
  bookDiv = document.createElement("div");
  bookDiv.setAttribute(
    "style",
    "border: solid 2px black; border-radius:10px; padding:30px;width:300px; font-size:24px; font-weight:bold; text-align:center;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);"
  );
  bookTitle = document.createElement("p");
  bookAuthor = document.createElement("p");
  bookPages = document.createElement("p");
  bookReadStatus = document.createElement("button");
  bookReadStatus.setAttribute("style", "margin:10px");
  bookRemove = document.createElement("button");
  bookTitle.innerText = `${book.bookName}`;
  bookAuthor.innerText = `${book.author}`;
  bookPages.innerText = `${book.pages}`;
  if (book.hasRead === "true") bookReadStatus.innerText = "Read";
  else bookReadStatus.innerText = "Not read";
  bookRemove.innerText = "Remove";
  bookDiv.append(bookTitle);
  bookDiv.append(bookAuthor);
  bookDiv.append(bookPages);
  bookDiv.append(bookReadStatus);
  bookDiv.append(bookRemove);
  collection.append(bookDiv);
  bookReadStatus.addEventListener("click", changeStatus);
  bookRemove.addEventListener("click", removeBook);
  //console.log(myLibrary);
  //console.log(myLibrary[0]['bookName'])
}
function changeStatus(e) {
  if (this.innerText === "Read") this.innerText = "Not read";
  else this.innerText = "Read";
}
function removeBook(e) {
  //console.log(myLibrary['bookname'])
  let bookToRemove = e.target.parentNode.childNodes[0].innerText;
  myLibrary = myLibrary.filter((book) => book.bookName !== bookToRemove);
  console.log(myLibrary);
  localStorage.removeItem(`${bookToRemove}`);

  //index = myLibrary['bookName'].indexOf(e.target.parentNode.childNodes[0].innerText);
  collection.removeChild(e.target.parentNode);
}
