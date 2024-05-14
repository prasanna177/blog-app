import { Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, pageSize, totalPosts, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <HStack spacing={4} justify="center" mt={8}>
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        colorScheme="blue"
        variant="outline"
      >
        Previous
      </Button>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        colorScheme="blue"
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
