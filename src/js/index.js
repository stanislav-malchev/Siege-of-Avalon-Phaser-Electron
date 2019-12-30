import Phaser from "phaser";

import {
    ACTIONS, BASES, DEFAULT_BASE_LAYER,
    DIRECTION_MOVEMENT,
    DIRECTION_OPPOSITES,
    DIRECTIONS,
    ON_ANIM_END,
    RESOURCE_TYPES
} from "./defines";

var config = {
    type: Phaser.WEBGL,//CANVAS, WEBGL failed
    width: 800,
    height: 600,
    backgroundColor: '#ababab',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let manager;
let d = 0;
let scene;

const mapwidth = 25;
const mapheight = 25;
const tilewidth = 62;
const tileheight = 31;
const tileWidthHalf = tilewidth / 2;
const tileHeightHalf = tileheight / 2;
var centerX = mapwidth * tileWidthHalf;
var centerY = tileHeightHalf;
const leftEdge = 240;
const rightEdge = 300;

/**
 * Some temporary resources. Those will get here from a server or will be computed
 * @type {*[]}
 */
const HumanMaleLayers = [
    'AhoulHeadGreen',
    'AhoulHeadTan',
    'Axe',
    'Bandolier',
    'BaseAhoul',
    'BaseHumanMale',
    'BaseShaman',
    'BaseSkeleton',
    'BattleAxe',
    'BeardDark',
    'BeardGrey',
    'BeardLight',
    'BeardRed',
    'BlackBoots',
    'BloodyLayer',
    'BluePants',
    'BlueVest',
    'Breastplate1',
    'Breastplate2',
    'BreastPlateGold',
    'BroadSword',
    'BroadSword2',
    'BrownPants',
    'BucklerNisos',
    'BucklerWood',
    'CanvasHood',
    'ChainCoif',
    'ChainMace',
    'ChaliceOfLife',
    'ChestPiece1',
    'ChestPiece2',
    'ClosedCanvasCloakBACK',
    'ClosedCanvasCloakFRONT',
    'ClosedLeatherCloakBACK',
    'ClosedLeatherCloakFRONT',
    'Cutlass',
    'Dagger',
    'Elbow&ArmSteel1',
    'Elbow&ArmSteel2',
    'FullHelmet',
    'FurLinedBoots',
    'Girdle',
    'GirdleWSplints',
    'GreenPants',
    'GreenVest',
    'HardLeatherVest',
    'HeavyChainmail',
    'HeavyGoldChainmail',
    'HeavySilverChainmail',
    'Helmet3',
    'Helmet4',
    'Helmet99',
    'HighLeatherBoots',
    'HighSplintBoots',
    'HuntingBow',
    'KiltCanvas',
    'KiltPlaid',
    'KiltSteel',
    'KShield4diamonds',
    'KShieldAvalon',
    'KShieldCathea',
    'KShieldCelticCross',
    'KShieldChecked',
    'KShieldChevron',
    'KShieldCross',
    'KShieldEleythea',
    'KShieldMaltCross',
    'KShieldOraim',
    'KShieldTaberland',
    'KShieldYellowSun',
    'LeatherArmor',
    'LeatherArmSplints',
    'LeatherBoots',
    'LeatherCap',
    'LeatherCoif',
    'LeatherGauntlet',
    'LeatherGlove',
    'LeatherGlovesNBracers',
    'LeatherHood',
    'LeatherShoulderCurass',
    'LeatherSplintBoots',
    'LeatherSplintKilt',
    'LightChainmail',
    'LoinCloths',
    'LongBow',
    'LongHairBeardDark',
    'LongHairBeardGrey',
    'LongHairBeardLight',
    'LongHairBeardRed',
    'LongHairDark',
    'LongHairGrey',
    'LongHairLight',
    'LongHairRed',
    'LowLeatherBoots',
    'Mace',
    'MerchantHat',
    'OpenCanvasCloakBACK',
    'OpenCanvasCloakFRONT',
    'OpenfaceHelm',
    'OpenLeatherCloakBACK',
    'OpenLeatherCloakFRONT',
    'PaddedTunic',
    'PatchworkPants1',
    'PatchworkPants2',
    'PeasantHat',
    'PickAxe',
    'PlateGreaves1',
    'PlateGreaves2',
    'PonyBeardDark',
    'PonyBeardGrey',
    'PonyBeardLight',
    'PonyBeardRed',
    'PonytailDark',
    'PonytailGrey',
    'PonytailLight',
    'PonytailRed',
    'QuiverBelt',
    'RobesMage1',
    'RobesMage2',
    'RobesMonk1',
    'RobesMonk2',
    'Rose',
    'RotShield1',
    'RotTabard1',
    'SailorSash',
    'SailorVest',
    'ScaleShirt',
    'Scimitar',
    'ShamanHair2',
    'ShamanPonyBeardDark',
    'ShamanPonytail',
    'ShortHairBeardDark',
    'ShortHairBeardGrey',
    'ShortHairBeardLight',
    'ShortHairBeardRed',
    'ShortHairDark',
    'ShortHairGrey',
    'ShortHairLight',
    'ShortHairRed',
    'SimpleLeatherBelt',
    'SmallSack',
    'SoftLeatherTunic',
    'SoftLeatherVest',
    'Spear',
    'SplintShirt',
    'Staff',
    'SteelBoots',
    'SteelCap',
    'SteelGauntlet',
    'SteelKneepads',
    'SteelPlateGreavesKneepads1',
    'SteelPlateGreavesKneepads2',
    'SteelShoulderPads1',
    'SteelShoulderPads2',
    'StuddedCoif',
    'StuddedLeatherTunic',
    'SwordBasic',
    'SwordOfEustace',
    'SwordOfEzra',
    'SwordOfJiboo',
    'SwordOfOlly',
    'TabardAratoy',
    'TabardAvalon',
    'TabardCathea',
    'TabardEleythea',
    'TabardEleytheaBloody',
    'TabardFornax',
    'TabardNisos',
    'TabardNoCrest',
    'TabardOraim',
    'TabardTaberland',
    'Tatoo1',
    'Tatoo2',
    'TShield',
    'TShieldAratoy',
    'TunicBlue',
    'TunicBrown',
    'TunicGreen',
    'TunicYellow',
    'YellowPants',
    'YellowVest'
];

const HumanFemale2Layers = [
    'BaseHumanFemale',
    'FemBoots1',
    'FemaleKnightBreastplate1',
    'BraidedHairDark',
    'BastardSword',
];

const HumanFemaleLayers = [
    'BaseHumanFemale',
    'BlouseBlue',
    'BlouseWhite',
    'BlouseYellow',
    'BraidedHairDark',
    'BraidedHairGrey',
    'BraidedHairLight',
    'BraidedHairRed',
    'Bucket',
    'FemBoots1',
    'FemBoots2',
    'FemBoots3',
    'FemBoots4',
    'LongHairDark',
    'LongHairGrey',
    'LongHairLight',
    'LongHairRed',
    'LongSkirtApron',
    'LongSkirtBlue',
    'LongSkirtGreen',
    'LongSkirtTan',
    'MediumHairDark',
    'MediumHairGrey',
    'MediumHairLight',
    'MediumHairRed',
    'ShortHairDark',
    'ShortHairGrey',
    'ShortHairLight',
    'ShortHairRed',
    'VestBlue',
    'VestGreen',
    'VestRed',
];

const poxObjects = [];

const baseHumanMaleDefAttrs = {
    CollisionHeight: 101,
    CollisionOffset: 70,
    ImageWidth: 148,
    imageHeight:130
};

const dbCharacters = [
    {
        ...baseHumanMaleDefAttrs,
        id: 123,
        name: 'Sir Roth',//Sir_Roth.pox
        base: BASES.MAN,
        layers: {
            leg1: 'YellowPants',
            leg2: 'SteelPlateGreavesKneepads1',
            boot: 'SteelBoots',
            chest1: 'HeavyChainmail',
            chest2: 'Breastplate1',
            arm: 'Elbow&ArmSteel1',
            chest3: 'SteelShoulderpads1',
            gauntlet: 'SteelGauntlet',
            outer: 'TabardAvalon',
            head: 'ShortHairBeardDark',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 999,
        name: 'Knight',
        base: BASES.MAN,
        layers: {
            leg1: 'YellowPants',
            leg2: 'SteelPlategreavesKneepads1',
            boot: 'SteelBoots',
            chest1: 'HeavyChainmail',
            chest2: 'Breastplate1',
            arm: 'Elbow&ArmSteel1',
            chest3: 'SteelShoulderpads1',
            gauntlet: 'SteelGauntlet',
            outer: 'TabardAratoy',
            head: 'ShortHairBeardDark',
            weapon: 'BroadSword',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 2,
        name: 'Sir Rion',//Sir_Rion.pox
        base: BASES.MAN,
        layers: {
            leg1: 'BrownPants',
            leg2: 'SteelKneepads',
            boot: 'LeatherBoots',
            chest2: 'TunicBrown',
            belt: 'QuiverBelt',
            chest3: 'LightChainmail',
            outer: 'TabardTaberland',
            head: 'ShortHairBeardRed',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 1,
        name: 'Guard Alain',//Guard_Alain.pox
        base: BASES.MAN,
        layers: {
            leg1: 'BrownPants',
            boot: 'LeatherBoots',
            chest1: 'StuddedLeatherTunic',
            chest2: 'SoftLeatherVest',
            gauntlet: 'LeatherGlovesNBracers',
            head: 'PonyBeardRed',
            weapon: 'BroadSword',
            shield: 'BucklerWood',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 3,
        name: 'Ahoul Scout',//scout1.pox
        base: BASES.MAN,
        layers: {
            naked: 'BaseShaman',
            leg1: 'Tatoo1',
            leg2: 'PatchworkPants2',
            boot: 'FurLinedBoots',
            head: 'ShamanPonyBeardDark',
            weapon: 'Axe',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 4,
        name: 'Guard Baird',//Guard_Baird.pox
        base: BASES.MAN,
        layers: {
            leg1: 'BrownPants',
            boot: 'LeatherBoots',
            chest1: 'StuddedLeatherTunic',
            head: 'BeardLight',
            weapon: 'BroadSword',
            shield: 'TShield',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 5,
        name: 'Guard Rowe',//Guard_Rowe.pox
        base: BASES.MAN,
        layers: {
            leg1: 'BrownPants',
            boot: 'LeatherBoots',
            chest1: 'StuddedLeatherTunic',
            chest2: 'SoftLeatherVest',
            chest3: 'StuddedCoif',
            head: 'PonyBeardLight',
            weapon: 'BroadSword',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 6,
        name: 'Shaahoul',//Lt.pox
        base: BASES.MAN,
        layers: {
            naked: 'BaseShaman',
            leg1: 'Tatoo2',
            leg2: 'PatchworkPants2',
            boot: 'FurLinedBoots',
            arm: 'LeatherArmSplints',
            chest3: 'Bandolier',
            gauntlet:'LeatherGlove',
            head: 'ShamanHair2',
            weapon: 'Axe',
            shield: 'BucklerWood',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 7,
        name: 'Skeleton',//Lt.pox
        base: BASES.MAN,
        layers: {
            naked: 'BaseSkeleton',
            // leg1: 'Tatoo2',
            // leg2: 'PatchworkPants2',
            // boot: 'FurLinedBoots',
            chest2: 'Breastplate1',
            // arm: 'LeatherArmSplints',
            // gauntlet:'LeatherGlove',
            // head: 'ShamanHair2',
            weapon: 'Axe',
            shield: 'BucklerWood',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 9,
        name: 'A Lady',//Lt.pox
        base: BASES.WO2,
        layers: {
            naked: 'BaseHumanFemale',
            // leg1: 'Tatoo2',
            // leg2: 'PatchworkPants2',
            boot: 'FemBoots1',
            chest2: 'FemaleKnightBreastplate1',
            // arm: 'LeatherArmSplints',
            // gauntlet:'LeatherGlove',
            head: 'BraidedHairDark',
            weapon: 'BastardSword',
            // shield: 'BucklerWood',
        }
    },{
        ...baseHumanMaleDefAttrs,
        name: 'DireWolf',//DireWolf.pox
        base: 'DireWolf',//DireWolf.pox
        CollisionHeight: 103,
        CollisionOffset: 72,
        id: 8
    },{
        ...baseHumanMaleDefAttrs,
        id: 10,
        name: 'A Lady 2',//Lt.pox
        base: BASES.WO1,
        layers: {
            naked: 'BaseHumanFemale',
            leg1: 'LongSkirtGreen',
            // leg2: 'PatchworkPants2',
            boot: 'FemBoots1',
            chest2: 'BlouseWhite',
            // arm: 'LeatherArmSplints',
            // gauntlet:'LeatherGlove',
            head: 'BraidedHairDark',
            // weapon: 'BastardSword',
            // shield: 'BucklerWood',
        }
    },{
        ...baseHumanMaleDefAttrs,
        id: 11,
        name: 'Ogre',
        base: "Ogre",
        CollisionHeight: 121,
        CollisionOffset: 107,
    },{
        ...baseHumanMaleDefAttrs,
        id: 12,
        name: 'Crockopod',
        base: "Crockopod",
        CollisionHeight: 92,
        CollisionOffset: 74,
    },{
        ...baseHumanMaleDefAttrs,
        id: 13,
        name: 'Elarath',
        base: BASES.MAN,
        layers: {
            boot: 'LowLeatherBoots',
            chest1: 'RobesMage2',
            head: 'LongHairBeardGrey',
        }
    }
];

const onMapChars = [];

function preload() {
    // this.load.json('map', theIsoMapJSON);
    // this.load.image('rug1', rug1);
    // this.load.spritesheet('tiles', theIsoMapPNG, {frameWidth: 64, frameHeight: 64});
    // this.load.spritesheet('rug1', rug1, {frameWidth: 64, frameHeight: 31});
    this.load.binary('FightDummy1SW', "./assets/ArtLib/Resources/SpriteObject/Character/Targetable/FightDummy1SW.pox");
    this.load.binary('LargeMapTable2s', "./assets/ArtLib/Resources/StaticObject/Props/LargeMapTable2s.pox");
    this.load.binary('Floor2', "./assets/ArtLib/Tiles/Wood/Floor2.pox");
    HumanMaleLayers.map(r => this.load.binary(BASES.MAN.toLowerCase() + r.toLowerCase(), "./assets/ArtLib/Resources/Engine/LayeredImages/HumanMaleLayers/" + r + ".pox"));
    HumanFemale2Layers.map(r => this.load.binary(BASES.WO2.toLowerCase() + r.toLowerCase(), "./assets/ArtLib/Resources/Engine/LayeredImages/HumanFemale2Layers/" + r + ".pox"));
    HumanFemaleLayers.map(r => this.load.binary(BASES.WO1.toLowerCase() + r.toLowerCase(), "./assets/ArtLib/Resources/Engine/LayeredImages/HumanFemaleLayers/" + r + ".pox"));
    this.load.binary("direwolf", "./assets/ArtLib/Resources/SpriteObject/Character/Animals/DireWolf.pox");
    this.load.binary("crockopod", "./assets/ArtLib/Resources/SpriteObject/Character/Monsters/Crocopod/Crockopod.pox");
    this.load.binary("ogre", "./assets/ArtLib/Resources/SpriteObject/Character/Ogre/Ogre.pox");
}

function create() {
    scene = this;
    const promises = [];

    dbCharacters.map(c => {
        promises.push(makeCharSprite(scene, c));
    });

    Promise.all(promises).then(responses => {
        return Promise.resolve();
    }).then(() => {
        this.load.start();
        createPt2(scene);
    });
}

const createPt2 = (scene) => {

    const co = isoXYtoPx(11,12);
    var graphics = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
    graphics.setDepth(1000);
    var circle = new Phaser.Geom.Circle(co.x, co.y, 4);
    graphics.fillCircleShape(circle);

    const Character = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize: function Character(scene, x, y, action, direction, distance, options) {
            const xy = isoXYtoPx(x,y);
            this.options = options;
            this.setActions();
            this.startX = xy.x;// - options.ImageWidth / 2;
            this.startY = xy.y - (options.imageHeight - options.CollisionHeight);
            // console.log(xy.y - (options.imageHeight - options.CollisionHeight));
            this.distance = distance;

            this.action = action;
            this.direction = direction;
            this.anim = this.actions[action][this.direction];
            this.speed = this.actions[action].hasOwnProperty('FrameMultiplier') ? this.actions[action].FrameMultiplier / 10 : options.hasOwnProperty('FrameMultiplier') ? options.FrameMultiplier / 10 : 0.2;
            this.f = 0;

            Phaser.GameObjects.Image.call(this, scene, this.startX, this.startY, 'char_spr_' + options.id, this.anim.frames[this.f]);

            this.depth = this.startY + (this.options.CollisionHeight || 64);

            scene.time.delayedCall(this.speed * 1000, this.changeFrame, [], this);
        },

        setActions: function() {
            const base = this.options.base || DEFAULT_BASE_LAYER;
            let obj = poxObjects.find(o => o.name === base.toLowerCase());
            this.actions = obj.actions;
        },

        changeFrame: function () {
            this.f++;
            if (this.f >= this.anim.frames.length) this.f = 0;

            let delay = this.speed;

            if (this.f === (this.anim.frames.length - 1)) {
                switch (this.anim.onEnd) {
                    case ON_ANIM_END.END:
                    case ON_ANIM_END.LOOP:
                        this.f = 0;
                        this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                        scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
                        break;

                    /*case ON_ANIM_END.END:
                        delay = Math.random() * 1.2;
                        scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
                        break;*/

                    case ACTIONS.RANDOM:
                        delay = 0.5 + Math.random();
                        scene.time.delayedCall(delay * 1000, this.resetAnimation, [true], this);
                        break;
                }
            } else {
                this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
            }
        },

        resetAnimation: function (randomFrame = false) {
            this.f = randomFrame ? Math.floor(Math.random() * this.anim.frames.length) : 0;
            this.frame = this.texture.get(this.anim.frames[this.f] - 1);
            scene.time.delayedCall(this.speed * 1000, this.changeFrame, [], this);
        },

        update: function () {
            const MovementPerFrame = this.actions[this.action].MovementPerFrame || 0;
            const coefficent = 64;

            if (MovementPerFrame > 0) {
                this.x += (DIRECTION_MOVEMENT[this.direction].x * MovementPerFrame) / coefficent;

                if (DIRECTION_MOVEMENT[this.direction].y !== 0) {
                    this.y += (DIRECTION_MOVEMENT[this.direction].y * MovementPerFrame) / coefficent;
                    this.depth = this.y + (this.options.CollisionHeight || 64);
                }

                //  Walked far enough?
                if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance) {
                    this.direction = DIRECTION_OPPOSITES[this.direction];
                    this.anim = this.actions[this.action][this.direction];
                    this.f = 0;
                    this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                    this.startX = this.x;
                    this.startY = this.y;
                }
            }
            // console.log(this.depth);
        }

    });

    const LayeredCharacter = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize: function Character(scene, x, y, action, direction, distance, options) {
            const xy = isoXYtoPx(x,y);
            this.options = options;
            this.setActions();
            this.startX = xy.x;// - options.ImageWidth / 2;
            this.startY = xy.y - (options.imageHeight - options.CollisionHeight);
            // console.log(xy.y - (options.imageHeight - options.CollisionHeight));
            this.distance = distance;

            this.action = action;
            this.direction = direction;
            this.anim = this.actions[action][this.direction];
            this.speed = this.actions[action].hasOwnProperty('FrameMultiplier') ? this.actions[action].FrameMultiplier / 10 : options.hasOwnProperty('FrameMultiplier') ? options.FrameMultiplier / 10 : 0.2;
            this.f = 0;

            Phaser.GameObjects.Image.call(this, scene, this.startX, this.startY, 'char_spr_' + options.id, this.anim.frames[this.f]);

            this.depth = this.startY + (this.options.CollisionHeight || 64);

            scene.time.delayedCall(this.speed * 1000, this.changeFrame, [], this);
        },

        setActions: function() {
            const base = this.options.layers.naked || DEFAULT_BASE_LAYER;
            let obj = poxObjects.find(o => o.name === this.options.base.toLowerCase() + base.toLowerCase());
            try {
                this.actions = obj.actions;
            } catch (e) {
                console.log(this.options.base.toLowerCase() + base.toLowerCase(), obj);

            }
        },

        changeFrame: function () {
            this.f++;
            if (this.f >= this.anim.frames.length) this.f = 0;

            let delay = this.speed;

            if (this.f === (this.anim.frames.length - 1)) {
                switch (this.anim.onEnd) {
                    case ON_ANIM_END.END:
                    case ON_ANIM_END.LOOP:
                        this.f = 0;
                        this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                        scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
                        break;

                    /*case ON_ANIM_END.END:
                        delay = Math.random() * 1.2;
                        scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
                        break;*/

                    case ACTIONS.RANDOM:
                        delay = 0.5 + Math.random();
                        scene.time.delayedCall(delay * 1000, this.resetAnimation, [true], this);
                        break;
                }
            } else {
                this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
            }
        },

        resetAnimation: function (randomFrame = false) {
            this.f = randomFrame ? Math.floor(Math.random() * this.anim.frames.length) : 0;
            this.frame = this.texture.get(this.anim.frames[this.f] - 1);
            scene.time.delayedCall(this.speed * 1000, this.changeFrame, [], this);
        },

        update: function () {
            const MovementPerFrame = this.actions[this.action].MovementPerFrame || 0;
            const coefficent = 64;

            if (MovementPerFrame > 0) {
                this.x += (DIRECTION_MOVEMENT[this.direction].x * MovementPerFrame) / coefficent;

                if (DIRECTION_MOVEMENT[this.direction].y !== 0) {
                    this.y += (DIRECTION_MOVEMENT[this.direction].y * MovementPerFrame) / coefficent;
                    this.depth = this.y + (this.options.CollisionHeight || 64);
                }

                //  Walked far enough?
                if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance) {
                    this.direction = DIRECTION_OPPOSITES[this.direction];
                    this.anim = this.actions[this.action][this.direction];
                    this.f = 0;
                    this.frame = this.texture.get(this.anim.frames[this.f] - 1);
                    this.startX = this.x;
                    this.startY = this.y;
                }
            }
            // console.log(this.depth);
        }

    });

    buildMap();
    placeStaticMapObjects();

    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 7, 4, ACTIONS.WALK, DIRECTIONS.SE, 100, dbCharacters[14])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 23, 2, ACTIONS.WALK, DIRECTIONS.SS, 380, dbCharacters[2])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 17, 10, ACTIONS.ATTACK, DIRECTIONS.SE, 0, dbCharacters[4])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 17, 11, ACTIONS.ATTACK, DIRECTIONS.NW, 0, dbCharacters[1])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 4, 9, ACTIONS.WALK, DIRECTIONS.NE, 60, dbCharacters[9])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 8, 7, ACTIONS.STAND, DIRECTIONS.SS, 10, dbCharacters[0])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 4, 12, ACTIONS.ATTACK, DIRECTIONS.NE, 0, dbCharacters[3])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 0, 50, ACTIONS.WALK, DIRECTIONS.SE, 160, dbCharacters[0])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 9, 0, ACTIONS.WALK, DIRECTIONS.SE, 320, dbCharacters[3])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 11, 0, ACTIONS.WALK, DIRECTIONS.SE, 340, dbCharacters[5])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 12, 0, ACTIONS.WALK, DIRECTIONS.SE, 330, dbCharacters[6])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 13, 20, ACTIONS.RUN, DIRECTIONS.SW, 300, dbCharacters[7])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 5, 14, ACTIONS.ATTACK, DIRECTIONS.NE, 0, dbCharacters[8])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 6, 14, ACTIONS.ATTACK, DIRECTIONS.SW, 0, dbCharacters[8])));
    onMapChars.push(scene.add.existing(new Character(scene, 11, 20, ACTIONS.RUN, DIRECTIONS.SW, 300, dbCharacters[10])));
    onMapChars.push(scene.add.existing(new Character(scene, 11, 21, ACTIONS.WALK, DIRECTIONS.SW, 300, dbCharacters[12])));
    onMapChars.push(scene.add.existing(new Character(scene, 11, 22, ACTIONS.WALK, DIRECTIONS.SW, 300, dbCharacters[13])));
    onMapChars.push(scene.add.existing(new LayeredCharacter(scene, 8, 9, ACTIONS.STAND, DIRECTIONS.SS, 10, dbCharacters[11])));


    scene.cameras.main.setSize(1600, 600);
    scene.cameras.main.scrollX = leftEdge;
    scene.cameras.main.scrollY = -300;
};

