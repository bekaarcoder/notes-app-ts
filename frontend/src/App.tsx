import { useEffect, useState } from 'react';
import './App.css';
import * as NotesApi from './api/notesApi';
import AddNoteFormModal from './components/AddNoteFormModal';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState<NoteModel | null>(null);

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
                const notes = await NotesApi.fetchNotes();
                console.log(notes);
                setNotes(notes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="container my-4">
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
            <div className="row">
                {notes.map((note) => (
                    <div className="col-lg-4 my-3" key={note._id}>
                        <Note
                            note={note}
                            handleDelete={deleteNote}
                            handleUpdate={setNoteToUpdate}
                        />
                    </div>
                ))}
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
                                n._id === updatedNote._id ? updatedNote : n
                            )
                        );
                        setNoteToUpdate(null);
                    }}
                />
            )}
        </div>
    );
}

export default App;
