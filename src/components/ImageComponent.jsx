import { Image, Text, VStack } from "@chakra-ui/react";

const ImageComponent = ({
  title,
  src,
  width,
  height,
  openable,
  borderRadius,
}) => {
  const handleClick = () => {
    // Open the image in a new tab when clicked
    window.open(`${import.meta.env.VITE_SERVER_PORT}/${src}`, "_blank");
  };
  return (
    <VStack alignItems={"start"}>
      {title && <Text variant={"title1"}>{title}</Text>}

      <Image
        borderRadius={borderRadius}
        w={width}
        h={height}
        objectFit={"cover"}
        src={src}
        onClick={openable && handleClick}
        _hover={openable && { cursor: "pointer", filter: "blur(4px)" }}
      />
    </VStack>
  );
};

export default ImageComponent;
