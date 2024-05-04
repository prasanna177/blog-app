import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { BiReplyAll } from "react-icons/bi";
import logo from "../assets/react.svg";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";

export default function Component() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleCommentsOpen = () => {
    setIsCommentsOpen(true);
    // Add logic to load comments here
  };

  const handleCloseComments = () => {
    setIsCommentsOpen(false);
  };

  return (
    <div className="bg-[#00000015] text-black p-4 rounded-md max-w-4xl mx-auto">
      <div className="flex items-center mb-1">
        <span className="text-xs font-medium">User Name</span>
        <span className="text-xs font-medium">· 19 hr. ago</span>
        <Button className="ml-auto text-xs" size="sm" variant="ghost"></Button>
        <AiOutlineEllipsis className="text-black ml-2 w-7 h-7" />
      </div>
      <div className="flex items-center justify-center mt-6 mb-3">
        <img
          src={logo}
          alt="React logo"
          width={300}
          height={300}
          className="rounded-md"
        />
      </div>
      <h2 className="text-lg font-bold mt-4 mb-2">
        Discussion Thread: US Supreme Court Hears Oral Argument in a Case About
        Presidential Immunity From Prosecution
      </h2>
      <p className="text-sm mb-4">
        Per a legal database, the questions at issue in today's case are: "Does
        a former president enjoy presidential immunity from criminal prosecution
        for conduct alleged to involve official acts during his tenure in
        office, and if so, to what extent?" Oral argument is scheduled to begin
        at 10 a.m. Eastern. Newsjbasjidv sa vjd oid oivdo fioweoi wqeiofpqwoqwo
        jsadf[oiAHI EI OIWEGIOWQE OIGQWEIGH]
      </p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaRegArrowAltCircleUp className="text-black h-6 w-6" />
          <span className="text-sm">5.3K</span>
          <FaRegArrowAltCircleDown className="text-black ml-1 h-6 w-6" />
        </div>
        <div className="flex items-center">
          <Button
            onClick={handleCommentsOpen}
            className="text-black mr-1"
            size="sm"
            leftIcon={<FiMessageCircle />}
            variant="link"
          >
            Comments
          </Button>
        </div>
      </div>

      <Modal isOpen={isCommentsOpen} onClose={handleCloseComments} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add logic to load comments here */}
            {/* Example: <CommentsList /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
