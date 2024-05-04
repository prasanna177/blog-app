import {
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
} from "@chakra-ui/react";

const ReactionModal = ({
  isOpen,
  onClose,
  likedReactions,
  dislikedReactions,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reactions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Likes</Tab>
              <Tab>Dislikes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {likedReactions?.map((reaction) => (
                  <>
                    <HStack key={reaction.id}>
                      <Text>{reaction.user}</Text>
                      <Text>Liked</Text>
                    </HStack>
                    <Divider />
                  </>
                ))}
              </TabPanel>
              <TabPanel>
                {dislikedReactions?.map((reaction) => (
                  <HStack key={reaction.id}>
                    <Text>{reaction.user}</Text>
                    <Text>Disliked</Text>
                  </HStack>
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
