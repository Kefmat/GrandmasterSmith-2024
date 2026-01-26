import { getMediaServerUpload } from "@/getServer";
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
import { ChangeEvent, useCallback, useRef, useState, useEffect } from "react";

interface ImageProps {
  file: File;
  preview: string;
  name: string;
  description?: string;
  library?: mongoose.Types.ObjectId;
}

const ImageUploader = ({ btnRef, onOpen, onClose, isOpen }: any) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [library, setLibrary] = useState<string>("");

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
    }));
    const formData = new FormData();
    imagesForUpload.forEach((image) => {
      formData.append("images", image.file);
    });
    formData.append("photos", JSON.stringify(Array.from(imagesForUpload)));
    await axios
      .post(getMediaServerUpload() + "/images", formData, {
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
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Upload your photos</DrawerHeader>

        <DrawerBody className="flex flex-col gap-3">
          <>
            <div className="bg-dark p-4 text-secondary">
              <FormLabel>Select a photo library</FormLabel>
              <Select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setLibrary(e.target.value)
                }
                placeholder="Select an option"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div
              onDrop={onDrop}
              onDragOver={(event) => event.preventDefault()}
              className=" p-2 bg-dark  text-secondary   mt-3"
            >
              {
                <div className="image-uploader  p-5 border-1 border-secondary border-dashed">
                  <input type="file" multiple onChange={onFileChange} />

                  <div className="image-uploader__preview mt-4 flex flex-col gap-3">
                    Drop your images here, or use the button!
                  </div>
                </div>
              }
            </div>
            {images?.length > 0 ? (
              images.map((image: ImageProps, index: number) => (
                <div key={index} className="flex flex-col gap-3 bg-dark ">
                  <div className="flex flex-row justify-end gap-2 bg-white ">
                    <div className="hover:bg-dark hover:text-secondary p-2 cursor-pointer">
                      Add a description
                      <Add
                        className="text-success "
                        style={{ fontSize: "27px" }}
                      />
                    </div>
                    <div className="hover:bg-dark hover:text-secondary p-2 cursor-pointer">
                      Remove
                      <Delete
                        className="text-danger hover:bg-dark cursor-pointer "
                        style={{ fontSize: "27px" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 p-2">
                    <Image
                      isZoomed
                      src={`${image.preview}`}
                      alt="Uploaded"
                      width={240}
                    />
                  </div>
                  <div className="flex flex-row gap-2 bg-white p-2 border-1">
                    <Input
                      type="text"
                      value={image.name}
                      onChange={(e) => onNameChange(index, e.target.value)}
                      placeholder="Name for photo"
                    />
                    <Button variant="outline" colorScheme="blue">
                      Save
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <span>Drop an image here, or click to select one.</span>
            )}
          </>
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

export default ImageUploader;