function buildMap() {
    const floor1 = loadPOXFile({}, scene.cache.binary.get('Floor2'));
    scene.textures.addSpriteSheet('Floor2', floor1.source, {
        frameWidth: floor1.width,
        frameHeight: floor1.height
    });

    for (var y = 0; y < mapheight; y++) {
        for (var x = 0; x < mapwidth; x++) {
            const co = isoXYtoPx(x,y);
            const tile = scene.add.image(co.x, co.y, 'Floor2', 0);
            tile.depth = co.y - tileheight/2;
        }
    }
}

const isoXYtoPx = (cellX, cellY) => {
    const screenX = (cellX * tilewidth  / 2) + (cellY * tilewidth  / 2);
    const screenY = (cellY * tileheight / 2) - (cellX * tileheight / 2);
    return {x:screenX, y:screenY}
};

function placeStaticMapObjects() {
    const armorRack = loadPOXFile({}, scene.cache.binary.get('LargeMapTable2s'));
    scene.textures.addSpriteSheet('LargeMapTable2s', armorRack.source, {
        frameWidth: armorRack.width,
        frameHeight: armorRack.height
    });
    let co = isoXYtoPx(5,7);
    let LargeMapTable2s = scene.add.image(co.x, co.y - 20, 'LargeMapTable2s', 0);
    LargeMapTable2s.depth = LargeMapTable2s.y + 86;

    const dummy1 = loadPOXFile({}, scene.cache.binary.get('FightDummy1SW'));
    scene.textures.addImage('FightDummy1SW', dummy1.source);
    co = isoXYtoPx(5,12);
    let dummy = scene.add.image(co.x, co.y - 40, 'FightDummy1SW');
    dummy.depth = dummy.y + 80;
}

