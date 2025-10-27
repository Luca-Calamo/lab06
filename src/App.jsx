import { useState } from 'react';
import Book from './Book';
import Header from './Header';
import New from './New';
import Footer from './Footer';
import Modal from './Modal';
import ProductForm from './ProductForm';
import LoanManager from './LoanManager';
import './App.css';

function App() {
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem('books');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

    const [loans, setLoans] = useState(() => {
        const savedLoans = localStorage.getItem('loans');
        return savedLoans ? JSON.parse(savedLoans) : [];
    });

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('all');
    const [showLoanManager, setShowLoanManager] = useState(false);

    const handleBookSubmit = (formData) => {
        const newBook = {
            ...formData,
            isbn13: Date.now().toString(),
            price: '$0.00',
            url: formData.image || '',
            image: formData.image || '',
            selected: false,
        };
        setBooks((prevBooks) => {
            const newBooks = [newBook, ...prevBooks];
            localStorage.setItem('books', JSON.stringify(newBooks));
            return newBooks;
        });
    };
    const handleBookSelect = (isbn13) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => ({
                ...book,
                selected: book.isbn13 === isbn13 ? !book.selected : false,
            }))
        );
        setSelectedBookId((prevSelectedId) =>
            prevSelectedId === isbn13 ? null : isbn13
        );
    };

    const handleDeleteBook = () => {
        if (selectedBookId) {
            setBooks((prevBooks) => {
                const newBooks = prevBooks.filter(
                    (book) => book.isbn13 !== selectedBookId
                );
                localStorage.setItem('books', JSON.stringify(newBooks));
                return newBooks;
            });
            setSelectedBookId(null);
        }
    };

    const handleUpdateBook = (formData) => {
        if (selectedBookId) {
            setBooks((prevBooks) => {
                const newBooks = prevBooks.map((book) => {
                    if (book.isbn13 === selectedBookId) {
                        return {
                            ...book,
                            ...formData,
                            image: formData.image || book.image,
                            url: formData.image || book.url,
                        };
                    }
                    return book;
                });
                localStorage.setItem('books', JSON.stringify(newBooks));
                return newBooks;
            });
            setSelectedBookId(null);
        }
    };

    const handleCreateLoan = (loanData) => {
        setLoans((prevLoans) => {
            const newLoans = [...prevLoans, loanData];
            localStorage.setItem('loans', JSON.stringify(newLoans));
            return newLoans;
        });
    };

    return (
        <div className='page'>
            <Header />
            <div className='content'>
                {showLoanManager ? (
                    <div className='loan-manager-section'>
                        <div className='button-column loan-manager-button'>
                            <button
                                className='manage-loans-btn'
                                onClick={() => setShowLoanManager(false)}
                            >
                                Show Book Catalog
                            </button>
                        </div>
                        <LoanManager
                            books={books}
                            loans={loans}
                            onCreateLoan={handleCreateLoan}
                        />
                    </div>
                ) : (
                    <>
                        <div className='new_grid'>
                            <New title='New' onSubmit={handleBookSubmit} />
                            <div className='button-column'>
                                <button
                                    className='manage-loans-btn'
                                    onClick={() =>
                                        setShowLoanManager(!showLoanManager)
                                    }
                                >
                                    Manage Loans
                                </button>
                                <input
                                    type='text'
                                    placeholder='Search books...'
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className='search-input'
                                />
                                <select
                                    value={filterLanguage}
                                    onChange={(e) =>
                                        setFilterLanguage(e.target.value)
                                    }
                                    className='language-filter'
                                >
                                    <option value='all'>All Languages</option>
                                    {[
                                        ...new Set(
                                            books.map((book) => book.language)
                                        ),
                                    ]
                                        .filter(Boolean)
                                        .sort()
                                        .map((lang) => (
                                            <option key={lang} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                </select>
                                <Modal
                                    btnLabel='Edit'
                                    btnClassName='btn secondary'
                                    disabled={!selectedBookId}
                                >
                                    {(closeModal) => {
                                        const selectedBook = books.find(
                                            (book) =>
                                                book.isbn13 === selectedBookId
                                        );
                                        return (
                                            <ProductForm
                                                onSubmit={(formData) => {
                                                    handleUpdateBook(formData);
                                                    closeModal();
                                                }}
                                                onClose={closeModal}
                                                initialData={selectedBook}
                                            />
                                        );
                                    }}
                                </Modal>
                                <button
                                    className='btn danger'
                                    onClick={handleDeleteBook}
                                    disabled={!selectedBookId}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className='books-grid'>
                            {books
                                .filter(
                                    (book) =>
                                        (filterLanguage === 'all' ||
                                            book.language === filterLanguage) &&
                                        (searchTerm === '' ||
                                            book.title
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            book.author
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            book.publisher
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ))
                                )
                                .map((book) => (
                                    <Book
                                        key={book.isbn13}
                                        book={book}
                                        onSelect={() =>
                                            handleBookSelect(book.isbn13)
                                        }
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
            <Footer text='Luca Calamo 2025' />
        </div>
    );
}

export default App;
