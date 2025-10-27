function Book({ book, onSelect, isOnLoan }) {
    return (
        <div
            className={`container ${book.selected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            {book.image && (
                <div className='image'>
                    <img src={book.image} alt={book.title} />
                </div>
            )}
            <div className='info'>
                <h3>{book.title}</h3>
                <p className='author'>{book.author}</p>
                <p className='price'>{book.price}</p>
                {isOnLoan && <p className='loan-status'>On Loan</p>}
            </div>
        </div>
    );
}

export default Book;
