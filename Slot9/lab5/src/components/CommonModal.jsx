//CommonModal.jsx - Modal component dùng chung với props title và body
//Component Modal tái sử dụng để hiển thị thông tin
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CommonModal({ show, handleClose, title, body }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CommonModal;
