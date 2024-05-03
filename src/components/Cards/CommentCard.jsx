import { Card, CardBody, Text } from "@chakra-ui/react";
import { getDateAndTime } from "../../utils";
// import { useEffect } from "react";
// import axios from "axios";

const CommentCard = ({ content, user, createdAt }) => {
  // const fetchCommentor = async () => {
  //   const response = await axios.get()
  // }

  // useEffect(() => {
  //   fetchCommentor()
  // })
  return (
    <Card>
      <CardBody bg={'red'}>
        <Text>User:{user}</Text>
        <Text>Date: {getDateAndTime(createdAt)}</Text>
        <Text>Comment: {content}</Text>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