function update() {
    onMapChars.forEach(function (Character) {
        Character.update();
    });
    // return;
    if (d) {
        this.cameras.main.scrollX -= 0.5;

        if (this.cameras.main.scrollX <= leftEdge) {
            d = 0;
        }
    } else {
        this.cameras.main.scrollX += 0.5;

        if (this.cameras.main.scrollX >= rightEdge) {
            d = 1;
        }
    }
}

const makeCharSprite = (scene, char = {}) => {
    const baseLayers = {
        naked: DEFAULT_BASE_LAYER,
        leg1: '',
        leg2: '',
        boot: '',
        chest1: '',
        chest2: '',
        arm: '',
        belt: '',
        chest3: '',
        gauntlet: '',
        outer: '',
        head: '',
        helmet: '',
        weapon: '',
        shield: ''
    };
    const compLayers = {...baseLayers, ...char.layers};

    if (Object.values(BASES).includes(char.base)) {
        let poxObjectBase = poxObjects.find(o => o.name === char.base.toLowerCase() + compLayers.naked.toLowerCase());
        if (!poxObjectBase) {
            try {
                poxObjectBase = loadPOXFile({name: char.base.toLowerCase() + compLayers.naked.toLowerCase()}, scene.cache.binary.get(char.base.toLowerCase() + compLayers.naked.toLowerCase()));
            } catch (e) {
                console.log(e);
            }
            poxObjects.push(poxObjectBase);
        }

        const tempCanvas = new OffscreenCanvas(poxObjectBase.source.width, poxObjectBase.source.height);
        const tempCanvasCtx = tempCanvas.getContext("2d");
        tempCanvasCtx.drawImage(poxObjectBase.source, 0, 0);

        //build canvases
        for (let lName in compLayers) {
            if (lName === 'naked') continue;
            const layerPOXName = compLayers[lName].toLowerCase();
            if (layerPOXName === '') continue;
            let poxObject = poxObjects.find(o => o.name === char.base.toLowerCase() + layerPOXName);
            if (poxObject === undefined) {
                poxObject = loadPOXFile({name: char.base.toLowerCase() + layerPOXName}, scene.cache.binary.get(char.base.toLowerCase() + layerPOXName));
                poxObjects.push(poxObject);
            }
            tempCanvasCtx.drawImage(poxObject.source, 0, 0);
        }


        scene.textures.addSpriteSheet('char_spr_' + char.id, tempCanvas, {
            frameWidth: poxObjectBase.width,
            frameHeight: poxObjectBase.height
        });
    } else {
        let poxObjectBase = poxObjects.find(o => o.name === char.base.toLowerCase());
        if (!poxObjectBase) {
            try {
                poxObjectBase = loadPOXFile({name: char.base.toLowerCase()}, scene.cache.binary.get(char.base.toLowerCase()));
            } catch (e) {
                console.log(char.base.toLowerCase());

                console.log(scene.cache.binary);
            }
            poxObjects.push(poxObjectBase);
        }

        scene.textures.addSpriteSheet('char_spr_' + char.id, poxObjectBase.source, {
            frameWidth: poxObjectBase.width,
            frameHeight: poxObjectBase.height
        });
    }

    return Promise.resolve();
};

