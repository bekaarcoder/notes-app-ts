import { Note } from '../models/note';

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
};

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await fetchData('http://localhost:5050/api/notes', {
        method: 'GET',
    });
    return response.json();
};

export interface NoteInput {
    title: string;
    text?: string;
}

export const createNote = async (note: NoteInput): Promise<Note> => {
    const response = await fetchData('http://localhost:5050/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const deleteNote = async (noteId: string) => {
    await fetchData(`http://localhost:5050/api/notes/${noteId}`, {
        method: 'DELETE',
    });
};

export const updateNote = async (
    noteId: string,
    note: NoteInput
): Promise<Note> => {
    const response = await fetchData(
        `http://localhost:5050/api/notes/${noteId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        }
    );
    return response.json();
};
