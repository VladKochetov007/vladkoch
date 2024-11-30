document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

async function loadBooks() {
    try {
        const booksContainer = document.getElementById('books-container');
        if (!booksContainer) {
            console.error('Books container not found');
            return;
        }

        console.log('Fetching books data...');
        const booksResponse = await fetch('static/books/books.json');
        if (!booksResponse.ok) {
            throw new Error(`HTTP error! status: ${booksResponse.status}`);
        }

        const data = await booksResponse.json();
        const books = data.books;
        
        for (const book of books) {
            console.log('Creating book element:', book);
            const bookElement = document.createElement('div');
            bookElement.className = 'project-card';
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="project-image">
                    <img src="static/books/${book.folder}/cover.png" alt="${book.title} Cover">
                </div>
                <p class="book-opinion">${book.opinion}</p>
            `;
            booksContainer.appendChild(bookElement);
        }
        console.log('All books added to container');
    } catch (error) {
        console.error('Error loading books:', error);
        const booksContainer = document.getElementById('books-container');
        if (booksContainer) {
            booksContainer.innerHTML = `<p style="color: red;">Error loading books: ${error.message}</p>`;
        }
    }
}

// Убедимся, что DOM полностью загружен
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting to load books...');
    loadBooks();
});
