import { useState } from 'react';

export default function LoanManager({ books, loans, onCreateLoan }) {
    const [borrower, setBorrower] = useState('');
    const [bookId, setBookId] = useState('');
    const [period, setPeriod] = useState(1);

    const availableBooks = books.filter(
        (book) => !loans.some((loan) => loan.bookId === book.isbn13)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + period * 7);

        onCreateLoan({
            borrower,
            bookId,
            dueDate: dueDate.toISOString().split('T')[0],
        });

        setBorrower('');
        setBookId('');
        setPeriod(1);
    };

    return (
        <div className='loan-manager'>
            {availableBooks.length === 0 ? (
                <p className='no-books-message'>
                    All books are currently on loan.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className='loan-form'>
                    <div className='form-group'>
                        <label htmlFor='borrower'>Borrower:</label>
                        <input
                            type='text'
                            id='borrower'
                            value={borrower}
                            onChange={(e) => setBorrower(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='book'>Book:</label>
                        <select
                            id='book'
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                        >
                            <option value=''>Select a book</option>
                            {availableBooks.map((book) => (
                                <option key={book.isbn13} value={book.isbn13}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='period'>Loan Period (weeks):</label>
                        <input
                            type='number'
                            id='period'
                            min='1'
                            max='4'
                            value={period}
                            onChange={(e) =>
                                setPeriod(parseInt(e.target.value))
                            }
                            required
                        />
                    </div>
                    <button type='submit' className='btn primary'>
                        Create Loan
                    </button>
                </form>
            )}

            <div className='loan-list'>
                <h2>Loaned Books</h2>
                {loans.length === 0 ? (
                    <p>No books are currently on loan.</p>
                ) : (
                    <ul>
                        {loans.map((loan) => {
                            const book = books.find(
                                (b) => b.isbn13 === loan.bookId
                            );
                            return (
                                <li key={loan.bookId}>
                                    <strong>{book.title}</strong> borrowed by{' '}
                                    {loan.borrower}
                                    <br />
                                    Due date: {loan.dueDate}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
