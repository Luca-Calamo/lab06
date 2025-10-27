import { useState } from 'react';

export default function LoanForm({ books, onCreateLoan }) {
    const [borrower, setBorrower] = useState('');
    const [bookId, setBookId] = useState('');
    const [period, setPeriod] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + period * 7);
        onCreateLoan({
            borrower,
            bookId: bookId,
            dueDate: dueDate.toISOString().split('T')[0],
        });
        setBorrower('');
        setBookId('');
        setPeriod(1);
    };

    if (books.length === 0) {
        return <p>All books are currently on loan.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className='loan-form'>
            <div className='loan-form-fields'>
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
                        {books.map((book) => (
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
                        onChange={(e) => setPeriod(parseInt(e.target.value))}
                        required
                    />
                </div>
            </div>
            <button type='submit'>Create Loan</button>
        </form>
    );
}
