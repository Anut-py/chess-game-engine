import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Move } from "./models/Move";
import { BoardFile, BoardRank, fileToNum } from "./models/Position";
import { movePieceOnBoard } from "./slices/boardSlice";
import { movePieceInGame } from "./slices/gameSlice";

export interface SquareProps {
  file: BoardFile;
  rank: BoardRank;
  move?: Move;
}

export default function Square(props: SquareProps) {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const blackSquare = (fileToNum(props.file) + props.rank) % 2 === 0;

  return (
    <div
      className={`board__square ${blackSquare ? "board__square--black" : ""} ${
        props.move !== undefined ? "board__square--clickable" : ""
      }`}
    >
      {props.move !== undefined ? (
        <div
          className="board__square-overlay"
          onClick={() => {
            if (props.move !== undefined) {
              dispatch(movePieceInGame(props.move));
              dispatch(movePieceOnBoard(props.move));
            }
          }}
        >
          <div className="board__square-marker"></div>
        </div>
      ) : null}
    </div>
  );
}
