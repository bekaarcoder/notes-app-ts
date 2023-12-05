import { useEffect, useState } from 'react';
import './App.css';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5050/api/notes',
                    {
                        method: 'GET',
                    }
                );
                const notes = await response.json();
                console.log(notes);
                setNotes(notes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Notes App</h1>
                </div>
            </div>
            <div className="row">
                {notes.map((note) => (
                    <div className="col-lg-4" key={note._id}>
                        <Note note={note} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
