import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const DeleteComment = ({ isOpen, onClose, handleDelete, body }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant={"subtitle1"}>{body}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleDelete}
            variant="ghost"
            bg={"error.100"}
            color={"white"}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteComment;