export const loadPOXFile = (options, arrayBuffer) => {
    if (!isPox(arrayBuffer)) {
        console.log('Not a valid "POX (Proprietary Object eXtension)" file.');
        return null;
    }
    const resourceType = getResourceType(arrayBuffer);
    if (!resourceType) {
        console.log('Can\'t determine resource type.');
        return false;
    }
    let bufferOffset = resourceType === RESOURCE_TYPES.LAYERED_CHARACTER_RESOURCE ? 14 : 12;
    let iniString = '';

    const dataView = new DataView(arrayBuffer);
    while (1) {
        //put bytes into iniString until we reach the start of the RLE data marked with "BB"

        const byteValue = dataView.getUint8(bufferOffset);
        const char = String.fromCharCode(byteValue);
        if (char === "B") {
            const nextChar = String.fromCharCode(dataView.getUint8(bufferOffset + 1));
            if (nextChar === "B") {
                bufferOffset += 2;
                break;
            }
        }
        iniString += char;
        bufferOffset++;
    }
    iniString = iniString.replace('HEADER', 'Header')
    const ini = parseINIString(iniString);
    const actions = getActionsFromINI(ini);
    // console.log(ini);

    const frameWidth = parseInt(ini['Header'].ImageWidth);
    const frameHeight = parseInt(ini['Header'].ImageHeight);

    const frameCount = dataView.getInt32(bufferOffset, true);
    bufferOffset += 4;
    const rleSize = dataView.getInt32(bufferOffset, true);
    // console.log('rleSize', rleSize);
    bufferOffset += 4;

    /**
     * Get frame headers now
     */
    const frameHeaders = {};
    for (let i = 1; i <= frameCount; i++) {
        const key = i.toString();
        frameHeaders[key] = {};
        frameHeaders[key].SrcX = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].SrcY = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].Wdh = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].Hgh = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].AdjX = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].AdjY = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].PixFmt = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
        frameHeaders[key].DataPtr = dataView.getInt32(bufferOffset, true);
        bufferOffset += 4;
    }
    // console.log(frameHeaders); return;

    // console.log(frameHeaders);
    const rleDataStartPointer = bufferOffset;
    // console.log('rleDataStartPointer', rleDataStartPointer);
    const rleData = arrayBuffer.slice(rleDataStartPointer, -2);
    // const rleDataView = new DataView(rleData);

    const firstFramePointer = frameHeaders[1].DataPtr;

    const spriteColumns = Math.min(frameCount, 8);
    const spriteRows = Math.ceil(frameCount / spriteColumns);
    // const tempCanvas = document.createElement("canvas");//TODO test on real canvas first
    // tempCanvas.width = spriteColumns * frameWidth;
    // tempCanvas.height = spriteRows * frameHeight;
    // const tempCanvas = document.getElementById('canvas');
    const tempCanvas = new OffscreenCanvas(spriteColumns * frameWidth, spriteRows * frameHeight);
    const tempCanvasCtx = tempCanvas.getContext("2d");

    let i = 0;
    for (let key in frameHeaders) {
        const frame = frameHeaders[key];

        let byteBuffer = null;
        let nextFrameKey = (parseInt(key) + 1).toString();
        if (frameHeaders[nextFrameKey]) {
            const nextFrame = frameHeaders[nextFrameKey];
            byteBuffer = rleData.slice(frame.DataPtr - firstFramePointer, nextFrame.DataPtr - firstFramePointer);
        } else {
            byteBuffer = rleData.slice(frame.DataPtr - firstFramePointer);
        }
        const row = Math.floor(i / spriteColumns);
        const column = i % spriteColumns;
        const imageData = convertPOXtoImageData(frame, byteBuffer);
        const offsetLeft = column * frameWidth + frame.AdjX;
        const offsetHeight = row * frameHeight + frame.AdjY;
        // console.log(offsetLeft, offsetHeight);
        if (imageData instanceof ImageData) {
            tempCanvasCtx.putImageData(imageData, offsetLeft, offsetHeight);
        }
        i++;
    }

    const poxObject = {
        ...options,
        actions,
        width: frameWidth,
        height: frameHeight,
        source: tempCanvas,
        frameCount: frameCount,
        ini
    };

    return poxObject;
    return Promise.resolve(poxObject);
};

