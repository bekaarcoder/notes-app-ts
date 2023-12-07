import { Modal } from 'react-bootstrap';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../api/notesApi';
import * as NotesApi from '../api/notesApi';

interface Props {
    noteToEdit?: Note;
    onDismiss: () => void;
    onNoteSaved: (note: Note) => void;
}

const AddNoteFormModal = ({ onDismiss, onNoteSaved, noteToEdit }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || '',
        },
    });

    const onSubmit = async (input: NoteInput) => {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show onHide={onDismiss} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? 'Update note' : 'Create a note'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className={`form-control ${
                                errors.title ? 'is-invalid' : ''
                            }`}
                            {...register('title', {
                                required: 'Note title is required',
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.title?.message}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className={`form-control ${
                                errors.text ? 'is-invalid' : ''
                            }`}
                            rows={5}
                            {...register('text')}
                        ></textarea>
                        <div className="invalid-feedback">
                            {errors.text?.message}
                        </div>
                    </div>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        aria-hidden="true"
                                    ></span>
                                    <span
                                        className="visually-hidden"
                                        role="status"
                                    >
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                <span>Save Note</span>
                            )}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNoteFormModal;
