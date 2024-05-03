import { Card, CardBody, Text } from "@chakra-ui/react";

const BlogCard = ({ title, body, onClick }) => {
  return (
    <Card onClick={onClick} _hover={{cursor: 'pointer'}}>
      <CardBody>
        <Text>{title}</Text>
        <Text>{body}</Text>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
