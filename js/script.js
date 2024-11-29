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
        
        console.log('Fetching book description...');
        const descResponse = await fetch('static/books/AdvancesInFinancialML/description.txt');
        if (!descResponse.ok) {
            throw new Error(`HTTP error! status: ${descResponse.status}`);
        }
        
        const description = await descResponse.text();
        const lines = description.split('\n').map(line => line.trim()).filter(line => line);
        const [title, author, ...opinionLines] = lines;
        const opinion = opinionLines.join('\n');
        
        console.log('Creating book element with:', { title, author, opinion });
        const bookElement = document.createElement('div');
        bookElement.className = 'project-card';
        bookElement.innerHTML = `
            <h3>${title}</h3>
            <p class="book-author">by ${author}</p>
            <div class="project-image">
                <img src="static/books/AdvancesInFinancialML/cover.png" alt="${title} Cover">
            </div>
            <p class="book-opinion">${opinion}</p>
        `;
        booksContainer.appendChild(bookElement);
        console.log('Book element added to container');
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
