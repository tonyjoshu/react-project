import Modal from "@mui/material/Modal";
import Column from "./Column";

function ModalPopUp({
  open,
  handleClose,
  children,
  width,
  height,
  verticalCenter,
})
{
  return (
    <Modal
      open={ open }
      onClose={ handleClose }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Column
        j_center={ verticalCenter }
        style={ {
          backgroundColor: "whitesmoke",
          width: width ?? 700,
          maxHeight: 1200,
          height: height ?? "95%",
          overflowY: "scroll",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 10,
          padding: 50,
        } }
      >
        { children ?? "" }
      </Column>
    </Modal>
  );
}

export default ModalPopUp;
