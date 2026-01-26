import { useAuth } from "@/providers/AuthContext";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { Add, Delete } from "@mui/icons-material";
import { Image } from "@nextui-org/react";
import axios from "axios";
import mongoose from "mongoose";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import Text from "@features/Common/Components/Text/text";
import getServer from "@/getServer";
interface ImageProps {
  file: File;
  preview: string;
  name: string;
  description?: string;
  library?: mongoose.Types.ObjectId;
}

const SelectProfilePhotoFromPhotoLibraryComponent = (
  btnRef: any,
  isOpen: any
) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [library, setLibrary] = useState<string>("");
  const { onOpen, onClose } = useDisclosure();
  const { gsUser } = useAuth();
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    // Process each file separately
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Update state with each loaded file
        const image = {
          file: file,
          preview: reader.result as string,
          name: file.name,
          description: "",
          library: "",
        };
        setImages((prevImages) => [...prevImages, image]);
      };

      reader.readAsDataURL(file);
    });
    onOpen();
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          // Update state with each loaded file
          const image = {
            file: file,
            preview: reader.result as string,
            name: file.name,
            description: "",
          };
          setImages((prevImages) => [...prevImages, image]);
        };

        reader.readAsDataURL(file);
      });
    }
  };
  const updateImage = (index: number, updates: Partial<ImageProps>) => {
    setImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? { ...img, ...updates } : img))
    );
  };

  const onDescriptionChange = (index: number, description: string) => {
    updateImage(index, { description });
  };

  const onNameChange = (index: number, name: string) => {
    updateImage(index, { name });
  };

  const onUpload = async () => {
    // Upload images to the server
    console.log(images);
    const imagesForUpload = images.map((image) => ({
      file: image.file,
      name: image.name,
      description: image.description || "",
      library: library || "",
    }));
    const formData = new FormData();
    imagesForUpload.forEach((image) => {
      formData.append("images", image.file);
    });
    await axios
      .post(getServer() + "/upload/" + gsUser.username, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"xxl"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className="text-secondary" />
        <DrawerHeader className="bg-dark p-4 text-secondary">
          Upload your photos
        </DrawerHeader>

        <DrawerBody className="flex flex-col gap-3">
          <Text variant="h2" size="4xl" className="mt-5 mb-5">
            Select a photo library
          </Text>
          <div
            className="flex flex-row gap-5 flex-wrap"
            style={{ width: "1000px" }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                className="flex flex-col gap-3 cursor-pointer  shadow-lg hover:shadow-2xl transition duration-150 ease-in-out rounded-b-lg"
                key={index}
              >
                <Text
                  color="white"
                  className="px-4 py-2 text-secondary bg-dark"
                >
                  Photo Library: nr.{index}
                </Text>
                <div className="rounded-b-lg">
                  <Image
                    src="https://picsum.photos/300/300"
                    width={300}
                    alt="Library Picture"
                    isZoomed
                    radius="none"
                  />
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => onUpload()}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectProfilePhotoFromPhotoLibraryComponent;
