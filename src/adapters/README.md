# Platform and renderer adapters

Place browser input, drawing, audio, persistence, and any future engine integration
here. Adapters may depend on the game layer; the game layer must not depend on
adapters. Keep renderer-specific objects out of game state.

No renderer or game framework has been selected. Add concrete adapters as actual
gameplay requirements emerge instead of inventing an abstraction for every API.
