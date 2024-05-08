import { Box, Image, Input, Text, VStack } from "@chakra-ui/react";
import ImagePlaceholder from "../assets/images/image_placeholder.png";
import { useRef } from "react";

const ImageInput = ({ width, height, text, image, handleImageChange }) => {
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  return (
    <>
      <VStack alignItems={"start"}>
        <Text variant={"subtitle1"}>{text}</Text>
        <Box
          border={"1px"}
          borderStyle={"dashed"}
          _hover={{ cursor: "pointer" }}
          onClick={handleImageClick}
        >
          {image ? (
            <Image
              width={width}
              h={height}
              objectFit={"cover"}
              src={
                typeof image === "object"
                  ? URL.createObjectURL(image)
                  : typeof image === "string"
                  ? image
                  : true
              }
            />
          ) : (
            <Image
              width={width}
              h={height}
              objectFit={"cover"}
              src={ImagePlaceholder}
            />
          )}
          <Input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
          />
        </Box>
      </VStack>
    </>
  );
};

export default ImageInput;
