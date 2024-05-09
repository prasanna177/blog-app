import {
  Avatar,
  Box,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createImageFromInitials } from "../../utils";
import { useNavigate } from "react-router-dom";

const ReactionModal = ({
  isOpen,
  onClose,
  likedReactions,
  dislikedReactions,
}) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reactions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Likes ({likedReactions?.length})</Tab>
              <Tab>Dislikes ({dislikedReactions?.length})</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack alignItems={"stretch"}>
                  {likedReactions?.map((reaction) => (
                    <Box key={reaction.id}>
                      <HStack
                        onClick={() => navigate(`/profile/${reaction.user.id}`)}
                        _hover={{ cursor: "pointer", bg: "gray.0" }}
                      >
                        <Avatar
                          size={"sm"}
                          src={
                            reaction.user.profilePic ||
                            createImageFromInitials(reaction.user.name)
                          }
                        ></Avatar>
                        <Text>{reaction.user.name}</Text>
                        <Text>Liked</Text>
                      </HStack>
                      <Divider />
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                {dislikedReactions?.map((reaction) => (
                  <Box mb={5} key={reaction.id}>
                    <HStack
                      onClick={() => navigate(`/profile/${reaction.user.id}`)}
                      _hover={{ cursor: "pointer", bg: "gray.0" }}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          reaction.user.profilePic ||
                          createImageFromInitials(reaction.user.name)
                        }
                      ></Avatar>
                      <Text>{reaction.user.name}</Text>
                      <Text>Disliked</Text>
                    </HStack>
                    <Divider />
                  </Box>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReactionModal;