const parseINIString = data => {
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function (line) {
        if (regex.comment.test(line)) {
            return;
        } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
                value[section][match[1]] = match[2];
            } else {
                value[match[1]] = match[2];
            }
        } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        } else if (line.length == 0 && section) {
            section = null;
        }
    });
    return value;
};

/**
 * read the first 4 bytes to see if they read "POXA"
 * @param arrayBuffer
 * @returns {boolean}
 */
const isPox = arrayBuffer => {
    if (!arrayBuffer instanceof ArrayBuffer) return false;
    const dataView = new DataView(arrayBuffer);
    const byteValues = [];
    for (let i = 0; i < 4; i++) {
        const byteValue = dataView.getUint8(i);
        byteValues.push(byteValue);
    }
    const formatIndicator = String.fromCharCode(...byteValues);
    return formatIndicator === "POXA";
};

const getResourceType = arrayBuffer => {
    const dataView = new DataView(arrayBuffer);
    const byteValues = [];
    for (let i = 4; i < 7; i++) {
        const byteValue = dataView.getUint8(i);
        byteValues.push(byteValue);
    }

    //note that slice is to make the string  null terminated, otherwise "II" is not equal to "II" :O
    const resourceType = String.fromCharCode(...byteValues).slice(0, -1);

    if (!Object.values(RESOURCE_TYPES).includes(resourceType)) {
        return false;
    }
    return resourceType;
};

