import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Image, Button } from "@nextui-org/react";
import { Edit } from "@mui/icons-material";
import ImageUploader from "./ImageUploader";
import SelectProfilePhotoFromPhotoLibraryComponent from "./SelectProfilePhotoFromPhotoLibrary";
import { useAuth } from "@/providers/AuthContext";
const ProfileImageEditor = ({ picture }: any) => {
  const [showEditIcon, setShowEditIcon] = useState(true);
  const popoverRef = useRef<HTMLElement>();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { gsUser } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(event.target as Node)) {
        onClose(); // Close popover if click is outside
        setShowEditIcon(false); // Hide edit icon
      }
    };

    // Only add the event listener if the popover is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleMouseEnter = () => setShowEditIcon(true);
  const handleMouseLeave = () => !isOpen && setShowEditIcon(false);

  return (
    <>
      <Box
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Profile Image */}
        <Image
          src={
            picture
              ? picture
              : gsUser?.resultUser?.profilePicture
              ? gsUser?.resultUser?.profilePicture
              : gsUser?.picture
          }
          alt="Profile Picture"
          width="100%"
          height="100%"
          style={{ borderRadius: "50%" }}
        />
        {/* Edit Icon */}
        {showEditIcon && (
          <>
            <div
              onClick={onOpen}
              ref={btnRef}
              style={{
                zIndex: 70,
                background: "gray.200",
                position: "absolute",
                right: "0",
                bottom: "0",
              }}
              className=" bg-secondary shadow-lg text-primary rounded-lg flex justify-center align-middle p-2 cursor-pointer hover:bg-dark-500 transition duration-150 ease-in-out"
            >
              <Edit style={{ fontSize: "1.25rem" }} />
            </div>
          </>
        )}
        <ImageUploader
          btnRef
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
        />
      </Box>
    </>
  );
};

export default ProfileImageEditor;

/*
 <SelectProfilePhotoFromPhotoLibraryComponent />

*/
