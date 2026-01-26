import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import {
  Accessibility,
  People,
  PhotoCamera,
  VideoLibrary,
} from "@mui/icons-material";
import { useAuth } from "@/providers/AuthContext";
interface TabsProfileProps {
  activeTab: number;
  onTabChange: (newValue: number) => void;
}
const TabsProfile = ({ activeTab, onTabChange }: TabsProfileProps) => {
  const { gsUser } = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  console.log(gsUser);
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        <Tab
          key="Bio"
          title={
            <div className="flex items-center space-x-2">
              <Accessibility />
              <span>Bio</span>
            </div>
          }
          onClick={(e) => handleChange(e, 0)}
        />
        <Tab
          key="Friends"
          title={
            <div className="flex items-center space-x-2">
              <People /> <span>Friends</span>
              <Chip
                size="sm"
                variant="solid"
                color="success"
                className="text-secondary"
              >
                {gsUser?.friends?.length && gsUser?.friends?.length}
              </Chip>
            </div>
          }
          onClick={(e) => handleChange(e, 1)}
        />
        <Tab
          key="Photos"
          title={
            <div className="flex items-center space-x-2">
              <PhotoCamera /> <span>Photos</span>
              <Chip
                size="sm"
                variant="solid"
                color="success"
                className="text-secondary"
              >
                12
              </Chip>
            </div>
          }
          onClick={(e) => handleChange(e, 2)}
        />
        <Tab
          key="Videos"
          title={
            <div className="flex items-center space-x-2">
              <VideoLibrary />
              <span>Videos</span>
              <Chip
                size="sm"
                variant="solid"
                color="success"
                className="text-secondary"
              >
                33
              </Chip>
            </div>
          }
          onClick={(e) => handleChange(e, 3)}
        />
      </Tabs>
    </div>
  );
};

export default TabsProfile;
