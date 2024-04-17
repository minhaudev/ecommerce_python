import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const ConfirmToast = ({ onClose, onConfirm }) => {
  const handleCancel = () => {
    onClose();
  };
  const handlerOnConfirm = async () => {
    onConfirm();
    setTimeout(() => {
      onClose();
    }, 100);
  };
  return (
    <>
      <div className="toast-body">Are you sure delete this product?</div>

      <div className="toast-footer  justify-content-center">
        <Row>
          <Col className="">
            <Button variant="secondary" onClick={handlerOnConfirm}>
              Ok
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConfirmToast;
