import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';

interface NoteProps {
    note: NoteModel;
    handleDelete: (note: NoteModel) => void;
    handleUpdate: (note: NoteModel) => void;
}

const Note = ({ note, handleDelete, handleUpdate }: NoteProps) => {
    const dateText =
        note.updatedAt > note.createdAt
            ? `Updated: ${formatDate(note.updatedAt)}`
            : `Created: ${formatDate(note.createdAt)}`;

    return (
        <div className="card text-bg-light h-100">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                {note.text && <p className="card-text">{note.text}</p>}
            </div>
            <div className="card-footer text-body-secondary d-flex align-items-center justify-content-between">
                <small>{dateText}</small>
                <div>
                    <FaPenToSquare
                        className="text-primary link-item me-2"
                        onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            handleUpdate(note);
                        }}
                    />
                    <FaTrash
                        className="text-danger link-item"
                        onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            handleDelete(note);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Note;
