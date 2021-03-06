import React, { useContext, useCallback } from "react";
import { AppContext } from "../reducer";
import { createTwoDimensionalArray } from "../utils";
function ControlPanel({ dispatch, setCell }) {
  const {
    delay,
    cellSize: [col, row],
    isRunning
  } = useContext(AppContext);

  const handleResetCellState = useCallback(() => {
    dispatch({ type: "stop" });
    setCell(createTwoDimensionalArray(col, row));
  }, [col, row, setCell, dispatch]);

  const handleRandomCellState = useCallback(() => {
    let tempArr = createTwoDimensionalArray(col, row);
    for (let i = 0; i < (col * row) / 25; i++) {
      let x = (Math.random() * col) | 0;
      let y = (Math.random() * row) | 0;

      tempArr[x][y] = tempArr[x][y] ? 0 : 1;
    }
    setCell(tempArr);
  }, [col, row, setCell]);

  return (
    <section className="control-panel">
      <div>
        宽:{" "}
        <input
          type="number"
          disabled={isRunning}
          value={row}
          min="1"
          max="100"
          onChange={e => {
            e.target.value <= 100 &&
              dispatch({
                type: "setCellSize",
                payload: [col, +e.target.value]
              });
          }}
        />
      </div>

      <div>
        高:{" "}
        <input
          type="number"
          disabled={isRunning}
          value={col}
          min="1"
          max="100"
          onChange={e => {
            e.target.value <= 100 &&
              dispatch({
                type: "setCellSize",
                payload: [+e.target.value, row]
              });
          }}
        />
      </div>
      <button onClick={() => dispatch({ type: "edit" })}>
        手动设置点位状态
      </button>
      <button onClick={() => handleRandomCellState()}>随机点位状态</button>
      <button onClick={() => dispatch({ type: isRunning ? "stop" : "run" })}>
        {isRunning ? "暂停" : "开始"}
      </button>
      <div>
        速度：
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={delay}
          onChange={e =>
            dispatch({ type: "setDelay", payload: e.target.value })
          }
        />
        {delay}ms
      </div>
      <button onClick={() => handleResetCellState()}>重置</button>
    </section>
  );
}
export default ControlPanel;
