import { useForm } from 'react-hook-form';
import * as NotesApi from '../api/notesApi';
import { NoteInput } from '../api/notesApi';
import { Note } from '../models/note';
import AppModal from './AppModal';
import TextAreaInputField from './form/TextAreaInputField';
import TextInputField from './form/TextInputField';

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
        <AppModal
            title={noteToEdit ? 'Update note' : 'Create a note'}
            onDismiss={onDismiss}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="title"
                    label="Title"
                    type="text"
                    register={register}
                    registerOptions={{ required: 'Title is required' }}
                    error={errors.title}
                />
                <TextAreaInputField
                    name="text"
                    label="Description"
                    rows={5}
                    register={register}
                />
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
                                <span className="visually-hidden" role="status">
                                    Loading...
                                </span>
                            </>
                        ) : (
                            <span>Save Note</span>
                        )}
                    </button>
                </div>
            </form>
        </AppModal>
    );
};

export default AddNoteFormModal;