export const convertPOXtoImageData = (frame, byteBuffer) => {
    if (frame.Wdh < 0 || frame.Hgh < 0) return null;

    let byteOffset = 0;
    const dataView = new DataView(byteBuffer);
    let byteValue = dataView.getInt8(byteOffset);
    byteOffset++;
    const pixelArray = new Uint8ClampedArray(frame.Wdh * frame.Hgh * 4);

    let x = 0;
    let y = 0;
    while (byteValue > 0 && byteValue < 4 && byteOffset < byteBuffer.byteLength) {
        switch (byteValue) {
            case 1:
                byteValue = dataView.getInt32(byteOffset, true);
                // console.log('pixels', byteValue);

                byteOffset += 4;
                for (let i = byteValue; i > 0; i--) {
                    byteValue = dataView.getUint16(byteOffset, true);
                    byteOffset += 2;
                    const b = (byteValue & 31) << 3;
                    const g = ((byteValue & 2016) >> 5) << 2;
                    const r = ((byteValue & 63488) >> 11) << 3;
                    const RedIndex = (y * frame.Wdh + x) * 4;
                    const GreenIndex = ((y * frame.Wdh + x) * 4) + 1;
                    const BlueIndex = ((y * frame.Wdh + x) * 4) + 2;
                    const AlphaIndex = ((y * frame.Wdh + x) * 4) + 3;
                    pixelArray[RedIndex] = r;
                    pixelArray[GreenIndex] = g;
                    pixelArray[BlueIndex] = b;
                    pixelArray[AlphaIndex] = 255;
                    x++;
                }

                break;
            case 2:
                byteValue = dataView.getInt32(byteOffset, true);
                byteOffset += 4;
                x += Math.floor(byteValue / 2);
                break;
            case 3:
                y++;
                break;
        }
        byteValue = dataView.getInt8(byteOffset);
        byteOffset++;
    }

    return new ImageData(pixelArray, frame.Wdh, frame.Hgh);
};

