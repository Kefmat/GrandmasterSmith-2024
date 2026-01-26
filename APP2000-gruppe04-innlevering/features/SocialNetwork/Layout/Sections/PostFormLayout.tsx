import { useOpenings } from "@/providers/OpeningsContext";
import {
  Button,
  ButtonGroup,
  FocusLock,
  FormLabel,
  FormControl,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { SelectItem, Select } from "@nextui-org/react";
import React from "react";

export interface PostFormLayoutProps {
  handlePost: (e: React.MouseEvent<HTMLButtonElement>) => void;
  description: string;
  setDescription: (description: string) => void;
}

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef((props: any, ref: any) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

/**
 * @description Layout for ny post
 * @author  Borgar Flaen Stensrud
 *
 */

const Form = ({ firstFieldRef, onCancel }: any) => {
  const { openingsForDropDown } = useOpenings();
  return (
    <Stack spacing={4}>
      <Select
        placeholder="Select an chess game"
        items={openingsForDropDown}
        label="Select an opening"
      >
        {openingsForDropDown.map((option, index) => (
          <SelectItem
            key={option.value.toString()}
            value={option.value.toString()}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>

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

const PostFormLayout: React.FC<PostFormLayoutProps> = ({
  handlePost,
  setDescription,
  description,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const firstFieldRef = React.useRef(null);

  return (
    <form className="mt-5">
      <div className="mb-6">
        <label
          htmlFor="postContent"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Post Content:
        </label>
        <textarea
          id="postContent"
          name="postContent"
          rows={4}
          className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
          placeholder="What's on your mind?"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>

      <div className="mb-6">
        <label
          htmlFor="fileAttachment"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Attach a chess game:
        </label>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom-start"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <div
              //onClick={openModal}
              className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out"
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span className="ml-2 text-sm text-gray-600">
                  Choose a chessgame
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Player vs player / Player vs computer
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent p={5}>
            <FocusLock persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handlePost(e)}
        >
          {" "}
          Post{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            id="send"
            fill="#fff"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
          </svg>
        </button>
        <span className="text-gray-500 text-sm">Max 280 characters</span>
      </div>
    </form>
  );
};

export default PostFormLayout;
