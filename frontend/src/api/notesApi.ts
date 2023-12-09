import {
    BadRequestError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from '../errors/HttpError';
import { Note } from '../models/note';
import { User } from '../models/user';

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 404) {
            throw new NotFoundError(errorMessage);
        } else if (response.status === 403) {
            throw new ForbiddenError(errorMessage);
        } else if (response.status === 400) {
            throw new BadRequestError(errorMessage);
        } else {
            throw new Error(`Error ${response.status}: Something went wrong`);
        }
    }
};

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await fetchData('/api/notes', {
        method: 'GET',
    });
    return response.json();
};

export interface NoteInput {
    title: string;
    text?: string;
}

export const createNote = async (note: NoteInput): Promise<Note> => {
    const response = await fetchData('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const deleteNote = async (noteId: string) => {
    await fetchData(`/api/notes/${noteId}`, {
        method: 'DELETE',
    });
};

export const updateNote = async (
    noteId: string,
    note: NoteInput
): Promise<Note> => {
    const response = await fetchData(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const getLoggedInUser = async (): Promise<User> => {
    const response = await fetchData('/api/users', {
        method: 'GET',
    });
    return response.json();
};

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
    const response = await fetchData('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export interface SignInCredentials {
    username: string;
    password: string;
}

export const signIn = async (credentials: SignInCredentials): Promise<User> => {
    const response = await fetchData('/api/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const logout = async () => {
    await fetchData('/api/users/logout', {
        method: 'POST',
    });
};
