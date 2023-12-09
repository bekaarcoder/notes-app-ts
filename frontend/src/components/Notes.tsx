import { useEffect, useState } from 'react';
import AddNoteFormModal from './AddNoteFormModal';
import Note from './Note';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../api/notesApi';
import AppSpinner from './AppSpinner';

const Notes = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState<NoteModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const deleteNote = async (note: NoteModel) => {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter((n) => n._id !== note._id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-between">
                    <h1>Notes App</h1>
                    <button
                        className="btn btn-sm btn-dark"
                        onClick={() => setShowModal(true)}
                    >
                        Create Note
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="row">
                    <div className="col-md-12 text-center">
                        <AppSpinner />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        {notes.length > 0 &&
                            notes.map((note) => (
                                <div className="col-lg-4 my-3" key={note._id}>
                                    <Note
                                        note={note}
                                        handleDelete={deleteNote}
                                        handleUpdate={setNoteToUpdate}
                                    />
                                </div>
                            ))}
                        {notes.length < 1 && (
                            <div className="col-md-12 my-3">
                                <p className="text-center">
                                    You don't have any notes.
                                </p>
                            </div>
                        )}
                    </div>

                    {showModal && (
                        <AddNoteFormModal
                            onDismiss={() => setShowModal(false)}
                            onNoteSaved={(newNote) => {
                                setNotes([...notes, newNote]);
                                setShowModal(false);
                            }}
                        />
                    )}

                    {noteToUpdate && (
                        <AddNoteFormModal
                            onDismiss={() => setNoteToUpdate(null)}
                            noteToEdit={noteToUpdate}
                            onNoteSaved={(updatedNote) => {
                                setNotes(
                                    notes.map((n) =>
                                        n._id === updatedNote._id
                                            ? updatedNote
                                            : n
                                    )
                                );
                                setNoteToUpdate(null);
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Notes;
