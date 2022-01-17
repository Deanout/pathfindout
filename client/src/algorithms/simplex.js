import SimplexNoise from "simplex-noise";

const seed = 8675309;
// initializing a new simplex instance
// do this only once as it is relatively expensive
const simplex = new SimplexNoise(seed);

export function generateGridFrom2DSimplex(width, height, nodeTypes) {
  const newGrid = [];

  /**
   * The number of octaves to use in the noise generation.
   */
  const octaves = 2;
  /**
   * Each octave is given a frequency to equivalent to the lacunarity raised to the power of the octave - 1.
   */
  const lacunarity = 2;
  /**
   * The persistence of the octaves.
   * The persistence is the amount each octave is reduced by.
   * The value of persistence is between 0 and 1.
   */
  const persistence = 0.5;

  let scale = 0.25;

  if (scale <= 0) {
    scale = 0.0001;
  }

  const nodeNameLookup = {};
  for (let i = 0; i < nodeTypes.length; i++) {
    nodeNameLookup[nodeTypes[i].name] = nodeTypes[i];
  }

  for (var i = 0; i < width; i++) {
    newGrid.push([]);
    for (var j = 0; j < height; j++) {
      let amplitude = 1;
      let frequency = 0.01;
      let noiseHeight = 0;
      for (var octave = 0; octave < octaves; octave++) {
        const sampleX = (i / scale) * frequency;
        const sampleY = (j / scale) * frequency;

        const noiseValue = simplex.noise2D(sampleX, sampleY);
        noiseHeight += noiseValue * amplitude;

        amplitude *= persistence;
        frequency *= lacunarity;
      }
      newGrid[i].push(grassBiome(noiseHeight, nodeNameLookup));
    }
  }
  return newGrid;
}
function grassBiome(noiseValue, nodeNameLookup) {
  if (noiseValue < -0.3) {
    return nodeNameLookup["Water"];
  } else if (noiseValue >= -0.3 && noiseValue < 0) {
    return nodeNameLookup["Sand"];
  } else if (noiseValue >= 0 && noiseValue < 0.6) {
    return nodeNameLookup["Grass"];
  } else if (noiseValue >= 0.6 && noiseValue < 0.7) {
    return nodeNameLookup["Dirt"];
  } else if (noiseValue >= 0.7) {
    return nodeNameLookup["Stone"];
  } else {
    return nodeNameLookup["Air"];
  }
}
