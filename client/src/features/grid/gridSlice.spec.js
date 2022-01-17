import { useSelector } from "react-redux";
import gridReducer, { setGrid } from "./gridSlice";

describe("grid reducer", () => {
  const initialState = {
    gridSize: { width: 25, height: 25 },
    nodeSize: { width: 25, height: 25 },
    start: { row: 3, col: 3, previousNodeType: "Air" },
    end: { row: 18, col: 18, previousNodeType: "Air" },
    grid: {
      _id: 1,
      name: "",
      width: 25,
      height: 25,
      data: [],
    },
    leftMouseButtonState: 0,
    currentNodeType: {},
  };
  it("should handle initial state", () => {
    const expected = JSON.stringify(initialState);
    const actual = JSON.stringify(gridReducer(undefined, { type: "unknown" }));
    expect(actual).toEqual(expected);
  });
  it("should handle setting the grid", () => {
    const data = create25By25GridData();
    const payload = { grid: { data: data }, nodeTypes: nodeTypes };

    const expected = nodeTypes[0].name;

    const actual = gridReducer(initialState, setGrid(payload)).grid.data;
    expect(actual[0][0].name).toEqual(expected);
  });
});
describe("grid reducer test helpers", () => {
  it("should test its create25By25GridData helper function", () => {
    const expected = expected25By25GridData;
    const actual = create25By25GridData();
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });
});

function create25By25GridData() {
  const rows = 25;
  const cols = 25;
  const data = [];
  for (let i = 0; i < rows; i++) {
    data.push([]);
    for (let j = 0; j < cols; j++) {
      data[i].push(0);
    }
  }
  return data;
}
const expected25By25GridData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const nodeTypes = [
  {
    _id: "61da2d9ed27133b25d5f1793",
    name: "Air",
    weight: 0,
    color: "#FFF",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61da2d9ed27133b25d5f1794",
    name: "Wall",
    weight: null,
    color: "#0c3547",
    walkable: false,
    __v: 0,
  },
  {
    _id: "61ddf79862c6328289ca4852",
    name: "Water",
    weight: 1,
    color: "#0080ff",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61e3a4e78e37bcdff01715a1",
    name: "Sand",
    weight: 7,
    color: "#f0e68c",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61e3a4e78e37bcdff01715a3",
    name: "Dirt",
    weight: 4,
    color: "#8b4513",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61e3a4e78e37bcdff01715a4",
    name: "Stone",
    weight: 3,
    color: "#7f7f7f",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61e47730339cd1edf2a2e5c1",
    name: "Grass",
    weight: 5,
    color: "#348C31",
    walkable: true,
    __v: 0,
  },
  {
    _id: "61e4a32bd644436869fcf9f7",
    name: "Start",
    weight: 0,
    color: "#00ff00",
    walkable: true,
    previousNodeType: 0,
    __v: 0,
  },
  {
    _id: "61e4a32bd644436869fcf9f8",
    name: "End",
    weight: 0,
    color: "#ff0000",
    walkable: true,
    previousNodeType: 0,
    __v: 0,
  },
];
