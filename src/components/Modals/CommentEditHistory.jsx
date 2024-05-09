import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getDateAndTime } from "../../utils";

const CommentEditHistory = ({ isOpen, onClose, editHistory }) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit history</ModalHeader>
          <ModalCloseButton />
          <ModalBody pr={0}>
            <Box
              maxH="50vh"
              overflowY="auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "gray.200 white",
              }}
            >
              {editHistory.length > 0 ? (
                <VStack alignItems={"stretch"}>
                  {editHistory?.map((item) => (
                    <Box key={item.id}>
                      <Text>
                        {item.oldContent} edited to {item.newContent}
                      </Text>
                      <HStack fontSize={"sm"} color={"gray.100"}>
                        <i className="fa-regular fa-clock"></i>
                        <Text>
                          {item.updatedAt && getDateAndTime(item.updatedAt)}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>No edits made</Text>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentEditHistory;
