import {
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const TextareaField = ({
  readOnly,
  value,
  flex,
  name,
  errors,
  register,
  placeholder,
  type,
  disabled,
  label,
  hasLabel,
  isNotRequired,
  width,
}) => {
  return (
    <VStack flex={flex} alignItems={"start"} w={"100%"}>
      <Text variant={"subtitle1"}>
        {hasLabel && !isNotRequired && <span style={{ color: "red" }}>* </span>}
        {label}
      </Text>
      <FormControl isInvalid={Boolean(errors)}>
        <Textarea
          readOnly={readOnly}
          value={value}
          maxW={width}
          disabled={disabled}
          type={type}
          {...(register && register(name))}
          placeholder={placeholder}
        />
        {errors && <FormErrorMessage>{errors}</FormErrorMessage>}
      </FormControl>
    </VStack>
  );
};

export default TextareaField;
