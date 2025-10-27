export default function LoanList({ loans, books }) {
    return (
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
                                Due: {loan.dueDate}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