const getActionsFromINI = ini => {
    const actions = {};

    for (let k in ini) {
        const iniPart = ini[k];
        if (k.toLowerCase().indexOf('action') === 0) {
            const action = {};
            for (let kk in iniPart) {
                const theValue = iniPart[kk];
                if (['MovementPerFrame','FrameMultiplier','TriggerFrame'].includes(kk) && !isNaN(theValue)) {
                    action[kk] = parseInt(theValue);
                } else if (kk.toLowerCase().includes('frames')) {
                    const anim = {
                        frames: []
                    };
                    theValue.split(',').map(v => {
                       if (!isNaN(v)) {
                           anim.frames.push(parseInt(v))
                       } else {
                           switch (v) {
                               case "END":
                                   anim.onEnd = ON_ANIM_END.END;
                                   break;
                               case "LOOP":
                                   anim.onEnd = ON_ANIM_END.LOOP;
                                   break;
                               case "RANDOM":
                                   anim.onEnd = ON_ANIM_END.RANDOM;
                                   break;
                           }
                       }
                    });
                    action[kk] = anim;
                }
            }

            const actionName = k.toLowerCase().replace('action ', '');
            actions[actionName] = action;
            // console.log(iniPart);
        }
    }
    //add default FrameMultiplier
    if (ini.Header.hasOwnProperty('FrameMultiplier') && !isNaN(ini.Header.FrameMultiplier)) {
        actions.FrameMultiplier = parseInt(ini.Header.FrameMultiplier)
    }
    return actions;
};
