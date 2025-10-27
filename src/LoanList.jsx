export default function LoanList({ books, loans }) {
    return (
        <div className='loan-list'>
            <h2>Loaned Books</h2>
            {loans.length === 0 ? (
                <p className='no-loans-message'>
                    No books are currently on loan.
                </p>
            ) : (
                <ul className='loans-list'>
                    {loans.map((loan) => {
                        const book = books.find(
                            (b) => b.isbn13 === loan.bookId
                        );
                        return (
                            <li key={loan.bookId} className='loan-item'>
                                <strong>{book?.title || 'Unknown Book'}</strong>
                                <div className='loan-details'>
                                    Borrowed by: {loan.borrower}
                                    <br />
                                    Due date: {loan.dueDate}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
