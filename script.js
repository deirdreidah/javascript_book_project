let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;
    const imageInput = document.getElementById("image");
    const image = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : DEFAULT_IMAGE;

    if (!title || !author || !genre) {
        alert("All fields are required.");
        return;
    }

    const newBook = {
        id: Date.now().toString(),
        title,
        author,
        genre,
        status,
        favorite: false,
        image
    };
    books.push(newBook);
    saveBooks();
    displayBooks();
    alert("Book added successfully!");
    clearForm();
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Unread";
    document.getElementById("image").value = "";
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveBooks();
    displayBooks();
}

function editBook(index) {
    const book = books[index];
    const title = prompt('Edit title:', book.title);
    const author = prompt('Edit author:', book.author);
    const genre = prompt('Edit genre:', book.genre);
    const status = prompt('Edit status:', book.status);
    const image = prompt('Edit image URL:', book.image);
    const favorite = confirm('Is this book a favorite?');
  
    if (title && author && genre && status && image !== null) {
      books[index] = { ...book, title, author, genre, status, image, favorite };
      saveBooksToLocalStorage(); // Save to localStorage
      renderBooks();
    }
}

function toggleFavorite(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        book.favorite = !book.favorite;
        saveBooks();
        displayBooks();
    }
}

function displayBooks() {
    const all = document.getElementById("all");
    const favorites = document.getElementById("favorites");
    const unread = document.getElementById("unread");
    const read = document.getElementById("read");
    const reading = document.getElementById("reading");

    all.innerHTML = renderBooks(books);
    favorites.innerHTML = renderBooks(books.filter(book => book.favorite));
    unread.innerHTML = renderBooks(books.filter(book => book.status === "Unread"));
    read.innerHTML = renderBooks(books.filter(book => book.status === "Read"));
    reading.innerHTML = renderBooks(books.filter(book => book.status === "Reading"));
}

function renderBooks(bookArray) {
    return `<div class='d-flex flex-wrap gap-3'>` +
        bookArray.map(book => `
            <div class='card' style='width: 12rem;'>
                <img src='${book.image}' class='card-img-top' style='height: 180px; object-fit: cover;' alt='Book Cover'>
                <div class='card-body'>
                    <h5 class='card-title'>${book.title}</h5>
                    <p class='card-text'>${book.author}</p>
                    <small class='text-muted'>${book.genre} - ${book.status}</small><br>
                    <button class='btn btn-sm btn-warning me-1 mt-2' onclick="toggleFavorite('${book.id}')">
                        ${book.favorite ? 'favorite' : ''}
                    </button>
                    <button class='btn btn-sm btn-danger mt-2' onclick="deleteBook('${book.id}')">Delete</button>
                    <button class='btn btn-sm btn-danger mt-2' onclick="editBook('${book.id}')">Edit</button>
                </div>
            </div>
    `).join("") + `</div>`;
}

displayBooks();