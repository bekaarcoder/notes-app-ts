import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
    title: string;
    children: ReactNode;
    onDismiss: () => void;
}

const AppModal = ({ title, children, onDismiss }: Props) => {
    return (
        <Modal show centered onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default AppModal;
