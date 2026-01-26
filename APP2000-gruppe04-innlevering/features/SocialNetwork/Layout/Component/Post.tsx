import {
  Flex,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Avatar,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  ChatBubbleOutline,
  MoreVert,
  Share,
  ThreeDRotation,
  ThumbUpOffAlt,
} from "@mui/icons-material";

/**
 * @description Post er et komponent som viser frem et innlegg i en feed.
 * @author  Borgar Flaen Stensrud
 *
 */

const Post = ({ post }: any) => {
  console.log("Post", post);
  return (
    <Card maxW="70%">
      <CardHeader>
        <Flex className="">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={post?.user?.username}
              src={post?.user?.profilePicture ? post?.user?.profilePicture : ""}
            />

            <Box>
              <Heading size="sm">{post?.user?.username}</Heading>
              <Text>Elo: {post?.user?.elo?.rating}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<MoreVert />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{post?.description}</Text>
        <Text color="blue">{post?.tags?.map((tag: string) => tag + " ")}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<ThumbUpOffAlt />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ChatBubbleOutline />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<Share />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
