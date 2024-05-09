import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { getDateAndTime } from "../utils";
import ImageComponent from "../components/ImageComponent";

const EditHistory = () => {
  const params = useParams();
  const [editHistory, setEditHistory] = useState([]);
  console.log(editHistory, "ee");

  const fetchEditHistory = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Posts/postEditLogs/${params.id}`
      );
      setEditHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEditHistory();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Edit history"}>
      {editHistory.length > 0 ? (
        <VStack>
          {editHistory?.map((item) => (
            <React.Fragment key={item.id}>
              <VStack align={"start"}>
                <Text>{getDateAndTime(item.updatedAt)}</Text>
              </VStack>
              <Grid w={"100%"} templateColumns="repeat(2, 1fr)" gap={"16px"}>
                <GridItem>
                  <VStack align={"stretch"}>
                    <Text variant={"heading1"}>Before edit</Text>
                    <Text>{item.oldTitle}</Text>
                    <ImageComponent width={"400px"} src={item.oldImages} />
                    <Text>{item.oldBody}</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align={"stretch"}>
                    <Text variant={"heading1"}>After edit</Text>
                    <Text>{item.newTitle}</Text>
                    <ImageComponent width={"400px"} src={item.newImages} />
                    <Text>{item.newBody}</Text>
                  </VStack>
                </GridItem>
              </Grid>
            </React.Fragment>
          ))}
        </VStack>
      ) : (
        <Box>
          <Text>No edits made on this blog</Text>
        </Box>
      )}
    </Layout>
  );
};

export default EditHistory;
