import React, { useState } from 'react';
import BookShow from './BookShow';
import useBooksContext from '../hooks/use-books-context';
import Modal from './Modal';

function BookList() {
    const { books } = useBooksContext();
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState();
    const { deleteBookById } = useBooksContext();

    const handleClose = () => {
        setShowModal(false);
    };

    const handleClick = (book) => {
        setShowModal(!showModal);
        setEditData(book);
    };

    const handleDelete = (book) => {
        deleteBookById(book.id);
    };

    const renderedBooks = books.map((book) => {
        return <BookShow key={book.id} book={book} />;
    });

    const renderedBooksTable = books.map((book) => {
        return (
            <tr key={book.id} className="bg-white border-b ">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                    {book.title}
                </th>
                <td className="px-6 py-4">
                    <p
                        onClick={() => handleClick(book)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </p>
                </td>
                <td className="px-6 py-4">
                    <p
                        onClick={() => handleDelete(book)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Delete
                    </p>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="book-list">{renderedBooks}</div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderedBooksTable}</tbody>
                </table>
            </div>
            {showModal && (
                <Modal onClose={handleClose} editData={editData}>
                    {console.log(editData)}
                </Modal>
            )}
        </>
    );
}

export default BookList;
