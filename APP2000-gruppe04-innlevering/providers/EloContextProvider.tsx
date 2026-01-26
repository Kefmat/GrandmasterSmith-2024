import axios from "axios";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

/**
 * @description Elo Context for å håndtere elo-data.
 * @author  Borgar Flaen Stensrud
 *
 */

type EloData = {
  id: number;
  username: string;
  elo: number;
};

type EloContextData = {
  top5: EloData[];
  top100: EloData[];
};

type EloProviderProps = {
  children: ReactNode;
};

export const EloContext = createContext<EloContextData | undefined>(undefined);

export const useElo = () => {
  const context = useContext(EloContext);
  if (!context) {
    throw new Error("useElo must be used within a EloProvider");
  }
  return context;
};

export const EloProvider: React.FC<EloProviderProps> = ({ children }) => {
  const [top5, setTop5] = useState<EloData[]>([]);
  const [top100, setTop100] = useState<EloData[]>([]);

  useEffect(() => {
    const getTop100 = async () => {
      try {
        const response = await axios.get("/api/top100");
        const data = await response.data;
        const elo = data.top100;
        if (elo) {
          setTop100(elo);
          get5from100(elo);
        } else {
          setTop100([]);
        }
      } catch (error) {
        console.error("Error fetching top 100 Elo:", error);
        // Handle error, perhaps set state to an error state
      }
    };
    getTop100();
  }, []);

  const get5from100 = (top100: EloData[]) => {
    const tempArray = top100.slice(0, 5);
    setTop5(tempArray);
  };

  return (
    <EloContext.Provider value={{ top5, top100 }}>
      {children}
    </EloContext.Provider>
  );
};
