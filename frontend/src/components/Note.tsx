import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
    note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
    const dateText =
        note.updatedAt > note.createdAt
            ? `Updated: ${formatDate(note.updatedAt)}`
            : `Created: ${formatDate(note.createdAt)}`;

    return (
        <div className="card my-3 text-bg-light ">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                {note.text && <p className="card-text">{note.text}</p>}
            </div>
            <div className="card-footer text-body-secondary">
                <small>{dateText}</small>
            </div>
        </div>
    );
};

export default Note;
