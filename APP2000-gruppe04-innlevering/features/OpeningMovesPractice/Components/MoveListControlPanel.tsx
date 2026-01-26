import {
  AddCircleRounded,
  Circle,
  FastForward,
  FastRewind,
  FastRewindRounded,
  Pause,
  PlayArrow,
  RecordVoiceOver,
  StopCircleRounded,
} from "@mui/icons-material";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Text from "../../Common/Components/Text/text";

import { motion } from "framer-motion";
import { useGame } from "@/providers/GameContext";
import { useOpenings } from "@/providers/OpeningsContext";

/**
 * @description MoveListControlPanel er et komponent som viser frem knapper for å spille av trekk i en åpning,
 * spille av neste trekk, spille av forrige trekk, og spille av alle trekkene i en åpning.
 * Komponenten har også en knapp for å starte og stoppe opptak av trekk.
 * Komponenten viser også frem en melding om at opptak av trekk er i gang, og en knapp for å stoppe opptaket.
 * Komponenten er en del av OpeningMovesPractice featuren.
 *
 * Komponenten bruker useChessOpening hooken
 * for å hente ut data om åpningen som skal vises frem.
 *
 * @author Borgar Flaen Stensrud
 * @usage <MoveListControlPanel /> in features/OpeningMovesPractice/Layout/Section/PickOpeningSection.tsx
 * @example <MoveListControlPanel  />
 *
 * @type
 *
 * @use react
 * @use <motion.div> fra framer-motion, animasjoner.
 * @version 1.0 2024-23-03
 */

const MoveListControlPanel = () => {
  const { currentMoveIndex, selectedOpening, playerMoves } = useOpenings();
  const { setPlaying } = useGame();
  const [moveList, setMoveList] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { setCurrentMoveIndex } = useOpenings();

  useEffect(() => {
    setMoveList(playerMoves || []);
  }, [selectedOpening, currentMoveIndex, playerMoves]);

  const handleMoveListIndexChange = (index: number) => {
    setCurrentMoveIndex(index);
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moveList.length) {
      handleMoveListIndexChange(currentMoveIndex + 1);
    }
  };

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      handleMoveListIndexChange(currentMoveIndex - 1);
    }
  };

  const handlePlay = async () => {
    if (isPlaying) {
      handlePause();
      return;
    }
    setIsPlaying(true);
    setPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setPlaying(false);
    return;
  };

  const stopRecording = () => {
    Swal.fire({
      title: "Recording saved",
      html: "Recording has been saved successfully",
      icon: "warning",
      showConfirmButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Recording saved");
      }
    });
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const recordButtonVariants = {
    initial: { width: "initial" },
    record: { width: "100%", transition: { duration: 0.5 } },
    stop: { width: "initial", transition: { duration: 0.5 } },
  };

  const theRecordMode = false;

  return (
    <div className="flex flex-col gap-0 justify-center  mx-0 relative">
      <div className="flex flex-row gap-5 justify-center align-middle items-center w-full">
        <motion.div
          className="container flex flex-row gap-0 mt-0 justify-center    "
          variants={containerVariants}
          initial="visible"
          animate={!theRecordMode ? "visible" : "hidden"}
        >
          {/* Button components */}
          <motion.div
            onClick={handlePreviousMove}
            className="item bg-primary flex flex-row gap-2 shadow-md    p-2  text-secondary cursor-pointer"
            variants={itemVariants}
          >
            <FastRewind />
          </motion.div>
          <motion.div
            onClick={handlePlay}
            className="item bg-success  flex flex-row gap-2 shadow-md  p-2  text-secondary cursor-pointer"
            variants={itemVariants}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </motion.div>
          <motion.div
            onClick={handleNextMove}
            className="item flex flex-row gap-2 bg-primary shadow-md  p-2  text-secondary cursor-pointer"
            variants={itemVariants}
          >
            <FastForward />
          </motion.div>
          {/* Include other buttons with similar structure */}
        </motion.div>
        <motion.div
          className="container flex flex-row gap-0 mt-0 justify-center    "
          variants={containerVariants}
          initial="visible"
          animate={!theRecordMode ? "visible" : "hidden"}
        >
          <motion.div
            className="item flex flex-row gap-2 bg-danger  shadow-md  p-2 px-3 text-secondary  cursor-pointer"
            variants={recordButtonVariants}
            initial="initial"
            animate={theRecordMode ? "record" : "stop"}
          >
            <p className="ml-2">Record</p>
            <Circle />
          </motion.div>
        </motion.div>
      </div>
      {isRecording && theRecordMode && (
        <motion.div
          className="flex flex-col gap-5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ width: "100%" }}
        >
          <motion.div
            className=" text-secondary cursor-pointer text-center"
            initial={{ width: "100%" }}
            animate={{ width: "initial" }}
            transition={{ duration: 0.5 }}
          >
            <Text variant="h2" size="xl" color="primary">
              Recording moves: {currentMoveIndex}
            </Text>
            <motion.div
              onClick={stopRecording}
              className="bg-danger shadow-md  p-5 mt-5 text-secondary cursor-pointer"
            >
              Stop recording <StopCircleRounded />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
export default MoveListControlPanel;
function useMoves(): { currentMoveIndex: any } {
  throw new Error("Function not implemented.");
}
