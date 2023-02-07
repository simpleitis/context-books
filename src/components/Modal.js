import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useBooksContext from '../hooks/use-books-context';

function Modal({ onClose, editData }) {
    const [newTitle, setNewTitle] = useState(editData.title);
    const { editBookById } = useBooksContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        editBookById(editData.id, newTitle);
        onClose();
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-gray-300 opacity-80"
            ></div>
            <div className="fixed inset-40 p-10 bg-white">
                <div className="flex flex-col justify-between h-full">
                    <form onSubmit={handleSubmit}>
                        <label>Title: </label>
                        <input
                            className="border"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <button className="mx-10 border">Submit</button>
                    </form>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;
