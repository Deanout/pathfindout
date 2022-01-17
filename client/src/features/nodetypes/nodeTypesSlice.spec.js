import { useSelector } from "react-redux";
import nodeTypesReducer, {
  setNodeTypes,
  selectNodeTypes,
  selectNodeTypesState,
} from "./nodeTypesSlice";

describe("nodetypes reducer", () => {
  const initialState = {
    nodeTypes: [],
  };
  it("should handle initial state", () => {
    expect(nodeTypesReducer(undefined, { type: "unknown" })).toEqual({
      nodeTypes: [],
    });
  });

  it("should set the nodetypes to a new array of nodetypes", () => {
    const actual = nodeTypesReducer(
      initialState,
      setNodeTypes(nodeTypes)
    ).nodeTypes;

    expect(JSON.stringify(actual)).toEqual(JSON.stringify(nodeTypes));
  });
});
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
