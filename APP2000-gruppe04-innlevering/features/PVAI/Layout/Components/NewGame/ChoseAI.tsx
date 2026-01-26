import React, { useEffect, useState, ChangeEvent } from "react";
import type { Fen } from "@Chess/engine";
import { Bots } from "@/features/PVAI/Components/ChessImplementationAI";
import { useAuth } from "@/providers/AuthContext";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Container } from "@chakra-ui/react";
import Text from "@/features/Common/Components/Text/text";

export type UninitialisedBot = () => InitialisedBot;
export type InitialisedBot = (fen: Fen) => Promise<any>;
export type AvailableBots = Record<string, UninitialisedBot>;
export type SelectedBot = {
  name: string;
  move: InitialisedBot;
} | null;

/**
 * @description Chose AI er et komponent som lar brukeren velge en AI for å spille mot.
 * @author  Borgar Flaen Stensrud
 */

const ChoseAI = ({ onGameStateChange, game, handleSetAI }: any) => {
  const [bot, setBot] = useState<SelectedBot>(null);
  const { gsUser } = useAuth();

  useEffect(() => {}, []);

  const BotSelector: React.FC<{
    playerName: string;
    availableBots: AvailableBots;
    selectedBot: SelectedBot;
    setSelectedBot: (bot: SelectedBot) => void;
    disabled: boolean;
  }> = ({
    playerName,
    availableBots,
    selectedBot,
    setSelectedBot,
    disabled,
  }) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
      const name = e.target.value;
      setSelectedBot(name ? { name, move: availableBots[name]() } : null);
    };

    return (
      <div className="w-full">
        <label>Select AI</label>

        {!selectedBot ? (
          <Select
            onChange={handleChange}
            disabled={disabled}
            placeholder="Select AI"
            fullWidth
          >
            {Object.keys(availableBots).map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <Select
            value={selectedBot?.name}
            onChange={handleChange}
            disabled={disabled}
            selectedKeys={[selectedBot?.name]}
            placeholder="Select AI"
            fullWidth
          >
            {Object.keys(availableBots).map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
    );
  };

  return (
    <Container
      width="sm"
      className="flex flex-col gap-4 bg-secondary shadow-md p-5 rounded-lg"
    >
      <Text variant="h1" size="3xl">
        Chose AI
      </Text>
      <BotSelector
        playerName={gsUser?.username || "Player"}
        availableBots={Bots}
        selectedBot={bot}
        setSelectedBot={setBot}
        disabled={false}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          if (!bot) return;
          handleSetAI(bot);
          onGameStateChange("StartClockAI");
        }}
        color="primary"
        className="w-100"
      >
        Select Bot
      </Button>
    </Container>
  );
};
export default ChoseAI;
