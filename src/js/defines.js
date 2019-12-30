export const RESOURCE_TYPES = {
    STATIC_RESOURCE: 'ST',
    NON_LAYERED_CHARACTER_RESOURCE: 'CC',
    LAYERED_CHARACTER_RESOURCE: 'LC',
    DOOR_RESOURCE: 'DS',
    TILE_RESOURCE: 'TT',
    PROJECTILE_RESOURCE: 'PR',
    COST_RESOURCE: 'SC',
    LINKED_LAYER_RESOURCE: 'LL',
    INVENTORY_RESOURCE: 'II',
    RESOURCE: 'SP'
};

export const DIRECTIONS = {
    NW: 'NWFrames',
    NN: 'NNFrames',
    NE: 'NEFrames',
    EE: 'EEFrames',
    SE: 'SEFrames',
    SS: 'SSFrames',
    SW: 'SWFrames',
    WW: 'WWFrames'
};

export const DIRECTION_OPPOSITES = {
    [DIRECTIONS.NW]: DIRECTIONS.SE,
    [DIRECTIONS.NN]: DIRECTIONS.SS,
    [DIRECTIONS.NE]: DIRECTIONS.SW,
    [DIRECTIONS.EE]: DIRECTIONS.WW,
    [DIRECTIONS.SE]: DIRECTIONS.NW,
    [DIRECTIONS.SS]: DIRECTIONS.NN,
    [DIRECTIONS.SW]: DIRECTIONS.NE,
    [DIRECTIONS.WW]: DIRECTIONS.EE,
};

//TODO TEMP
export const DIRECTION_MOVEMENT = {
    [DIRECTIONS.NW]: {x: -2, y: -1},
    [DIRECTIONS.NN]: {x: 0, y: -2},
    [DIRECTIONS.NE]: {x: 2, y: -1},
    [DIRECTIONS.EE]: {x: 2, y: 0},
    [DIRECTIONS.SE]: {x: 2, y: 1},
    [DIRECTIONS.SS]: {x: 0, y: 2},
    [DIRECTIONS.SW]: {x: -2, y: 1},
    [DIRECTIONS.WW]: {x: -2, y: 0}
};

export const ACTIONS = {
    WALK: 'walk',
    RUN: 'run',
    DIE: 'die',
    ATTACK: 'attack1',
    STAND: 'stand',
    PAIN: 'pain',
    DRAW: 'Unsheath',
};

export const BASES = {
    MAN: 'HumanMaleLayers',
    WO1: 'HumanFemaleLayers',
    WO2: 'HumanFemale2Layers'
};

export const ON_ANIM_END = {
    END: 1,
    LOOP: 2,
    RANDOM: 3
};

export const DEFAULT_BASE_LAYER = 'BaseHumanMale';
