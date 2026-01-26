import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import {
  Container,
  Box,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "@/providers/AuthContext";

import PostsTabContent from "../Components/PostTabContent";
import BioTabContent from "../Components/BioTabContent";
import ProfileHeader from "../Sections/ProfileHeader";

// Import other tab contents similarly

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef((props: any, ref: any) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({ firstFieldRef, onCancel }: any) => {
  return (
    <Stack spacing={4}>
      <TextInput id="first-name" ref={firstFieldRef} defaultValue="John" />
      <TextInput id="last-name" defaultValue="Smith" />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const EditProfile: NextPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { gsUser } = useAuth();
  // Function to handle tab change
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BioTabContent />;
      case 1:
        return <PostsTabContent />;

      // Add other cases as necessary
      default:
        return null;
    }
  };

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <Container>
      <ProfileHeader gsUser={gsUser} />
      <Box marginTop={0}>{renderTabContent()}</Box>
    </Container>
  );
};

export default EditProfile;
