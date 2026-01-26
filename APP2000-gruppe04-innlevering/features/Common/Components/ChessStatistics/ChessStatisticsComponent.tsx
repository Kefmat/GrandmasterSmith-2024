import React, { useEffect, useState } from "react";
import axios from "axios";
import { useElo } from "@/providers/EloContextProvider";

interface PlayerStatistics {
  id: number;
  username: string;
  elo: number;
}

const ChessStatisticsComponent = () => {
  const { top100 } = useElo();
  const [playerStats, setPlayerStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPlayerStats(top100);
  }, [top100]);

  const handlePlayerClick = (selectedPlayer: number) => {
    // Handle click logic
  };
  if (!playerStats || playerStats?.length === 0)
    return <div>No player statistics found</div>;
  return (
    <div className="flex">
      {/* Display loading spinner or indicator if loading */}
      {loading && <div>Loading...</div>}

      {/* Display player statistics */}

      <div className="flex flex-col gap-5 w-full">
        <div className="bg-dark text-secondary p-4 cursor-pointer hover:bg-primary hover:text-secondary transition-all ease-in duration-75 flex flex-row justify-around gap-5">
          <p>Id: </p>
          <p>Name: </p>
          <p>Rating: </p>
        </div>
        {playerStats.map((player, index) => (
          <div
            key={index}
            onClick={() => handlePlayerClick(player.id)}
            className="bg-dark text-secondary p-4 cursor-pointer hover:bg-primary hover:text-secondary transition-all ease-in duration-75 flex flex-row justify-around gap-5"
          >
            <p>{player.id}</p>
            <p>{player.username}</p>
            <p>{player.elo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessStatisticsComponent;
