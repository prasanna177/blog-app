import { Card, CardBody, Text } from "@chakra-ui/react";

const BlogCard = ({ title, body }) => {
  return (
    <Card>
      <CardBody>
        <Text>{title}</Text>
        <Text>{body}</Text>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
