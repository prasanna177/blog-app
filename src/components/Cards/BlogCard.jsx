import { Card, CardBody, Text, Image, Box } from "@chakra-ui/react";

const BlogCard = ({ title, body, date, image, onClick }) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "300px",
        background: "#DADCE7",
      }}
      onClick={onClick}
      _hover={{ cursor: "pointer" }}
    >
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" mb={2} fontFamily="heading">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={2} fontFamily="body">
          {date}
        </Text>
        {image && (
          <Box mb={4} style={{ width: "260px", height: "200px" }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.375rem",
              }}
              src={image}
              alt={title}
            />
          </Box>
        )}

        <Text fontSize="md" fontFamily="body">
          {body}
        </Text>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
