/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

import Long from "long"
$protobuf.util.Long = Long
$protobuf.configure()

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const AvatarDataNotify = $root.AvatarDataNotify = (() => {

    /**
     * Properties of an AvatarDataNotify.
     * @exports IAvatarDataNotify
     * @interface IAvatarDataNotify
     * @property {Array.<IAvatarInfo>|null} [avatarList] AvatarDataNotify avatarList
     * @property {Object.<string,IAvatarTeam>|null} [avatarTeamMap] AvatarDataNotify avatarTeamMap
     * @property {number|null} [curAvatarTeamId] AvatarDataNotify curAvatarTeamId
     * @property {Long|null} [chooseAvatarGuid] AvatarDataNotify chooseAvatarGuid
     * @property {Array.<Long>|null} [tempAvatarGuidList] AvatarDataNotify tempAvatarGuidList
     * @property {Array.<number>|null} [ownedFlycloakList] AvatarDataNotify ownedFlycloakList
     * @property {Array.<number>|null} [ownedCostumeList] AvatarDataNotify ownedCostumeList
     */

    /**
     * Constructs a new AvatarDataNotify.
     * @exports AvatarDataNotify
     * @classdesc Represents an AvatarDataNotify.
     * @implements IAvatarDataNotify
     * @constructor
     * @param {IAvatarDataNotify=} [properties] Properties to set
     */
    function AvatarDataNotify(properties) {
        this.avatarList = [];
        this.avatarTeamMap = {};
        this.tempAvatarGuidList = [];
        this.ownedFlycloakList = [];
        this.ownedCostumeList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarDataNotify avatarList.
     * @member {Array.<IAvatarInfo>} avatarList
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.avatarList = $util.emptyArray;

    /**
     * AvatarDataNotify avatarTeamMap.
     * @member {Object.<string,IAvatarTeam>} avatarTeamMap
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.avatarTeamMap = $util.emptyObject;

    /**
     * AvatarDataNotify curAvatarTeamId.
     * @member {number} curAvatarTeamId
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.curAvatarTeamId = 0;

    /**
     * AvatarDataNotify chooseAvatarGuid.
     * @member {Long} chooseAvatarGuid
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.chooseAvatarGuid = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarDataNotify tempAvatarGuidList.
     * @member {Array.<Long>} tempAvatarGuidList
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.tempAvatarGuidList = $util.emptyArray;

    /**
     * AvatarDataNotify ownedFlycloakList.
     * @member {Array.<number>} ownedFlycloakList
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.ownedFlycloakList = $util.emptyArray;

    /**
     * AvatarDataNotify ownedCostumeList.
     * @member {Array.<number>} ownedCostumeList
     * @memberof AvatarDataNotify
     * @instance
     */
    AvatarDataNotify.prototype.ownedCostumeList = $util.emptyArray;

    /**
     * Creates a new AvatarDataNotify instance using the specified properties.
     * @function create
     * @memberof AvatarDataNotify
     * @static
     * @param {IAvatarDataNotify=} [properties] Properties to set
     * @returns {AvatarDataNotify} AvatarDataNotify instance
     */
    AvatarDataNotify.create = function create(properties) {
        return new AvatarDataNotify(properties);
    };

    /**
     * Encodes the specified AvatarDataNotify message. Does not implicitly {@link AvatarDataNotify.verify|verify} messages.
     * @function encode
     * @memberof AvatarDataNotify
     * @static
     * @param {IAvatarDataNotify} message AvatarDataNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarDataNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.curAvatarTeamId != null && Object.hasOwnProperty.call(message, "curAvatarTeamId"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.curAvatarTeamId);
        if (message.avatarTeamMap != null && Object.hasOwnProperty.call(message, "avatarTeamMap"))
            for (let keys = Object.keys(message.avatarTeamMap), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.AvatarTeam.encode(message.avatarTeamMap[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.ownedCostumeList != null && message.ownedCostumeList.length) {
            writer.uint32(/* id 7, wireType 2 =*/58).fork();
            for (let i = 0; i < message.ownedCostumeList.length; ++i)
                writer.uint32(message.ownedCostumeList[i]);
            writer.ldelim();
        }
        if (message.ownedFlycloakList != null && message.ownedFlycloakList.length) {
            writer.uint32(/* id 8, wireType 2 =*/66).fork();
            for (let i = 0; i < message.ownedFlycloakList.length; ++i)
                writer.uint32(message.ownedFlycloakList[i]);
            writer.ldelim();
        }
        if (message.chooseAvatarGuid != null && Object.hasOwnProperty.call(message, "chooseAvatarGuid"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.chooseAvatarGuid);
        if (message.tempAvatarGuidList != null && message.tempAvatarGuidList.length) {
            writer.uint32(/* id 14, wireType 2 =*/114).fork();
            for (let i = 0; i < message.tempAvatarGuidList.length; ++i)
                writer.uint64(message.tempAvatarGuidList[i]);
            writer.ldelim();
        }
        if (message.avatarList != null && message.avatarList.length)
            for (let i = 0; i < message.avatarList.length; ++i)
                $root.AvatarInfo.encode(message.avatarList[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AvatarDataNotify message, length delimited. Does not implicitly {@link AvatarDataNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarDataNotify
     * @static
     * @param {IAvatarDataNotify} message AvatarDataNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarDataNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarDataNotify message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarDataNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarDataNotify} AvatarDataNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarDataNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarDataNotify(), key, value;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 15:
                    if (!(message.avatarList && message.avatarList.length))
                        message.avatarList = [];
                    message.avatarList.push($root.AvatarInfo.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (message.avatarTeamMap === $util.emptyObject)
                        message.avatarTeamMap = {};
                    let end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = null;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = $root.AvatarTeam.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.avatarTeamMap[key] = value;
                    break;
                case 2:
                    message.curAvatarTeamId = reader.uint32();
                    break;
                case 11:
                    message.chooseAvatarGuid = reader.uint64();
                    break;
                case 14:
                    if (!(message.tempAvatarGuidList && message.tempAvatarGuidList.length))
                        message.tempAvatarGuidList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.tempAvatarGuidList.push(reader.uint64());
                    } else
                        message.tempAvatarGuidList.push(reader.uint64());
                    break;
                case 8:
                    if (!(message.ownedFlycloakList && message.ownedFlycloakList.length))
                        message.ownedFlycloakList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ownedFlycloakList.push(reader.uint32());
                    } else
                        message.ownedFlycloakList.push(reader.uint32());
                    break;
                case 7:
                    if (!(message.ownedCostumeList && message.ownedCostumeList.length))
                        message.ownedCostumeList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ownedCostumeList.push(reader.uint32());
                    } else
                        message.ownedCostumeList.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarDataNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarDataNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarDataNotify} AvatarDataNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarDataNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarDataNotify message.
     * @function verify
     * @memberof AvatarDataNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarDataNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.avatarList != null && message.hasOwnProperty("avatarList")) {
            if (!Array.isArray(message.avatarList))
                return "avatarList: array expected";
            for (let i = 0; i < message.avatarList.length; ++i) {
                let error = $root.AvatarInfo.verify(message.avatarList[i]);
                if (error)
                    return "avatarList." + error;
            }
        }
        if (message.avatarTeamMap != null && message.hasOwnProperty("avatarTeamMap")) {
            if (!$util.isObject(message.avatarTeamMap))
                return "avatarTeamMap: object expected";
            let key = Object.keys(message.avatarTeamMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "avatarTeamMap: integer key{k:uint32} expected";
                {
                    let error = $root.AvatarTeam.verify(message.avatarTeamMap[key[i]]);
                    if (error)
                        return "avatarTeamMap." + error;
                }
            }
        }
        if (message.curAvatarTeamId != null && message.hasOwnProperty("curAvatarTeamId"))
            if (!$util.isInteger(message.curAvatarTeamId))
                return "curAvatarTeamId: integer expected";
        if (message.chooseAvatarGuid != null && message.hasOwnProperty("chooseAvatarGuid"))
            if (!$util.isInteger(message.chooseAvatarGuid) && !(message.chooseAvatarGuid && $util.isInteger(message.chooseAvatarGuid.low) && $util.isInteger(message.chooseAvatarGuid.high)))
                return "chooseAvatarGuid: integer|Long expected";
        if (message.tempAvatarGuidList != null && message.hasOwnProperty("tempAvatarGuidList")) {
            if (!Array.isArray(message.tempAvatarGuidList))
                return "tempAvatarGuidList: array expected";
            for (let i = 0; i < message.tempAvatarGuidList.length; ++i)
                if (!$util.isInteger(message.tempAvatarGuidList[i]) && !(message.tempAvatarGuidList[i] && $util.isInteger(message.tempAvatarGuidList[i].low) && $util.isInteger(message.tempAvatarGuidList[i].high)))
                    return "tempAvatarGuidList: integer|Long[] expected";
        }
        if (message.ownedFlycloakList != null && message.hasOwnProperty("ownedFlycloakList")) {
            if (!Array.isArray(message.ownedFlycloakList))
                return "ownedFlycloakList: array expected";
            for (let i = 0; i < message.ownedFlycloakList.length; ++i)
                if (!$util.isInteger(message.ownedFlycloakList[i]))
                    return "ownedFlycloakList: integer[] expected";
        }
        if (message.ownedCostumeList != null && message.hasOwnProperty("ownedCostumeList")) {
            if (!Array.isArray(message.ownedCostumeList))
                return "ownedCostumeList: array expected";
            for (let i = 0; i < message.ownedCostumeList.length; ++i)
                if (!$util.isInteger(message.ownedCostumeList[i]))
                    return "ownedCostumeList: integer[] expected";
        }
        return null;
    };

    /**
     * Creates an AvatarDataNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarDataNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarDataNotify} AvatarDataNotify
     */
    AvatarDataNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarDataNotify)
            return object;
        let message = new $root.AvatarDataNotify();
        if (object.avatarList) {
            if (!Array.isArray(object.avatarList))
                throw TypeError(".AvatarDataNotify.avatarList: array expected");
            message.avatarList = [];
            for (let i = 0; i < object.avatarList.length; ++i) {
                if (typeof object.avatarList[i] !== "object")
                    throw TypeError(".AvatarDataNotify.avatarList: object expected");
                message.avatarList[i] = $root.AvatarInfo.fromObject(object.avatarList[i]);
            }
        }
        if (object.avatarTeamMap) {
            if (typeof object.avatarTeamMap !== "object")
                throw TypeError(".AvatarDataNotify.avatarTeamMap: object expected");
            message.avatarTeamMap = {};
            for (let keys = Object.keys(object.avatarTeamMap), i = 0; i < keys.length; ++i) {
                if (typeof object.avatarTeamMap[keys[i]] !== "object")
                    throw TypeError(".AvatarDataNotify.avatarTeamMap: object expected");
                message.avatarTeamMap[keys[i]] = $root.AvatarTeam.fromObject(object.avatarTeamMap[keys[i]]);
            }
        }
        if (object.curAvatarTeamId != null)
            message.curAvatarTeamId = object.curAvatarTeamId >>> 0;
        if (object.chooseAvatarGuid != null)
            if ($util.Long)
                (message.chooseAvatarGuid = $util.Long.fromValue(object.chooseAvatarGuid)).unsigned = true;
            else if (typeof object.chooseAvatarGuid === "string")
                message.chooseAvatarGuid = parseInt(object.chooseAvatarGuid, 10);
            else if (typeof object.chooseAvatarGuid === "number")
                message.chooseAvatarGuid = object.chooseAvatarGuid;
            else if (typeof object.chooseAvatarGuid === "object")
                message.chooseAvatarGuid = new $util.LongBits(object.chooseAvatarGuid.low >>> 0, object.chooseAvatarGuid.high >>> 0).toNumber(true);
        if (object.tempAvatarGuidList) {
            if (!Array.isArray(object.tempAvatarGuidList))
                throw TypeError(".AvatarDataNotify.tempAvatarGuidList: array expected");
            message.tempAvatarGuidList = [];
            for (let i = 0; i < object.tempAvatarGuidList.length; ++i)
                if ($util.Long)
                    (message.tempAvatarGuidList[i] = $util.Long.fromValue(object.tempAvatarGuidList[i])).unsigned = true;
                else if (typeof object.tempAvatarGuidList[i] === "string")
                    message.tempAvatarGuidList[i] = parseInt(object.tempAvatarGuidList[i], 10);
                else if (typeof object.tempAvatarGuidList[i] === "number")
                    message.tempAvatarGuidList[i] = object.tempAvatarGuidList[i];
                else if (typeof object.tempAvatarGuidList[i] === "object")
                    message.tempAvatarGuidList[i] = new $util.LongBits(object.tempAvatarGuidList[i].low >>> 0, object.tempAvatarGuidList[i].high >>> 0).toNumber(true);
        }
        if (object.ownedFlycloakList) {
            if (!Array.isArray(object.ownedFlycloakList))
                throw TypeError(".AvatarDataNotify.ownedFlycloakList: array expected");
            message.ownedFlycloakList = [];
            for (let i = 0; i < object.ownedFlycloakList.length; ++i)
                message.ownedFlycloakList[i] = object.ownedFlycloakList[i] >>> 0;
        }
        if (object.ownedCostumeList) {
            if (!Array.isArray(object.ownedCostumeList))
                throw TypeError(".AvatarDataNotify.ownedCostumeList: array expected");
            message.ownedCostumeList = [];
            for (let i = 0; i < object.ownedCostumeList.length; ++i)
                message.ownedCostumeList[i] = object.ownedCostumeList[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from an AvatarDataNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarDataNotify
     * @static
     * @param {AvatarDataNotify} message AvatarDataNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarDataNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.ownedCostumeList = [];
            object.ownedFlycloakList = [];
            object.tempAvatarGuidList = [];
            object.avatarList = [];
        }
        if (options.objects || options.defaults)
            object.avatarTeamMap = {};
        if (options.defaults) {
            object.curAvatarTeamId = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.chooseAvatarGuid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.chooseAvatarGuid = options.longs === String ? "0" : 0;
        }
        if (message.curAvatarTeamId != null && message.hasOwnProperty("curAvatarTeamId"))
            object.curAvatarTeamId = message.curAvatarTeamId;
        let keys2;
        if (message.avatarTeamMap && (keys2 = Object.keys(message.avatarTeamMap)).length) {
            object.avatarTeamMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.avatarTeamMap[keys2[j]] = $root.AvatarTeam.toObject(message.avatarTeamMap[keys2[j]], options);
        }
        if (message.ownedCostumeList && message.ownedCostumeList.length) {
            object.ownedCostumeList = [];
            for (let j = 0; j < message.ownedCostumeList.length; ++j)
                object.ownedCostumeList[j] = message.ownedCostumeList[j];
        }
        if (message.ownedFlycloakList && message.ownedFlycloakList.length) {
            object.ownedFlycloakList = [];
            for (let j = 0; j < message.ownedFlycloakList.length; ++j)
                object.ownedFlycloakList[j] = message.ownedFlycloakList[j];
        }
        if (message.chooseAvatarGuid != null && message.hasOwnProperty("chooseAvatarGuid"))
            if (typeof message.chooseAvatarGuid === "number")
                object.chooseAvatarGuid = options.longs === String ? String(message.chooseAvatarGuid) : message.chooseAvatarGuid;
            else
                object.chooseAvatarGuid = options.longs === String ? $util.Long.prototype.toString.call(message.chooseAvatarGuid) : options.longs === Number ? new $util.LongBits(message.chooseAvatarGuid.low >>> 0, message.chooseAvatarGuid.high >>> 0).toNumber(true) : message.chooseAvatarGuid;
        if (message.tempAvatarGuidList && message.tempAvatarGuidList.length) {
            object.tempAvatarGuidList = [];
            for (let j = 0; j < message.tempAvatarGuidList.length; ++j)
                if (typeof message.tempAvatarGuidList[j] === "number")
                    object.tempAvatarGuidList[j] = options.longs === String ? String(message.tempAvatarGuidList[j]) : message.tempAvatarGuidList[j];
                else
                    object.tempAvatarGuidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.tempAvatarGuidList[j]) : options.longs === Number ? new $util.LongBits(message.tempAvatarGuidList[j].low >>> 0, message.tempAvatarGuidList[j].high >>> 0).toNumber(true) : message.tempAvatarGuidList[j];
        }
        if (message.avatarList && message.avatarList.length) {
            object.avatarList = [];
            for (let j = 0; j < message.avatarList.length; ++j)
                object.avatarList[j] = $root.AvatarInfo.toObject(message.avatarList[j], options);
        }
        return object;
    };

    /**
     * Converts this AvatarDataNotify to JSON.
     * @function toJSON
     * @memberof AvatarDataNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarDataNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarDataNotify;
})();

export const AvatarInfo = $root.AvatarInfo = (() => {

    /**
     * Properties of an AvatarInfo.
     * @exports IAvatarInfo
     * @interface IAvatarInfo
     * @property {number|null} [avatarId] AvatarInfo avatarId
     * @property {Long|null} [guid] AvatarInfo guid
     * @property {Object.<string,IPropValue>|null} [propMap] AvatarInfo propMap
     * @property {number|null} [lifeState] AvatarInfo lifeState
     * @property {Array.<Long>|null} [equipGuidList] AvatarInfo equipGuidList
     * @property {Array.<number>|null} [talentIdList] AvatarInfo talentIdList
     * @property {Object.<string,number>|null} [fightPropMap] AvatarInfo fightPropMap
     * @property {ITrialAvatarInfo|null} [trialAvatarInfo] AvatarInfo trialAvatarInfo
     * @property {Object.<string,IAvatarSkillInfo>|null} [skillMap] AvatarInfo skillMap
     * @property {number|null} [skillDepotId] AvatarInfo skillDepotId
     * @property {IAvatarFetterInfo|null} [fetterInfo] AvatarInfo fetterInfo
     * @property {number|null} [coreProudSkillLevel] AvatarInfo coreProudSkillLevel
     * @property {Array.<number>|null} [inherentProudSkillList] AvatarInfo inherentProudSkillList
     * @property {Object.<string,number>|null} [skillLevelMap] AvatarInfo skillLevelMap
     * @property {AvatarExpeditionState|null} [expeditionState] AvatarInfo expeditionState
     * @property {Object.<string,number>|null} [proudSkillExtraLevelMap] AvatarInfo proudSkillExtraLevelMap
     * @property {boolean|null} [isFocus] AvatarInfo isFocus
     * @property {number|null} [avatarType] AvatarInfo avatarType
     * @property {Array.<number>|null} [teamResonanceList] AvatarInfo teamResonanceList
     * @property {number|null} [wearingFlycloakId] AvatarInfo wearingFlycloakId
     * @property {Array.<IAvatarEquipAffixInfo>|null} [equipAffixList] AvatarInfo equipAffixList
     * @property {number|null} [bornTime] AvatarInfo bornTime
     * @property {Array.<number>|null} [pendingPromoteRewardList] AvatarInfo pendingPromoteRewardList
     * @property {number|null} [costumeId] AvatarInfo costumeId
     * @property {IAvatarExcelInfo|null} [excelInfo] AvatarInfo excelInfo
     * @property {number|null} [animHash] AvatarInfo animHash
     */

    /**
     * Constructs a new AvatarInfo.
     * @exports AvatarInfo
     * @classdesc Represents an AvatarInfo.
     * @implements IAvatarInfo
     * @constructor
     * @param {IAvatarInfo=} [properties] Properties to set
     */
    function AvatarInfo(properties) {
        this.propMap = {};
        this.equipGuidList = [];
        this.talentIdList = [];
        this.fightPropMap = {};
        this.skillMap = {};
        this.inherentProudSkillList = [];
        this.skillLevelMap = {};
        this.proudSkillExtraLevelMap = {};
        this.teamResonanceList = [];
        this.equipAffixList = [];
        this.pendingPromoteRewardList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarInfo avatarId.
     * @member {number} avatarId
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.avatarId = 0;

    /**
     * AvatarInfo guid.
     * @member {Long} guid
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.guid = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarInfo propMap.
     * @member {Object.<string,IPropValue>} propMap
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.propMap = $util.emptyObject;

    /**
     * AvatarInfo lifeState.
     * @member {number} lifeState
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.lifeState = 0;

    /**
     * AvatarInfo equipGuidList.
     * @member {Array.<Long>} equipGuidList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.equipGuidList = $util.emptyArray;

    /**
     * AvatarInfo talentIdList.
     * @member {Array.<number>} talentIdList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.talentIdList = $util.emptyArray;

    /**
     * AvatarInfo fightPropMap.
     * @member {Object.<string,number>} fightPropMap
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.fightPropMap = $util.emptyObject;

    /**
     * AvatarInfo trialAvatarInfo.
     * @member {ITrialAvatarInfo|null|undefined} trialAvatarInfo
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.trialAvatarInfo = null;

    /**
     * AvatarInfo skillMap.
     * @member {Object.<string,IAvatarSkillInfo>} skillMap
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.skillMap = $util.emptyObject;

    /**
     * AvatarInfo skillDepotId.
     * @member {number} skillDepotId
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.skillDepotId = 0;

    /**
     * AvatarInfo fetterInfo.
     * @member {IAvatarFetterInfo|null|undefined} fetterInfo
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.fetterInfo = null;

    /**
     * AvatarInfo coreProudSkillLevel.
     * @member {number} coreProudSkillLevel
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.coreProudSkillLevel = 0;

    /**
     * AvatarInfo inherentProudSkillList.
     * @member {Array.<number>} inherentProudSkillList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.inherentProudSkillList = $util.emptyArray;

    /**
     * AvatarInfo skillLevelMap.
     * @member {Object.<string,number>} skillLevelMap
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.skillLevelMap = $util.emptyObject;

    /**
     * AvatarInfo expeditionState.
     * @member {AvatarExpeditionState} expeditionState
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.expeditionState = 0;

    /**
     * AvatarInfo proudSkillExtraLevelMap.
     * @member {Object.<string,number>} proudSkillExtraLevelMap
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.proudSkillExtraLevelMap = $util.emptyObject;

    /**
     * AvatarInfo isFocus.
     * @member {boolean} isFocus
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.isFocus = false;

    /**
     * AvatarInfo avatarType.
     * @member {number} avatarType
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.avatarType = 0;

    /**
     * AvatarInfo teamResonanceList.
     * @member {Array.<number>} teamResonanceList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.teamResonanceList = $util.emptyArray;

    /**
     * AvatarInfo wearingFlycloakId.
     * @member {number} wearingFlycloakId
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.wearingFlycloakId = 0;

    /**
     * AvatarInfo equipAffixList.
     * @member {Array.<IAvatarEquipAffixInfo>} equipAffixList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.equipAffixList = $util.emptyArray;

    /**
     * AvatarInfo bornTime.
     * @member {number} bornTime
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.bornTime = 0;

    /**
     * AvatarInfo pendingPromoteRewardList.
     * @member {Array.<number>} pendingPromoteRewardList
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.pendingPromoteRewardList = $util.emptyArray;

    /**
     * AvatarInfo costumeId.
     * @member {number} costumeId
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.costumeId = 0;

    /**
     * AvatarInfo excelInfo.
     * @member {IAvatarExcelInfo|null|undefined} excelInfo
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.excelInfo = null;

    /**
     * AvatarInfo animHash.
     * @member {number} animHash
     * @memberof AvatarInfo
     * @instance
     */
    AvatarInfo.prototype.animHash = 0;

    /**
     * Creates a new AvatarInfo instance using the specified properties.
     * @function create
     * @memberof AvatarInfo
     * @static
     * @param {IAvatarInfo=} [properties] Properties to set
     * @returns {AvatarInfo} AvatarInfo instance
     */
    AvatarInfo.create = function create(properties) {
        return new AvatarInfo(properties);
    };

    /**
     * Encodes the specified AvatarInfo message. Does not implicitly {@link AvatarInfo.verify|verify} messages.
     * @function encode
     * @memberof AvatarInfo
     * @static
     * @param {IAvatarInfo} message AvatarInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.avatarId != null && Object.hasOwnProperty.call(message, "avatarId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.avatarId);
        if (message.guid != null && Object.hasOwnProperty.call(message, "guid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.guid);
        if (message.propMap != null && Object.hasOwnProperty.call(message, "propMap"))
            for (let keys = Object.keys(message.propMap), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.PropValue.encode(message.propMap[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.lifeState != null && Object.hasOwnProperty.call(message, "lifeState"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.lifeState);
        if (message.equipGuidList != null && message.equipGuidList.length) {
            writer.uint32(/* id 5, wireType 2 =*/42).fork();
            for (let i = 0; i < message.equipGuidList.length; ++i)
                writer.uint64(message.equipGuidList[i]);
            writer.ldelim();
        }
        if (message.talentIdList != null && message.talentIdList.length) {
            writer.uint32(/* id 6, wireType 2 =*/50).fork();
            for (let i = 0; i < message.talentIdList.length; ++i)
                writer.uint32(message.talentIdList[i]);
            writer.ldelim();
        }
        if (message.fightPropMap != null && Object.hasOwnProperty.call(message, "fightPropMap"))
            for (let keys = Object.keys(message.fightPropMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 7, wireType 2 =*/58).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 5 =*/21).float(message.fightPropMap[keys[i]]).ldelim();
        if (message.trialAvatarInfo != null && Object.hasOwnProperty.call(message, "trialAvatarInfo"))
            $root.TrialAvatarInfo.encode(message.trialAvatarInfo, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.skillMap != null && Object.hasOwnProperty.call(message, "skillMap"))
            for (let keys = Object.keys(message.skillMap), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 10, wireType 2 =*/82).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.AvatarSkillInfo.encode(message.skillMap[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.skillDepotId != null && Object.hasOwnProperty.call(message, "skillDepotId"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.skillDepotId);
        if (message.fetterInfo != null && Object.hasOwnProperty.call(message, "fetterInfo"))
            $root.AvatarFetterInfo.encode(message.fetterInfo, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
        if (message.coreProudSkillLevel != null && Object.hasOwnProperty.call(message, "coreProudSkillLevel"))
            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.coreProudSkillLevel);
        if (message.inherentProudSkillList != null && message.inherentProudSkillList.length) {
            writer.uint32(/* id 14, wireType 2 =*/114).fork();
            for (let i = 0; i < message.inherentProudSkillList.length; ++i)
                writer.uint32(message.inherentProudSkillList[i]);
            writer.ldelim();
        }
        if (message.skillLevelMap != null && Object.hasOwnProperty.call(message, "skillLevelMap"))
            for (let keys = Object.keys(message.skillLevelMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 15, wireType 2 =*/122).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.skillLevelMap[keys[i]]).ldelim();
        if (message.expeditionState != null && Object.hasOwnProperty.call(message, "expeditionState"))
            writer.uint32(/* id 16, wireType 0 =*/128).int32(message.expeditionState);
        if (message.proudSkillExtraLevelMap != null && Object.hasOwnProperty.call(message, "proudSkillExtraLevelMap"))
            for (let keys = Object.keys(message.proudSkillExtraLevelMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 17, wireType 2 =*/138).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.proudSkillExtraLevelMap[keys[i]]).ldelim();
        if (message.isFocus != null && Object.hasOwnProperty.call(message, "isFocus"))
            writer.uint32(/* id 18, wireType 0 =*/144).bool(message.isFocus);
        if (message.avatarType != null && Object.hasOwnProperty.call(message, "avatarType"))
            writer.uint32(/* id 19, wireType 0 =*/152).uint32(message.avatarType);
        if (message.teamResonanceList != null && message.teamResonanceList.length) {
            writer.uint32(/* id 20, wireType 2 =*/162).fork();
            for (let i = 0; i < message.teamResonanceList.length; ++i)
                writer.uint32(message.teamResonanceList[i]);
            writer.ldelim();
        }
        if (message.wearingFlycloakId != null && Object.hasOwnProperty.call(message, "wearingFlycloakId"))
            writer.uint32(/* id 21, wireType 0 =*/168).uint32(message.wearingFlycloakId);
        if (message.equipAffixList != null && message.equipAffixList.length)
            for (let i = 0; i < message.equipAffixList.length; ++i)
                $root.AvatarEquipAffixInfo.encode(message.equipAffixList[i], writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
        if (message.bornTime != null && Object.hasOwnProperty.call(message, "bornTime"))
            writer.uint32(/* id 23, wireType 0 =*/184).uint32(message.bornTime);
        if (message.pendingPromoteRewardList != null && message.pendingPromoteRewardList.length) {
            writer.uint32(/* id 24, wireType 2 =*/194).fork();
            for (let i = 0; i < message.pendingPromoteRewardList.length; ++i)
                writer.uint32(message.pendingPromoteRewardList[i]);
            writer.ldelim();
        }
        if (message.costumeId != null && Object.hasOwnProperty.call(message, "costumeId"))
            writer.uint32(/* id 25, wireType 0 =*/200).uint32(message.costumeId);
        if (message.excelInfo != null && Object.hasOwnProperty.call(message, "excelInfo"))
            $root.AvatarExcelInfo.encode(message.excelInfo, writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
        if (message.animHash != null && Object.hasOwnProperty.call(message, "animHash"))
            writer.uint32(/* id 27, wireType 0 =*/216).uint32(message.animHash);
        return writer;
    };

    /**
     * Encodes the specified AvatarInfo message, length delimited. Does not implicitly {@link AvatarInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarInfo
     * @static
     * @param {IAvatarInfo} message AvatarInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarInfo message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarInfo} AvatarInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarInfo(), key, value, end2;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.avatarId = reader.uint32();
                    break;
                case 2:
                    message.guid = reader.uint64();
                    break;
                case 3:
                    if (message.propMap === $util.emptyObject)
                        message.propMap = {};
                    end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = null;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = $root.PropValue.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.propMap[key] = value;
                    break;
                case 4:
                    message.lifeState = reader.uint32();
                    break;
                case 5:
                    if (!(message.equipGuidList && message.equipGuidList.length))
                        message.equipGuidList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.equipGuidList.push(reader.uint64());
                    } else
                        message.equipGuidList.push(reader.uint64());
                    break;
                case 6:
                    if (!(message.talentIdList && message.talentIdList.length))
                        message.talentIdList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.talentIdList.push(reader.uint32());
                    } else
                        message.talentIdList.push(reader.uint32());
                    break;
                case 7:
                    if (message.fightPropMap === $util.emptyObject)
                        message.fightPropMap = {};
                    end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = 0;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = reader.float();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.fightPropMap[key] = value;
                    break;
                case 9:
                    message.trialAvatarInfo = $root.TrialAvatarInfo.decode(reader, reader.uint32());
                    break;
                case 10:
                    if (message.skillMap === $util.emptyObject)
                        message.skillMap = {};
                    end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = null;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = $root.AvatarSkillInfo.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.skillMap[key] = value;
                    break;
                case 11:
                    message.skillDepotId = reader.uint32();
                    break;
                case 12:
                    message.fetterInfo = $root.AvatarFetterInfo.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.coreProudSkillLevel = reader.uint32();
                    break;
                case 14:
                    if (!(message.inherentProudSkillList && message.inherentProudSkillList.length))
                        message.inherentProudSkillList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.inherentProudSkillList.push(reader.uint32());
                    } else
                        message.inherentProudSkillList.push(reader.uint32());
                    break;
                case 15:
                    if (message.skillLevelMap === $util.emptyObject)
                        message.skillLevelMap = {};
                    end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = 0;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.skillLevelMap[key] = value;
                    break;
                case 16:
                    message.expeditionState = reader.int32();
                    break;
                case 17:
                    if (message.proudSkillExtraLevelMap === $util.emptyObject)
                        message.proudSkillExtraLevelMap = {};
                    end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = 0;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.proudSkillExtraLevelMap[key] = value;
                    break;
                case 18:
                    message.isFocus = reader.bool();
                    break;
                case 19:
                    message.avatarType = reader.uint32();
                    break;
                case 20:
                    if (!(message.teamResonanceList && message.teamResonanceList.length))
                        message.teamResonanceList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.teamResonanceList.push(reader.uint32());
                    } else
                        message.teamResonanceList.push(reader.uint32());
                    break;
                case 21:
                    message.wearingFlycloakId = reader.uint32();
                    break;
                case 22:
                    if (!(message.equipAffixList && message.equipAffixList.length))
                        message.equipAffixList = [];
                    message.equipAffixList.push($root.AvatarEquipAffixInfo.decode(reader, reader.uint32()));
                    break;
                case 23:
                    message.bornTime = reader.uint32();
                    break;
                case 24:
                    if (!(message.pendingPromoteRewardList && message.pendingPromoteRewardList.length))
                        message.pendingPromoteRewardList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.pendingPromoteRewardList.push(reader.uint32());
                    } else
                        message.pendingPromoteRewardList.push(reader.uint32());
                    break;
                case 25:
                    message.costumeId = reader.uint32();
                    break;
                case 26:
                    message.excelInfo = $root.AvatarExcelInfo.decode(reader, reader.uint32());
                    break;
                case 27:
                    message.animHash = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarInfo} AvatarInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarInfo message.
     * @function verify
     * @memberof AvatarInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.avatarId != null && message.hasOwnProperty("avatarId"))
            if (!$util.isInteger(message.avatarId))
                return "avatarId: integer expected";
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (!$util.isInteger(message.guid) && !(message.guid && $util.isInteger(message.guid.low) && $util.isInteger(message.guid.high)))
                return "guid: integer|Long expected";
        if (message.propMap != null && message.hasOwnProperty("propMap")) {
            if (!$util.isObject(message.propMap))
                return "propMap: object expected";
            let key = Object.keys(message.propMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "propMap: integer key{k:uint32} expected";
                {
                    let error = $root.PropValue.verify(message.propMap[key[i]]);
                    if (error)
                        return "propMap." + error;
                }
            }
        }
        if (message.lifeState != null && message.hasOwnProperty("lifeState"))
            if (!$util.isInteger(message.lifeState))
                return "lifeState: integer expected";
        if (message.equipGuidList != null && message.hasOwnProperty("equipGuidList")) {
            if (!Array.isArray(message.equipGuidList))
                return "equipGuidList: array expected";
            for (let i = 0; i < message.equipGuidList.length; ++i)
                if (!$util.isInteger(message.equipGuidList[i]) && !(message.equipGuidList[i] && $util.isInteger(message.equipGuidList[i].low) && $util.isInteger(message.equipGuidList[i].high)))
                    return "equipGuidList: integer|Long[] expected";
        }
        if (message.talentIdList != null && message.hasOwnProperty("talentIdList")) {
            if (!Array.isArray(message.talentIdList))
                return "talentIdList: array expected";
            for (let i = 0; i < message.talentIdList.length; ++i)
                if (!$util.isInteger(message.talentIdList[i]))
                    return "talentIdList: integer[] expected";
        }
        if (message.fightPropMap != null && message.hasOwnProperty("fightPropMap")) {
            if (!$util.isObject(message.fightPropMap))
                return "fightPropMap: object expected";
            let key = Object.keys(message.fightPropMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "fightPropMap: integer key{k:uint32} expected";
                if (typeof message.fightPropMap[key[i]] !== "number")
                    return "fightPropMap: number{k:uint32} expected";
            }
        }
        if (message.trialAvatarInfo != null && message.hasOwnProperty("trialAvatarInfo")) {
            let error = $root.TrialAvatarInfo.verify(message.trialAvatarInfo);
            if (error)
                return "trialAvatarInfo." + error;
        }
        if (message.skillMap != null && message.hasOwnProperty("skillMap")) {
            if (!$util.isObject(message.skillMap))
                return "skillMap: object expected";
            let key = Object.keys(message.skillMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "skillMap: integer key{k:uint32} expected";
                {
                    let error = $root.AvatarSkillInfo.verify(message.skillMap[key[i]]);
                    if (error)
                        return "skillMap." + error;
                }
            }
        }
        if (message.skillDepotId != null && message.hasOwnProperty("skillDepotId"))
            if (!$util.isInteger(message.skillDepotId))
                return "skillDepotId: integer expected";
        if (message.fetterInfo != null && message.hasOwnProperty("fetterInfo")) {
            let error = $root.AvatarFetterInfo.verify(message.fetterInfo);
            if (error)
                return "fetterInfo." + error;
        }
        if (message.coreProudSkillLevel != null && message.hasOwnProperty("coreProudSkillLevel"))
            if (!$util.isInteger(message.coreProudSkillLevel))
                return "coreProudSkillLevel: integer expected";
        if (message.inherentProudSkillList != null && message.hasOwnProperty("inherentProudSkillList")) {
            if (!Array.isArray(message.inherentProudSkillList))
                return "inherentProudSkillList: array expected";
            for (let i = 0; i < message.inherentProudSkillList.length; ++i)
                if (!$util.isInteger(message.inherentProudSkillList[i]))
                    return "inherentProudSkillList: integer[] expected";
        }
        if (message.skillLevelMap != null && message.hasOwnProperty("skillLevelMap")) {
            if (!$util.isObject(message.skillLevelMap))
                return "skillLevelMap: object expected";
            let key = Object.keys(message.skillLevelMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "skillLevelMap: integer key{k:uint32} expected";
                if (!$util.isInteger(message.skillLevelMap[key[i]]))
                    return "skillLevelMap: integer{k:uint32} expected";
            }
        }
        if (message.expeditionState != null && message.hasOwnProperty("expeditionState"))
            switch (message.expeditionState) {
                default:
                    return "expeditionState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
            }
        if (message.proudSkillExtraLevelMap != null && message.hasOwnProperty("proudSkillExtraLevelMap")) {
            if (!$util.isObject(message.proudSkillExtraLevelMap))
                return "proudSkillExtraLevelMap: object expected";
            let key = Object.keys(message.proudSkillExtraLevelMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "proudSkillExtraLevelMap: integer key{k:uint32} expected";
                if (!$util.isInteger(message.proudSkillExtraLevelMap[key[i]]))
                    return "proudSkillExtraLevelMap: integer{k:uint32} expected";
            }
        }
        if (message.isFocus != null && message.hasOwnProperty("isFocus"))
            if (typeof message.isFocus !== "boolean")
                return "isFocus: boolean expected";
        if (message.avatarType != null && message.hasOwnProperty("avatarType"))
            if (!$util.isInteger(message.avatarType))
                return "avatarType: integer expected";
        if (message.teamResonanceList != null && message.hasOwnProperty("teamResonanceList")) {
            if (!Array.isArray(message.teamResonanceList))
                return "teamResonanceList: array expected";
            for (let i = 0; i < message.teamResonanceList.length; ++i)
                if (!$util.isInteger(message.teamResonanceList[i]))
                    return "teamResonanceList: integer[] expected";
        }
        if (message.wearingFlycloakId != null && message.hasOwnProperty("wearingFlycloakId"))
            if (!$util.isInteger(message.wearingFlycloakId))
                return "wearingFlycloakId: integer expected";
        if (message.equipAffixList != null && message.hasOwnProperty("equipAffixList")) {
            if (!Array.isArray(message.equipAffixList))
                return "equipAffixList: array expected";
            for (let i = 0; i < message.equipAffixList.length; ++i) {
                let error = $root.AvatarEquipAffixInfo.verify(message.equipAffixList[i]);
                if (error)
                    return "equipAffixList." + error;
            }
        }
        if (message.bornTime != null && message.hasOwnProperty("bornTime"))
            if (!$util.isInteger(message.bornTime))
                return "bornTime: integer expected";
        if (message.pendingPromoteRewardList != null && message.hasOwnProperty("pendingPromoteRewardList")) {
            if (!Array.isArray(message.pendingPromoteRewardList))
                return "pendingPromoteRewardList: array expected";
            for (let i = 0; i < message.pendingPromoteRewardList.length; ++i)
                if (!$util.isInteger(message.pendingPromoteRewardList[i]))
                    return "pendingPromoteRewardList: integer[] expected";
        }
        if (message.costumeId != null && message.hasOwnProperty("costumeId"))
            if (!$util.isInteger(message.costumeId))
                return "costumeId: integer expected";
        if (message.excelInfo != null && message.hasOwnProperty("excelInfo")) {
            let error = $root.AvatarExcelInfo.verify(message.excelInfo);
            if (error)
                return "excelInfo." + error;
        }
        if (message.animHash != null && message.hasOwnProperty("animHash"))
            if (!$util.isInteger(message.animHash))
                return "animHash: integer expected";
        return null;
    };

    /**
     * Creates an AvatarInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarInfo} AvatarInfo
     */
    AvatarInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarInfo)
            return object;
        let message = new $root.AvatarInfo();
        if (object.avatarId != null)
            message.avatarId = object.avatarId >>> 0;
        if (object.guid != null)
            if ($util.Long)
                (message.guid = $util.Long.fromValue(object.guid)).unsigned = true;
            else if (typeof object.guid === "string")
                message.guid = parseInt(object.guid, 10);
            else if (typeof object.guid === "number")
                message.guid = object.guid;
            else if (typeof object.guid === "object")
                message.guid = new $util.LongBits(object.guid.low >>> 0, object.guid.high >>> 0).toNumber(true);
        if (object.propMap) {
            if (typeof object.propMap !== "object")
                throw TypeError(".AvatarInfo.propMap: object expected");
            message.propMap = {};
            for (let keys = Object.keys(object.propMap), i = 0; i < keys.length; ++i) {
                if (typeof object.propMap[keys[i]] !== "object")
                    throw TypeError(".AvatarInfo.propMap: object expected");
                message.propMap[keys[i]] = $root.PropValue.fromObject(object.propMap[keys[i]]);
            }
        }
        if (object.lifeState != null)
            message.lifeState = object.lifeState >>> 0;
        if (object.equipGuidList) {
            if (!Array.isArray(object.equipGuidList))
                throw TypeError(".AvatarInfo.equipGuidList: array expected");
            message.equipGuidList = [];
            for (let i = 0; i < object.equipGuidList.length; ++i)
                if ($util.Long)
                    (message.equipGuidList[i] = $util.Long.fromValue(object.equipGuidList[i])).unsigned = true;
                else if (typeof object.equipGuidList[i] === "string")
                    message.equipGuidList[i] = parseInt(object.equipGuidList[i], 10);
                else if (typeof object.equipGuidList[i] === "number")
                    message.equipGuidList[i] = object.equipGuidList[i];
                else if (typeof object.equipGuidList[i] === "object")
                    message.equipGuidList[i] = new $util.LongBits(object.equipGuidList[i].low >>> 0, object.equipGuidList[i].high >>> 0).toNumber(true);
        }
        if (object.talentIdList) {
            if (!Array.isArray(object.talentIdList))
                throw TypeError(".AvatarInfo.talentIdList: array expected");
            message.talentIdList = [];
            for (let i = 0; i < object.talentIdList.length; ++i)
                message.talentIdList[i] = object.talentIdList[i] >>> 0;
        }
        if (object.fightPropMap) {
            if (typeof object.fightPropMap !== "object")
                throw TypeError(".AvatarInfo.fightPropMap: object expected");
            message.fightPropMap = {};
            for (let keys = Object.keys(object.fightPropMap), i = 0; i < keys.length; ++i)
                message.fightPropMap[keys[i]] = Number(object.fightPropMap[keys[i]]);
        }
        if (object.trialAvatarInfo != null) {
            if (typeof object.trialAvatarInfo !== "object")
                throw TypeError(".AvatarInfo.trialAvatarInfo: object expected");
            message.trialAvatarInfo = $root.TrialAvatarInfo.fromObject(object.trialAvatarInfo);
        }
        if (object.skillMap) {
            if (typeof object.skillMap !== "object")
                throw TypeError(".AvatarInfo.skillMap: object expected");
            message.skillMap = {};
            for (let keys = Object.keys(object.skillMap), i = 0; i < keys.length; ++i) {
                if (typeof object.skillMap[keys[i]] !== "object")
                    throw TypeError(".AvatarInfo.skillMap: object expected");
                message.skillMap[keys[i]] = $root.AvatarSkillInfo.fromObject(object.skillMap[keys[i]]);
            }
        }
        if (object.skillDepotId != null)
            message.skillDepotId = object.skillDepotId >>> 0;
        if (object.fetterInfo != null) {
            if (typeof object.fetterInfo !== "object")
                throw TypeError(".AvatarInfo.fetterInfo: object expected");
            message.fetterInfo = $root.AvatarFetterInfo.fromObject(object.fetterInfo);
        }
        if (object.coreProudSkillLevel != null)
            message.coreProudSkillLevel = object.coreProudSkillLevel >>> 0;
        if (object.inherentProudSkillList) {
            if (!Array.isArray(object.inherentProudSkillList))
                throw TypeError(".AvatarInfo.inherentProudSkillList: array expected");
            message.inherentProudSkillList = [];
            for (let i = 0; i < object.inherentProudSkillList.length; ++i)
                message.inherentProudSkillList[i] = object.inherentProudSkillList[i] >>> 0;
        }
        if (object.skillLevelMap) {
            if (typeof object.skillLevelMap !== "object")
                throw TypeError(".AvatarInfo.skillLevelMap: object expected");
            message.skillLevelMap = {};
            for (let keys = Object.keys(object.skillLevelMap), i = 0; i < keys.length; ++i)
                message.skillLevelMap[keys[i]] = object.skillLevelMap[keys[i]] >>> 0;
        }
        switch (object.expeditionState) {
            case "AVATAR_EXPEDITION_STATE_NONE":
            case 0:
                message.expeditionState = 0;
                break;
            case "AVATAR_EXPEDITION_STATE_DOING":
            case 1:
                message.expeditionState = 1;
                break;
            case "AVATAR_EXPEDITION_STATE_FINISH_WAIT_REWARD":
            case 2:
                message.expeditionState = 2;
                break;
            case "AVATAR_EXPEDITION_STATE_CALLBACK_WAIT_REWARD":
            case 3:
                message.expeditionState = 3;
                break;
            case "AVATAR_EXPEDITION_STATE_LOCKED":
            case 4:
                message.expeditionState = 4;
                break;
        }
        if (object.proudSkillExtraLevelMap) {
            if (typeof object.proudSkillExtraLevelMap !== "object")
                throw TypeError(".AvatarInfo.proudSkillExtraLevelMap: object expected");
            message.proudSkillExtraLevelMap = {};
            for (let keys = Object.keys(object.proudSkillExtraLevelMap), i = 0; i < keys.length; ++i)
                message.proudSkillExtraLevelMap[keys[i]] = object.proudSkillExtraLevelMap[keys[i]] >>> 0;
        }
        if (object.isFocus != null)
            message.isFocus = Boolean(object.isFocus);
        if (object.avatarType != null)
            message.avatarType = object.avatarType >>> 0;
        if (object.teamResonanceList) {
            if (!Array.isArray(object.teamResonanceList))
                throw TypeError(".AvatarInfo.teamResonanceList: array expected");
            message.teamResonanceList = [];
            for (let i = 0; i < object.teamResonanceList.length; ++i)
                message.teamResonanceList[i] = object.teamResonanceList[i] >>> 0;
        }
        if (object.wearingFlycloakId != null)
            message.wearingFlycloakId = object.wearingFlycloakId >>> 0;
        if (object.equipAffixList) {
            if (!Array.isArray(object.equipAffixList))
                throw TypeError(".AvatarInfo.equipAffixList: array expected");
            message.equipAffixList = [];
            for (let i = 0; i < object.equipAffixList.length; ++i) {
                if (typeof object.equipAffixList[i] !== "object")
                    throw TypeError(".AvatarInfo.equipAffixList: object expected");
                message.equipAffixList[i] = $root.AvatarEquipAffixInfo.fromObject(object.equipAffixList[i]);
            }
        }
        if (object.bornTime != null)
            message.bornTime = object.bornTime >>> 0;
        if (object.pendingPromoteRewardList) {
            if (!Array.isArray(object.pendingPromoteRewardList))
                throw TypeError(".AvatarInfo.pendingPromoteRewardList: array expected");
            message.pendingPromoteRewardList = [];
            for (let i = 0; i < object.pendingPromoteRewardList.length; ++i)
                message.pendingPromoteRewardList[i] = object.pendingPromoteRewardList[i] >>> 0;
        }
        if (object.costumeId != null)
            message.costumeId = object.costumeId >>> 0;
        if (object.excelInfo != null) {
            if (typeof object.excelInfo !== "object")
                throw TypeError(".AvatarInfo.excelInfo: object expected");
            message.excelInfo = $root.AvatarExcelInfo.fromObject(object.excelInfo);
        }
        if (object.animHash != null)
            message.animHash = object.animHash >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an AvatarInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarInfo
     * @static
     * @param {AvatarInfo} message AvatarInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.equipGuidList = [];
            object.talentIdList = [];
            object.inherentProudSkillList = [];
            object.teamResonanceList = [];
            object.equipAffixList = [];
            object.pendingPromoteRewardList = [];
        }
        if (options.objects || options.defaults) {
            object.propMap = {};
            object.fightPropMap = {};
            object.skillMap = {};
            object.skillLevelMap = {};
            object.proudSkillExtraLevelMap = {};
        }
        if (options.defaults) {
            object.avatarId = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.guid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.guid = options.longs === String ? "0" : 0;
            object.lifeState = 0;
            object.trialAvatarInfo = null;
            object.skillDepotId = 0;
            object.fetterInfo = null;
            object.coreProudSkillLevel = 0;
            object.expeditionState = options.enums === String ? "AVATAR_EXPEDITION_STATE_NONE" : 0;
            object.isFocus = false;
            object.avatarType = 0;
            object.wearingFlycloakId = 0;
            object.bornTime = 0;
            object.costumeId = 0;
            object.excelInfo = null;
            object.animHash = 0;
        }
        if (message.avatarId != null && message.hasOwnProperty("avatarId"))
            object.avatarId = message.avatarId;
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (typeof message.guid === "number")
                object.guid = options.longs === String ? String(message.guid) : message.guid;
            else
                object.guid = options.longs === String ? $util.Long.prototype.toString.call(message.guid) : options.longs === Number ? new $util.LongBits(message.guid.low >>> 0, message.guid.high >>> 0).toNumber(true) : message.guid;
        let keys2;
        if (message.propMap && (keys2 = Object.keys(message.propMap)).length) {
            object.propMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.propMap[keys2[j]] = $root.PropValue.toObject(message.propMap[keys2[j]], options);
        }
        if (message.lifeState != null && message.hasOwnProperty("lifeState"))
            object.lifeState = message.lifeState;
        if (message.equipGuidList && message.equipGuidList.length) {
            object.equipGuidList = [];
            for (let j = 0; j < message.equipGuidList.length; ++j)
                if (typeof message.equipGuidList[j] === "number")
                    object.equipGuidList[j] = options.longs === String ? String(message.equipGuidList[j]) : message.equipGuidList[j];
                else
                    object.equipGuidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.equipGuidList[j]) : options.longs === Number ? new $util.LongBits(message.equipGuidList[j].low >>> 0, message.equipGuidList[j].high >>> 0).toNumber(true) : message.equipGuidList[j];
        }
        if (message.talentIdList && message.talentIdList.length) {
            object.talentIdList = [];
            for (let j = 0; j < message.talentIdList.length; ++j)
                object.talentIdList[j] = message.talentIdList[j];
        }
        if (message.fightPropMap && (keys2 = Object.keys(message.fightPropMap)).length) {
            object.fightPropMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.fightPropMap[keys2[j]] = options.json && !isFinite(message.fightPropMap[keys2[j]]) ? String(message.fightPropMap[keys2[j]]) : message.fightPropMap[keys2[j]];
        }
        if (message.trialAvatarInfo != null && message.hasOwnProperty("trialAvatarInfo"))
            object.trialAvatarInfo = $root.TrialAvatarInfo.toObject(message.trialAvatarInfo, options);
        if (message.skillMap && (keys2 = Object.keys(message.skillMap)).length) {
            object.skillMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.skillMap[keys2[j]] = $root.AvatarSkillInfo.toObject(message.skillMap[keys2[j]], options);
        }
        if (message.skillDepotId != null && message.hasOwnProperty("skillDepotId"))
            object.skillDepotId = message.skillDepotId;
        if (message.fetterInfo != null && message.hasOwnProperty("fetterInfo"))
            object.fetterInfo = $root.AvatarFetterInfo.toObject(message.fetterInfo, options);
        if (message.coreProudSkillLevel != null && message.hasOwnProperty("coreProudSkillLevel"))
            object.coreProudSkillLevel = message.coreProudSkillLevel;
        if (message.inherentProudSkillList && message.inherentProudSkillList.length) {
            object.inherentProudSkillList = [];
            for (let j = 0; j < message.inherentProudSkillList.length; ++j)
                object.inherentProudSkillList[j] = message.inherentProudSkillList[j];
        }
        if (message.skillLevelMap && (keys2 = Object.keys(message.skillLevelMap)).length) {
            object.skillLevelMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.skillLevelMap[keys2[j]] = message.skillLevelMap[keys2[j]];
        }
        if (message.expeditionState != null && message.hasOwnProperty("expeditionState"))
            object.expeditionState = options.enums === String ? $root.AvatarExpeditionState[message.expeditionState] : message.expeditionState;
        if (message.proudSkillExtraLevelMap && (keys2 = Object.keys(message.proudSkillExtraLevelMap)).length) {
            object.proudSkillExtraLevelMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.proudSkillExtraLevelMap[keys2[j]] = message.proudSkillExtraLevelMap[keys2[j]];
        }
        if (message.isFocus != null && message.hasOwnProperty("isFocus"))
            object.isFocus = message.isFocus;
        if (message.avatarType != null && message.hasOwnProperty("avatarType"))
            object.avatarType = message.avatarType;
        if (message.teamResonanceList && message.teamResonanceList.length) {
            object.teamResonanceList = [];
            for (let j = 0; j < message.teamResonanceList.length; ++j)
                object.teamResonanceList[j] = message.teamResonanceList[j];
        }
        if (message.wearingFlycloakId != null && message.hasOwnProperty("wearingFlycloakId"))
            object.wearingFlycloakId = message.wearingFlycloakId;
        if (message.equipAffixList && message.equipAffixList.length) {
            object.equipAffixList = [];
            for (let j = 0; j < message.equipAffixList.length; ++j)
                object.equipAffixList[j] = $root.AvatarEquipAffixInfo.toObject(message.equipAffixList[j], options);
        }
        if (message.bornTime != null && message.hasOwnProperty("bornTime"))
            object.bornTime = message.bornTime;
        if (message.pendingPromoteRewardList && message.pendingPromoteRewardList.length) {
            object.pendingPromoteRewardList = [];
            for (let j = 0; j < message.pendingPromoteRewardList.length; ++j)
                object.pendingPromoteRewardList[j] = message.pendingPromoteRewardList[j];
        }
        if (message.costumeId != null && message.hasOwnProperty("costumeId"))
            object.costumeId = message.costumeId;
        if (message.excelInfo != null && message.hasOwnProperty("excelInfo"))
            object.excelInfo = $root.AvatarExcelInfo.toObject(message.excelInfo, options);
        if (message.animHash != null && message.hasOwnProperty("animHash"))
            object.animHash = message.animHash;
        return object;
    };

    /**
     * Converts this AvatarInfo to JSON.
     * @function toJSON
     * @memberof AvatarInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarInfo;
})();

export const AvatarEquipAffixInfo = $root.AvatarEquipAffixInfo = (() => {

    /**
     * Properties of an AvatarEquipAffixInfo.
     * @exports IAvatarEquipAffixInfo
     * @interface IAvatarEquipAffixInfo
     * @property {number|null} [equipAffixId] AvatarEquipAffixInfo equipAffixId
     * @property {number|null} [leftCdTime] AvatarEquipAffixInfo leftCdTime
     */

    /**
     * Constructs a new AvatarEquipAffixInfo.
     * @exports AvatarEquipAffixInfo
     * @classdesc Represents an AvatarEquipAffixInfo.
     * @implements IAvatarEquipAffixInfo
     * @constructor
     * @param {IAvatarEquipAffixInfo=} [properties] Properties to set
     */
    function AvatarEquipAffixInfo(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarEquipAffixInfo equipAffixId.
     * @member {number} equipAffixId
     * @memberof AvatarEquipAffixInfo
     * @instance
     */
    AvatarEquipAffixInfo.prototype.equipAffixId = 0;

    /**
     * AvatarEquipAffixInfo leftCdTime.
     * @member {number} leftCdTime
     * @memberof AvatarEquipAffixInfo
     * @instance
     */
    AvatarEquipAffixInfo.prototype.leftCdTime = 0;

    /**
     * Creates a new AvatarEquipAffixInfo instance using the specified properties.
     * @function create
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {IAvatarEquipAffixInfo=} [properties] Properties to set
     * @returns {AvatarEquipAffixInfo} AvatarEquipAffixInfo instance
     */
    AvatarEquipAffixInfo.create = function create(properties) {
        return new AvatarEquipAffixInfo(properties);
    };

    /**
     * Encodes the specified AvatarEquipAffixInfo message. Does not implicitly {@link AvatarEquipAffixInfo.verify|verify} messages.
     * @function encode
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {IAvatarEquipAffixInfo} message AvatarEquipAffixInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarEquipAffixInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.equipAffixId != null && Object.hasOwnProperty.call(message, "equipAffixId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.equipAffixId);
        if (message.leftCdTime != null && Object.hasOwnProperty.call(message, "leftCdTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.leftCdTime);
        return writer;
    };

    /**
     * Encodes the specified AvatarEquipAffixInfo message, length delimited. Does not implicitly {@link AvatarEquipAffixInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {IAvatarEquipAffixInfo} message AvatarEquipAffixInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarEquipAffixInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarEquipAffixInfo message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarEquipAffixInfo} AvatarEquipAffixInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarEquipAffixInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarEquipAffixInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.equipAffixId = reader.uint32();
                    break;
                case 2:
                    message.leftCdTime = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarEquipAffixInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarEquipAffixInfo} AvatarEquipAffixInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarEquipAffixInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarEquipAffixInfo message.
     * @function verify
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarEquipAffixInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.equipAffixId != null && message.hasOwnProperty("equipAffixId"))
            if (!$util.isInteger(message.equipAffixId))
                return "equipAffixId: integer expected";
        if (message.leftCdTime != null && message.hasOwnProperty("leftCdTime"))
            if (!$util.isInteger(message.leftCdTime))
                return "leftCdTime: integer expected";
        return null;
    };

    /**
     * Creates an AvatarEquipAffixInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarEquipAffixInfo} AvatarEquipAffixInfo
     */
    AvatarEquipAffixInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarEquipAffixInfo)
            return object;
        let message = new $root.AvatarEquipAffixInfo();
        if (object.equipAffixId != null)
            message.equipAffixId = object.equipAffixId >>> 0;
        if (object.leftCdTime != null)
            message.leftCdTime = object.leftCdTime >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an AvatarEquipAffixInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarEquipAffixInfo
     * @static
     * @param {AvatarEquipAffixInfo} message AvatarEquipAffixInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarEquipAffixInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.equipAffixId = 0;
            object.leftCdTime = 0;
        }
        if (message.equipAffixId != null && message.hasOwnProperty("equipAffixId"))
            object.equipAffixId = message.equipAffixId;
        if (message.leftCdTime != null && message.hasOwnProperty("leftCdTime"))
            object.leftCdTime = message.leftCdTime;
        return object;
    };

    /**
     * Converts this AvatarEquipAffixInfo to JSON.
     * @function toJSON
     * @memberof AvatarEquipAffixInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarEquipAffixInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarEquipAffixInfo;
})();

export const AvatarExcelInfo = $root.AvatarExcelInfo = (() => {

    /**
     * Properties of an AvatarExcelInfo.
     * @exports IAvatarExcelInfo
     * @interface IAvatarExcelInfo
     * @property {Long|null} [prefabPathHash] AvatarExcelInfo prefabPathHash
     * @property {Long|null} [prefabPathRemoteHash] AvatarExcelInfo prefabPathRemoteHash
     * @property {Long|null} [controllerPathHash] AvatarExcelInfo controllerPathHash
     * @property {Long|null} [controllerPathRemoteHash] AvatarExcelInfo controllerPathRemoteHash
     * @property {Long|null} [combatConfigHash] AvatarExcelInfo combatConfigHash
     */

    /**
     * Constructs a new AvatarExcelInfo.
     * @exports AvatarExcelInfo
     * @classdesc Represents an AvatarExcelInfo.
     * @implements IAvatarExcelInfo
     * @constructor
     * @param {IAvatarExcelInfo=} [properties] Properties to set
     */
    function AvatarExcelInfo(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarExcelInfo prefabPathHash.
     * @member {Long} prefabPathHash
     * @memberof AvatarExcelInfo
     * @instance
     */
    AvatarExcelInfo.prototype.prefabPathHash = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarExcelInfo prefabPathRemoteHash.
     * @member {Long} prefabPathRemoteHash
     * @memberof AvatarExcelInfo
     * @instance
     */
    AvatarExcelInfo.prototype.prefabPathRemoteHash = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarExcelInfo controllerPathHash.
     * @member {Long} controllerPathHash
     * @memberof AvatarExcelInfo
     * @instance
     */
    AvatarExcelInfo.prototype.controllerPathHash = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarExcelInfo controllerPathRemoteHash.
     * @member {Long} controllerPathRemoteHash
     * @memberof AvatarExcelInfo
     * @instance
     */
    AvatarExcelInfo.prototype.controllerPathRemoteHash = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * AvatarExcelInfo combatConfigHash.
     * @member {Long} combatConfigHash
     * @memberof AvatarExcelInfo
     * @instance
     */
    AvatarExcelInfo.prototype.combatConfigHash = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * Creates a new AvatarExcelInfo instance using the specified properties.
     * @function create
     * @memberof AvatarExcelInfo
     * @static
     * @param {IAvatarExcelInfo=} [properties] Properties to set
     * @returns {AvatarExcelInfo} AvatarExcelInfo instance
     */
    AvatarExcelInfo.create = function create(properties) {
        return new AvatarExcelInfo(properties);
    };

    /**
     * Encodes the specified AvatarExcelInfo message. Does not implicitly {@link AvatarExcelInfo.verify|verify} messages.
     * @function encode
     * @memberof AvatarExcelInfo
     * @static
     * @param {IAvatarExcelInfo} message AvatarExcelInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarExcelInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.prefabPathHash != null && Object.hasOwnProperty.call(message, "prefabPathHash"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.prefabPathHash);
        if (message.prefabPathRemoteHash != null && Object.hasOwnProperty.call(message, "prefabPathRemoteHash"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.prefabPathRemoteHash);
        if (message.controllerPathHash != null && Object.hasOwnProperty.call(message, "controllerPathHash"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.controllerPathHash);
        if (message.controllerPathRemoteHash != null && Object.hasOwnProperty.call(message, "controllerPathRemoteHash"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.controllerPathRemoteHash);
        if (message.combatConfigHash != null && Object.hasOwnProperty.call(message, "combatConfigHash"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.combatConfigHash);
        return writer;
    };

    /**
     * Encodes the specified AvatarExcelInfo message, length delimited. Does not implicitly {@link AvatarExcelInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarExcelInfo
     * @static
     * @param {IAvatarExcelInfo} message AvatarExcelInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarExcelInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarExcelInfo message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarExcelInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarExcelInfo} AvatarExcelInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarExcelInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarExcelInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.prefabPathHash = reader.uint64();
                    break;
                case 2:
                    message.prefabPathRemoteHash = reader.uint64();
                    break;
                case 3:
                    message.controllerPathHash = reader.uint64();
                    break;
                case 4:
                    message.controllerPathRemoteHash = reader.uint64();
                    break;
                case 5:
                    message.combatConfigHash = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarExcelInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarExcelInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarExcelInfo} AvatarExcelInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarExcelInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarExcelInfo message.
     * @function verify
     * @memberof AvatarExcelInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarExcelInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.prefabPathHash != null && message.hasOwnProperty("prefabPathHash"))
            if (!$util.isInteger(message.prefabPathHash) && !(message.prefabPathHash && $util.isInteger(message.prefabPathHash.low) && $util.isInteger(message.prefabPathHash.high)))
                return "prefabPathHash: integer|Long expected";
        if (message.prefabPathRemoteHash != null && message.hasOwnProperty("prefabPathRemoteHash"))
            if (!$util.isInteger(message.prefabPathRemoteHash) && !(message.prefabPathRemoteHash && $util.isInteger(message.prefabPathRemoteHash.low) && $util.isInteger(message.prefabPathRemoteHash.high)))
                return "prefabPathRemoteHash: integer|Long expected";
        if (message.controllerPathHash != null && message.hasOwnProperty("controllerPathHash"))
            if (!$util.isInteger(message.controllerPathHash) && !(message.controllerPathHash && $util.isInteger(message.controllerPathHash.low) && $util.isInteger(message.controllerPathHash.high)))
                return "controllerPathHash: integer|Long expected";
        if (message.controllerPathRemoteHash != null && message.hasOwnProperty("controllerPathRemoteHash"))
            if (!$util.isInteger(message.controllerPathRemoteHash) && !(message.controllerPathRemoteHash && $util.isInteger(message.controllerPathRemoteHash.low) && $util.isInteger(message.controllerPathRemoteHash.high)))
                return "controllerPathRemoteHash: integer|Long expected";
        if (message.combatConfigHash != null && message.hasOwnProperty("combatConfigHash"))
            if (!$util.isInteger(message.combatConfigHash) && !(message.combatConfigHash && $util.isInteger(message.combatConfigHash.low) && $util.isInteger(message.combatConfigHash.high)))
                return "combatConfigHash: integer|Long expected";
        return null;
    };

    /**
     * Creates an AvatarExcelInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarExcelInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarExcelInfo} AvatarExcelInfo
     */
    AvatarExcelInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarExcelInfo)
            return object;
        let message = new $root.AvatarExcelInfo();
        if (object.prefabPathHash != null)
            if ($util.Long)
                (message.prefabPathHash = $util.Long.fromValue(object.prefabPathHash)).unsigned = true;
            else if (typeof object.prefabPathHash === "string")
                message.prefabPathHash = parseInt(object.prefabPathHash, 10);
            else if (typeof object.prefabPathHash === "number")
                message.prefabPathHash = object.prefabPathHash;
            else if (typeof object.prefabPathHash === "object")
                message.prefabPathHash = new $util.LongBits(object.prefabPathHash.low >>> 0, object.prefabPathHash.high >>> 0).toNumber(true);
        if (object.prefabPathRemoteHash != null)
            if ($util.Long)
                (message.prefabPathRemoteHash = $util.Long.fromValue(object.prefabPathRemoteHash)).unsigned = true;
            else if (typeof object.prefabPathRemoteHash === "string")
                message.prefabPathRemoteHash = parseInt(object.prefabPathRemoteHash, 10);
            else if (typeof object.prefabPathRemoteHash === "number")
                message.prefabPathRemoteHash = object.prefabPathRemoteHash;
            else if (typeof object.prefabPathRemoteHash === "object")
                message.prefabPathRemoteHash = new $util.LongBits(object.prefabPathRemoteHash.low >>> 0, object.prefabPathRemoteHash.high >>> 0).toNumber(true);
        if (object.controllerPathHash != null)
            if ($util.Long)
                (message.controllerPathHash = $util.Long.fromValue(object.controllerPathHash)).unsigned = true;
            else if (typeof object.controllerPathHash === "string")
                message.controllerPathHash = parseInt(object.controllerPathHash, 10);
            else if (typeof object.controllerPathHash === "number")
                message.controllerPathHash = object.controllerPathHash;
            else if (typeof object.controllerPathHash === "object")
                message.controllerPathHash = new $util.LongBits(object.controllerPathHash.low >>> 0, object.controllerPathHash.high >>> 0).toNumber(true);
        if (object.controllerPathRemoteHash != null)
            if ($util.Long)
                (message.controllerPathRemoteHash = $util.Long.fromValue(object.controllerPathRemoteHash)).unsigned = true;
            else if (typeof object.controllerPathRemoteHash === "string")
                message.controllerPathRemoteHash = parseInt(object.controllerPathRemoteHash, 10);
            else if (typeof object.controllerPathRemoteHash === "number")
                message.controllerPathRemoteHash = object.controllerPathRemoteHash;
            else if (typeof object.controllerPathRemoteHash === "object")
                message.controllerPathRemoteHash = new $util.LongBits(object.controllerPathRemoteHash.low >>> 0, object.controllerPathRemoteHash.high >>> 0).toNumber(true);
        if (object.combatConfigHash != null)
            if ($util.Long)
                (message.combatConfigHash = $util.Long.fromValue(object.combatConfigHash)).unsigned = true;
            else if (typeof object.combatConfigHash === "string")
                message.combatConfigHash = parseInt(object.combatConfigHash, 10);
            else if (typeof object.combatConfigHash === "number")
                message.combatConfigHash = object.combatConfigHash;
            else if (typeof object.combatConfigHash === "object")
                message.combatConfigHash = new $util.LongBits(object.combatConfigHash.low >>> 0, object.combatConfigHash.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an AvatarExcelInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarExcelInfo
     * @static
     * @param {AvatarExcelInfo} message AvatarExcelInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarExcelInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.prefabPathHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.prefabPathHash = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.prefabPathRemoteHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.prefabPathRemoteHash = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.controllerPathHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.controllerPathHash = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.controllerPathRemoteHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.controllerPathRemoteHash = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.combatConfigHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.combatConfigHash = options.longs === String ? "0" : 0;
        }
        if (message.prefabPathHash != null && message.hasOwnProperty("prefabPathHash"))
            if (typeof message.prefabPathHash === "number")
                object.prefabPathHash = options.longs === String ? String(message.prefabPathHash) : message.prefabPathHash;
            else
                object.prefabPathHash = options.longs === String ? $util.Long.prototype.toString.call(message.prefabPathHash) : options.longs === Number ? new $util.LongBits(message.prefabPathHash.low >>> 0, message.prefabPathHash.high >>> 0).toNumber(true) : message.prefabPathHash;
        if (message.prefabPathRemoteHash != null && message.hasOwnProperty("prefabPathRemoteHash"))
            if (typeof message.prefabPathRemoteHash === "number")
                object.prefabPathRemoteHash = options.longs === String ? String(message.prefabPathRemoteHash) : message.prefabPathRemoteHash;
            else
                object.prefabPathRemoteHash = options.longs === String ? $util.Long.prototype.toString.call(message.prefabPathRemoteHash) : options.longs === Number ? new $util.LongBits(message.prefabPathRemoteHash.low >>> 0, message.prefabPathRemoteHash.high >>> 0).toNumber(true) : message.prefabPathRemoteHash;
        if (message.controllerPathHash != null && message.hasOwnProperty("controllerPathHash"))
            if (typeof message.controllerPathHash === "number")
                object.controllerPathHash = options.longs === String ? String(message.controllerPathHash) : message.controllerPathHash;
            else
                object.controllerPathHash = options.longs === String ? $util.Long.prototype.toString.call(message.controllerPathHash) : options.longs === Number ? new $util.LongBits(message.controllerPathHash.low >>> 0, message.controllerPathHash.high >>> 0).toNumber(true) : message.controllerPathHash;
        if (message.controllerPathRemoteHash != null && message.hasOwnProperty("controllerPathRemoteHash"))
            if (typeof message.controllerPathRemoteHash === "number")
                object.controllerPathRemoteHash = options.longs === String ? String(message.controllerPathRemoteHash) : message.controllerPathRemoteHash;
            else
                object.controllerPathRemoteHash = options.longs === String ? $util.Long.prototype.toString.call(message.controllerPathRemoteHash) : options.longs === Number ? new $util.LongBits(message.controllerPathRemoteHash.low >>> 0, message.controllerPathRemoteHash.high >>> 0).toNumber(true) : message.controllerPathRemoteHash;
        if (message.combatConfigHash != null && message.hasOwnProperty("combatConfigHash"))
            if (typeof message.combatConfigHash === "number")
                object.combatConfigHash = options.longs === String ? String(message.combatConfigHash) : message.combatConfigHash;
            else
                object.combatConfigHash = options.longs === String ? $util.Long.prototype.toString.call(message.combatConfigHash) : options.longs === Number ? new $util.LongBits(message.combatConfigHash.low >>> 0, message.combatConfigHash.high >>> 0).toNumber(true) : message.combatConfigHash;
        return object;
    };

    /**
     * Converts this AvatarExcelInfo to JSON.
     * @function toJSON
     * @memberof AvatarExcelInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarExcelInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarExcelInfo;
})();

/**
 * AvatarExpeditionState enum.
 * @exports AvatarExpeditionState
 * @enum {number}
 * @property {number} AVATAR_EXPEDITION_STATE_NONE=0 AVATAR_EXPEDITION_STATE_NONE value
 * @property {number} AVATAR_EXPEDITION_STATE_DOING=1 AVATAR_EXPEDITION_STATE_DOING value
 * @property {number} AVATAR_EXPEDITION_STATE_FINISH_WAIT_REWARD=2 AVATAR_EXPEDITION_STATE_FINISH_WAIT_REWARD value
 * @property {number} AVATAR_EXPEDITION_STATE_CALLBACK_WAIT_REWARD=3 AVATAR_EXPEDITION_STATE_CALLBACK_WAIT_REWARD value
 * @property {number} AVATAR_EXPEDITION_STATE_LOCKED=4 AVATAR_EXPEDITION_STATE_LOCKED value
 */
export const AvatarExpeditionState = $root.AvatarExpeditionState = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "AVATAR_EXPEDITION_STATE_NONE"] = 0;
    values[valuesById[1] = "AVATAR_EXPEDITION_STATE_DOING"] = 1;
    values[valuesById[2] = "AVATAR_EXPEDITION_STATE_FINISH_WAIT_REWARD"] = 2;
    values[valuesById[3] = "AVATAR_EXPEDITION_STATE_CALLBACK_WAIT_REWARD"] = 3;
    values[valuesById[4] = "AVATAR_EXPEDITION_STATE_LOCKED"] = 4;
    return values;
})();

export const AvatarFetterInfo = $root.AvatarFetterInfo = (() => {

    /**
     * Properties of an AvatarFetterInfo.
     * @exports IAvatarFetterInfo
     * @interface IAvatarFetterInfo
     * @property {number|null} [expNumber] AvatarFetterInfo expNumber
     * @property {number|null} [expLevel] AvatarFetterInfo expLevel
     * @property {Array.<number>|null} [openIdList] AvatarFetterInfo openIdList
     * @property {Array.<number>|null} [finishIdList] AvatarFetterInfo finishIdList
     * @property {Array.<number>|null} [rewardedFetterLevelList] AvatarFetterInfo rewardedFetterLevelList
     * @property {Array.<IFetterData>|null} [fetterList] AvatarFetterInfo fetterList
     */

    /**
     * Constructs a new AvatarFetterInfo.
     * @exports AvatarFetterInfo
     * @classdesc Represents an AvatarFetterInfo.
     * @implements IAvatarFetterInfo
     * @constructor
     * @param {IAvatarFetterInfo=} [properties] Properties to set
     */
    function AvatarFetterInfo(properties) {
        this.openIdList = [];
        this.finishIdList = [];
        this.rewardedFetterLevelList = [];
        this.fetterList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarFetterInfo expNumber.
     * @member {number} expNumber
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.expNumber = 0;

    /**
     * AvatarFetterInfo expLevel.
     * @member {number} expLevel
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.expLevel = 0;

    /**
     * AvatarFetterInfo openIdList.
     * @member {Array.<number>} openIdList
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.openIdList = $util.emptyArray;

    /**
     * AvatarFetterInfo finishIdList.
     * @member {Array.<number>} finishIdList
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.finishIdList = $util.emptyArray;

    /**
     * AvatarFetterInfo rewardedFetterLevelList.
     * @member {Array.<number>} rewardedFetterLevelList
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.rewardedFetterLevelList = $util.emptyArray;

    /**
     * AvatarFetterInfo fetterList.
     * @member {Array.<IFetterData>} fetterList
     * @memberof AvatarFetterInfo
     * @instance
     */
    AvatarFetterInfo.prototype.fetterList = $util.emptyArray;

    /**
     * Creates a new AvatarFetterInfo instance using the specified properties.
     * @function create
     * @memberof AvatarFetterInfo
     * @static
     * @param {IAvatarFetterInfo=} [properties] Properties to set
     * @returns {AvatarFetterInfo} AvatarFetterInfo instance
     */
    AvatarFetterInfo.create = function create(properties) {
        return new AvatarFetterInfo(properties);
    };

    /**
     * Encodes the specified AvatarFetterInfo message. Does not implicitly {@link AvatarFetterInfo.verify|verify} messages.
     * @function encode
     * @memberof AvatarFetterInfo
     * @static
     * @param {IAvatarFetterInfo} message AvatarFetterInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarFetterInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.expNumber != null && Object.hasOwnProperty.call(message, "expNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.expNumber);
        if (message.expLevel != null && Object.hasOwnProperty.call(message, "expLevel"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.expLevel);
        if (message.openIdList != null && message.openIdList.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (let i = 0; i < message.openIdList.length; ++i)
                writer.uint32(message.openIdList[i]);
            writer.ldelim();
        }
        if (message.finishIdList != null && message.finishIdList.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (let i = 0; i < message.finishIdList.length; ++i)
                writer.uint32(message.finishIdList[i]);
            writer.ldelim();
        }
        if (message.rewardedFetterLevelList != null && message.rewardedFetterLevelList.length) {
            writer.uint32(/* id 5, wireType 2 =*/42).fork();
            for (let i = 0; i < message.rewardedFetterLevelList.length; ++i)
                writer.uint32(message.rewardedFetterLevelList[i]);
            writer.ldelim();
        }
        if (message.fetterList != null && message.fetterList.length)
            for (let i = 0; i < message.fetterList.length; ++i)
                $root.FetterData.encode(message.fetterList[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AvatarFetterInfo message, length delimited. Does not implicitly {@link AvatarFetterInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarFetterInfo
     * @static
     * @param {IAvatarFetterInfo} message AvatarFetterInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarFetterInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarFetterInfo message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarFetterInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarFetterInfo} AvatarFetterInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarFetterInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarFetterInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.expNumber = reader.uint32();
                    break;
                case 2:
                    message.expLevel = reader.uint32();
                    break;
                case 3:
                    if (!(message.openIdList && message.openIdList.length))
                        message.openIdList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.openIdList.push(reader.uint32());
                    } else
                        message.openIdList.push(reader.uint32());
                    break;
                case 4:
                    if (!(message.finishIdList && message.finishIdList.length))
                        message.finishIdList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.finishIdList.push(reader.uint32());
                    } else
                        message.finishIdList.push(reader.uint32());
                    break;
                case 5:
                    if (!(message.rewardedFetterLevelList && message.rewardedFetterLevelList.length))
                        message.rewardedFetterLevelList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.rewardedFetterLevelList.push(reader.uint32());
                    } else
                        message.rewardedFetterLevelList.push(reader.uint32());
                    break;
                case 6:
                    if (!(message.fetterList && message.fetterList.length))
                        message.fetterList = [];
                    message.fetterList.push($root.FetterData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarFetterInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarFetterInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarFetterInfo} AvatarFetterInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarFetterInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarFetterInfo message.
     * @function verify
     * @memberof AvatarFetterInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarFetterInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.expNumber != null && message.hasOwnProperty("expNumber"))
            if (!$util.isInteger(message.expNumber))
                return "expNumber: integer expected";
        if (message.expLevel != null && message.hasOwnProperty("expLevel"))
            if (!$util.isInteger(message.expLevel))
                return "expLevel: integer expected";
        if (message.openIdList != null && message.hasOwnProperty("openIdList")) {
            if (!Array.isArray(message.openIdList))
                return "openIdList: array expected";
            for (let i = 0; i < message.openIdList.length; ++i)
                if (!$util.isInteger(message.openIdList[i]))
                    return "openIdList: integer[] expected";
        }
        if (message.finishIdList != null && message.hasOwnProperty("finishIdList")) {
            if (!Array.isArray(message.finishIdList))
                return "finishIdList: array expected";
            for (let i = 0; i < message.finishIdList.length; ++i)
                if (!$util.isInteger(message.finishIdList[i]))
                    return "finishIdList: integer[] expected";
        }
        if (message.rewardedFetterLevelList != null && message.hasOwnProperty("rewardedFetterLevelList")) {
            if (!Array.isArray(message.rewardedFetterLevelList))
                return "rewardedFetterLevelList: array expected";
            for (let i = 0; i < message.rewardedFetterLevelList.length; ++i)
                if (!$util.isInteger(message.rewardedFetterLevelList[i]))
                    return "rewardedFetterLevelList: integer[] expected";
        }
        if (message.fetterList != null && message.hasOwnProperty("fetterList")) {
            if (!Array.isArray(message.fetterList))
                return "fetterList: array expected";
            for (let i = 0; i < message.fetterList.length; ++i) {
                let error = $root.FetterData.verify(message.fetterList[i]);
                if (error)
                    return "fetterList." + error;
            }
        }
        return null;
    };

    /**
     * Creates an AvatarFetterInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarFetterInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarFetterInfo} AvatarFetterInfo
     */
    AvatarFetterInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarFetterInfo)
            return object;
        let message = new $root.AvatarFetterInfo();
        if (object.expNumber != null)
            message.expNumber = object.expNumber >>> 0;
        if (object.expLevel != null)
            message.expLevel = object.expLevel >>> 0;
        if (object.openIdList) {
            if (!Array.isArray(object.openIdList))
                throw TypeError(".AvatarFetterInfo.openIdList: array expected");
            message.openIdList = [];
            for (let i = 0; i < object.openIdList.length; ++i)
                message.openIdList[i] = object.openIdList[i] >>> 0;
        }
        if (object.finishIdList) {
            if (!Array.isArray(object.finishIdList))
                throw TypeError(".AvatarFetterInfo.finishIdList: array expected");
            message.finishIdList = [];
            for (let i = 0; i < object.finishIdList.length; ++i)
                message.finishIdList[i] = object.finishIdList[i] >>> 0;
        }
        if (object.rewardedFetterLevelList) {
            if (!Array.isArray(object.rewardedFetterLevelList))
                throw TypeError(".AvatarFetterInfo.rewardedFetterLevelList: array expected");
            message.rewardedFetterLevelList = [];
            for (let i = 0; i < object.rewardedFetterLevelList.length; ++i)
                message.rewardedFetterLevelList[i] = object.rewardedFetterLevelList[i] >>> 0;
        }
        if (object.fetterList) {
            if (!Array.isArray(object.fetterList))
                throw TypeError(".AvatarFetterInfo.fetterList: array expected");
            message.fetterList = [];
            for (let i = 0; i < object.fetterList.length; ++i) {
                if (typeof object.fetterList[i] !== "object")
                    throw TypeError(".AvatarFetterInfo.fetterList: object expected");
                message.fetterList[i] = $root.FetterData.fromObject(object.fetterList[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an AvatarFetterInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarFetterInfo
     * @static
     * @param {AvatarFetterInfo} message AvatarFetterInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarFetterInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.openIdList = [];
            object.finishIdList = [];
            object.rewardedFetterLevelList = [];
            object.fetterList = [];
        }
        if (options.defaults) {
            object.expNumber = 0;
            object.expLevel = 0;
        }
        if (message.expNumber != null && message.hasOwnProperty("expNumber"))
            object.expNumber = message.expNumber;
        if (message.expLevel != null && message.hasOwnProperty("expLevel"))
            object.expLevel = message.expLevel;
        if (message.openIdList && message.openIdList.length) {
            object.openIdList = [];
            for (let j = 0; j < message.openIdList.length; ++j)
                object.openIdList[j] = message.openIdList[j];
        }
        if (message.finishIdList && message.finishIdList.length) {
            object.finishIdList = [];
            for (let j = 0; j < message.finishIdList.length; ++j)
                object.finishIdList[j] = message.finishIdList[j];
        }
        if (message.rewardedFetterLevelList && message.rewardedFetterLevelList.length) {
            object.rewardedFetterLevelList = [];
            for (let j = 0; j < message.rewardedFetterLevelList.length; ++j)
                object.rewardedFetterLevelList[j] = message.rewardedFetterLevelList[j];
        }
        if (message.fetterList && message.fetterList.length) {
            object.fetterList = [];
            for (let j = 0; j < message.fetterList.length; ++j)
                object.fetterList[j] = $root.FetterData.toObject(message.fetterList[j], options);
        }
        return object;
    };

    /**
     * Converts this AvatarFetterInfo to JSON.
     * @function toJSON
     * @memberof AvatarFetterInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarFetterInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarFetterInfo;
})();

export const FetterData = $root.FetterData = (() => {

    /**
     * Properties of a FetterData.
     * @exports IFetterData
     * @interface IFetterData
     * @property {number|null} [fetterId] FetterData fetterId
     * @property {number|null} [fetterState] FetterData fetterState
     * @property {Array.<number>|null} [condIndexList] FetterData condIndexList
     */

    /**
     * Constructs a new FetterData.
     * @exports FetterData
     * @classdesc Represents a FetterData.
     * @implements IFetterData
     * @constructor
     * @param {IFetterData=} [properties] Properties to set
     */
    function FetterData(properties) {
        this.condIndexList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FetterData fetterId.
     * @member {number} fetterId
     * @memberof FetterData
     * @instance
     */
    FetterData.prototype.fetterId = 0;

    /**
     * FetterData fetterState.
     * @member {number} fetterState
     * @memberof FetterData
     * @instance
     */
    FetterData.prototype.fetterState = 0;

    /**
     * FetterData condIndexList.
     * @member {Array.<number>} condIndexList
     * @memberof FetterData
     * @instance
     */
    FetterData.prototype.condIndexList = $util.emptyArray;

    /**
     * Creates a new FetterData instance using the specified properties.
     * @function create
     * @memberof FetterData
     * @static
     * @param {IFetterData=} [properties] Properties to set
     * @returns {FetterData} FetterData instance
     */
    FetterData.create = function create(properties) {
        return new FetterData(properties);
    };

    /**
     * Encodes the specified FetterData message. Does not implicitly {@link FetterData.verify|verify} messages.
     * @function encode
     * @memberof FetterData
     * @static
     * @param {IFetterData} message FetterData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FetterData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.fetterId != null && Object.hasOwnProperty.call(message, "fetterId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.fetterId);
        if (message.fetterState != null && Object.hasOwnProperty.call(message, "fetterState"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.fetterState);
        if (message.condIndexList != null && message.condIndexList.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (let i = 0; i < message.condIndexList.length; ++i)
                writer.uint32(message.condIndexList[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified FetterData message, length delimited. Does not implicitly {@link FetterData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FetterData
     * @static
     * @param {IFetterData} message FetterData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FetterData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FetterData message from the specified reader or buffer.
     * @function decode
     * @memberof FetterData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FetterData} FetterData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FetterData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.FetterData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fetterId = reader.uint32();
                    break;
                case 2:
                    message.fetterState = reader.uint32();
                    break;
                case 3:
                    if (!(message.condIndexList && message.condIndexList.length))
                        message.condIndexList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.condIndexList.push(reader.uint32());
                    } else
                        message.condIndexList.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a FetterData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FetterData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FetterData} FetterData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FetterData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FetterData message.
     * @function verify
     * @memberof FetterData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FetterData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.fetterId != null && message.hasOwnProperty("fetterId"))
            if (!$util.isInteger(message.fetterId))
                return "fetterId: integer expected";
        if (message.fetterState != null && message.hasOwnProperty("fetterState"))
            if (!$util.isInteger(message.fetterState))
                return "fetterState: integer expected";
        if (message.condIndexList != null && message.hasOwnProperty("condIndexList")) {
            if (!Array.isArray(message.condIndexList))
                return "condIndexList: array expected";
            for (let i = 0; i < message.condIndexList.length; ++i)
                if (!$util.isInteger(message.condIndexList[i]))
                    return "condIndexList: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a FetterData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FetterData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FetterData} FetterData
     */
    FetterData.fromObject = function fromObject(object) {
        if (object instanceof $root.FetterData)
            return object;
        let message = new $root.FetterData();
        if (object.fetterId != null)
            message.fetterId = object.fetterId >>> 0;
        if (object.fetterState != null)
            message.fetterState = object.fetterState >>> 0;
        if (object.condIndexList) {
            if (!Array.isArray(object.condIndexList))
                throw TypeError(".FetterData.condIndexList: array expected");
            message.condIndexList = [];
            for (let i = 0; i < object.condIndexList.length; ++i)
                message.condIndexList[i] = object.condIndexList[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a FetterData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FetterData
     * @static
     * @param {FetterData} message FetterData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FetterData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.condIndexList = [];
        if (options.defaults) {
            object.fetterId = 0;
            object.fetterState = 0;
        }
        if (message.fetterId != null && message.hasOwnProperty("fetterId"))
            object.fetterId = message.fetterId;
        if (message.fetterState != null && message.hasOwnProperty("fetterState"))
            object.fetterState = message.fetterState;
        if (message.condIndexList && message.condIndexList.length) {
            object.condIndexList = [];
            for (let j = 0; j < message.condIndexList.length; ++j)
                object.condIndexList[j] = message.condIndexList[j];
        }
        return object;
    };

    /**
     * Converts this FetterData to JSON.
     * @function toJSON
     * @memberof FetterData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FetterData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FetterData;
})();

export const AvatarSkillInfo = $root.AvatarSkillInfo = (() => {

    /**
     * Properties of an AvatarSkillInfo.
     * @exports IAvatarSkillInfo
     * @interface IAvatarSkillInfo
     * @property {number|null} [passCdTime] AvatarSkillInfo passCdTime
     * @property {Array.<number>|null} [fullCdTimeList] AvatarSkillInfo fullCdTimeList
     * @property {number|null} [maxChargeCount] AvatarSkillInfo maxChargeCount
     */

    /**
     * Constructs a new AvatarSkillInfo.
     * @exports AvatarSkillInfo
     * @classdesc Represents an AvatarSkillInfo.
     * @implements IAvatarSkillInfo
     * @constructor
     * @param {IAvatarSkillInfo=} [properties] Properties to set
     */
    function AvatarSkillInfo(properties) {
        this.fullCdTimeList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarSkillInfo passCdTime.
     * @member {number} passCdTime
     * @memberof AvatarSkillInfo
     * @instance
     */
    AvatarSkillInfo.prototype.passCdTime = 0;

    /**
     * AvatarSkillInfo fullCdTimeList.
     * @member {Array.<number>} fullCdTimeList
     * @memberof AvatarSkillInfo
     * @instance
     */
    AvatarSkillInfo.prototype.fullCdTimeList = $util.emptyArray;

    /**
     * AvatarSkillInfo maxChargeCount.
     * @member {number} maxChargeCount
     * @memberof AvatarSkillInfo
     * @instance
     */
    AvatarSkillInfo.prototype.maxChargeCount = 0;

    /**
     * Creates a new AvatarSkillInfo instance using the specified properties.
     * @function create
     * @memberof AvatarSkillInfo
     * @static
     * @param {IAvatarSkillInfo=} [properties] Properties to set
     * @returns {AvatarSkillInfo} AvatarSkillInfo instance
     */
    AvatarSkillInfo.create = function create(properties) {
        return new AvatarSkillInfo(properties);
    };

    /**
     * Encodes the specified AvatarSkillInfo message. Does not implicitly {@link AvatarSkillInfo.verify|verify} messages.
     * @function encode
     * @memberof AvatarSkillInfo
     * @static
     * @param {IAvatarSkillInfo} message AvatarSkillInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarSkillInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.passCdTime != null && Object.hasOwnProperty.call(message, "passCdTime"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.passCdTime);
        if (message.fullCdTimeList != null && message.fullCdTimeList.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (let i = 0; i < message.fullCdTimeList.length; ++i)
                writer.uint32(message.fullCdTimeList[i]);
            writer.ldelim();
        }
        if (message.maxChargeCount != null && Object.hasOwnProperty.call(message, "maxChargeCount"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.maxChargeCount);
        return writer;
    };

    /**
     * Encodes the specified AvatarSkillInfo message, length delimited. Does not implicitly {@link AvatarSkillInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarSkillInfo
     * @static
     * @param {IAvatarSkillInfo} message AvatarSkillInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarSkillInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarSkillInfo message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarSkillInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarSkillInfo} AvatarSkillInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarSkillInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarSkillInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.passCdTime = reader.uint32();
                    break;
                case 2:
                    if (!(message.fullCdTimeList && message.fullCdTimeList.length))
                        message.fullCdTimeList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.fullCdTimeList.push(reader.uint32());
                    } else
                        message.fullCdTimeList.push(reader.uint32());
                    break;
                case 3:
                    message.maxChargeCount = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarSkillInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarSkillInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarSkillInfo} AvatarSkillInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarSkillInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarSkillInfo message.
     * @function verify
     * @memberof AvatarSkillInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarSkillInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.passCdTime != null && message.hasOwnProperty("passCdTime"))
            if (!$util.isInteger(message.passCdTime))
                return "passCdTime: integer expected";
        if (message.fullCdTimeList != null && message.hasOwnProperty("fullCdTimeList")) {
            if (!Array.isArray(message.fullCdTimeList))
                return "fullCdTimeList: array expected";
            for (let i = 0; i < message.fullCdTimeList.length; ++i)
                if (!$util.isInteger(message.fullCdTimeList[i]))
                    return "fullCdTimeList: integer[] expected";
        }
        if (message.maxChargeCount != null && message.hasOwnProperty("maxChargeCount"))
            if (!$util.isInteger(message.maxChargeCount))
                return "maxChargeCount: integer expected";
        return null;
    };

    /**
     * Creates an AvatarSkillInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarSkillInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarSkillInfo} AvatarSkillInfo
     */
    AvatarSkillInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarSkillInfo)
            return object;
        let message = new $root.AvatarSkillInfo();
        if (object.passCdTime != null)
            message.passCdTime = object.passCdTime >>> 0;
        if (object.fullCdTimeList) {
            if (!Array.isArray(object.fullCdTimeList))
                throw TypeError(".AvatarSkillInfo.fullCdTimeList: array expected");
            message.fullCdTimeList = [];
            for (let i = 0; i < object.fullCdTimeList.length; ++i)
                message.fullCdTimeList[i] = object.fullCdTimeList[i] >>> 0;
        }
        if (object.maxChargeCount != null)
            message.maxChargeCount = object.maxChargeCount >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an AvatarSkillInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarSkillInfo
     * @static
     * @param {AvatarSkillInfo} message AvatarSkillInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarSkillInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.fullCdTimeList = [];
        if (options.defaults) {
            object.passCdTime = 0;
            object.maxChargeCount = 0;
        }
        if (message.passCdTime != null && message.hasOwnProperty("passCdTime"))
            object.passCdTime = message.passCdTime;
        if (message.fullCdTimeList && message.fullCdTimeList.length) {
            object.fullCdTimeList = [];
            for (let j = 0; j < message.fullCdTimeList.length; ++j)
                object.fullCdTimeList[j] = message.fullCdTimeList[j];
        }
        if (message.maxChargeCount != null && message.hasOwnProperty("maxChargeCount"))
            object.maxChargeCount = message.maxChargeCount;
        return object;
    };

    /**
     * Converts this AvatarSkillInfo to JSON.
     * @function toJSON
     * @memberof AvatarSkillInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarSkillInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarSkillInfo;
})();

export const PropValue = $root.PropValue = (() => {

    /**
     * Properties of a PropValue.
     * @exports IPropValue
     * @interface IPropValue
     * @property {number|null} [type] PropValue type
     * @property {Long|null} [val] PropValue val
     * @property {Long|null} [ival] PropValue ival
     * @property {number|null} [fval] PropValue fval
     */

    /**
     * Constructs a new PropValue.
     * @exports PropValue
     * @classdesc Represents a PropValue.
     * @implements IPropValue
     * @constructor
     * @param {IPropValue=} [properties] Properties to set
     */
    function PropValue(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PropValue type.
     * @member {number} type
     * @memberof PropValue
     * @instance
     */
    PropValue.prototype.type = 0;

    /**
     * PropValue val.
     * @member {Long} val
     * @memberof PropValue
     * @instance
     */
    PropValue.prototype.val = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * PropValue ival.
     * @member {Long|null|undefined} ival
     * @memberof PropValue
     * @instance
     */
    PropValue.prototype.ival = null;

    /**
     * PropValue fval.
     * @member {number|null|undefined} fval
     * @memberof PropValue
     * @instance
     */
    PropValue.prototype.fval = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * PropValue value.
     * @member {"ival"|"fval"|undefined} value
     * @memberof PropValue
     * @instance
     */
    Object.defineProperty(PropValue.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["ival", "fval"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new PropValue instance using the specified properties.
     * @function create
     * @memberof PropValue
     * @static
     * @param {IPropValue=} [properties] Properties to set
     * @returns {PropValue} PropValue instance
     */
    PropValue.create = function create(properties) {
        return new PropValue(properties);
    };

    /**
     * Encodes the specified PropValue message. Does not implicitly {@link PropValue.verify|verify} messages.
     * @function encode
     * @memberof PropValue
     * @static
     * @param {IPropValue} message PropValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PropValue.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.ival != null && Object.hasOwnProperty.call(message, "ival"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.ival);
        if (message.fval != null && Object.hasOwnProperty.call(message, "fval"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.fval);
        if (message.val != null && Object.hasOwnProperty.call(message, "val"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.val);
        return writer;
    };

    /**
     * Encodes the specified PropValue message, length delimited. Does not implicitly {@link PropValue.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PropValue
     * @static
     * @param {IPropValue} message PropValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PropValue.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PropValue message from the specified reader or buffer.
     * @function decode
     * @memberof PropValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PropValue} PropValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PropValue.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PropValue();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.uint32();
                    break;
                case 4:
                    message.val = reader.int64();
                    break;
                case 2:
                    message.ival = reader.int64();
                    break;
                case 3:
                    message.fval = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a PropValue message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PropValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PropValue} PropValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PropValue.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PropValue message.
     * @function verify
     * @memberof PropValue
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PropValue.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.val != null && message.hasOwnProperty("val"))
            if (!$util.isInteger(message.val) && !(message.val && $util.isInteger(message.val.low) && $util.isInteger(message.val.high)))
                return "val: integer|Long expected";
        if (message.ival != null && message.hasOwnProperty("ival")) {
            properties.value = 1;
            if (!$util.isInteger(message.ival) && !(message.ival && $util.isInteger(message.ival.low) && $util.isInteger(message.ival.high)))
                return "ival: integer|Long expected";
        }
        if (message.fval != null && message.hasOwnProperty("fval")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.fval !== "number")
                return "fval: number expected";
        }
        return null;
    };

    /**
     * Creates a PropValue message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PropValue
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PropValue} PropValue
     */
    PropValue.fromObject = function fromObject(object) {
        if (object instanceof $root.PropValue)
            return object;
        let message = new $root.PropValue();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.val != null)
            if ($util.Long)
                (message.val = $util.Long.fromValue(object.val)).unsigned = false;
            else if (typeof object.val === "string")
                message.val = parseInt(object.val, 10);
            else if (typeof object.val === "number")
                message.val = object.val;
            else if (typeof object.val === "object")
                message.val = new $util.LongBits(object.val.low >>> 0, object.val.high >>> 0).toNumber();
        if (object.ival != null)
            if ($util.Long)
                (message.ival = $util.Long.fromValue(object.ival)).unsigned = false;
            else if (typeof object.ival === "string")
                message.ival = parseInt(object.ival, 10);
            else if (typeof object.ival === "number")
                message.ival = object.ival;
            else if (typeof object.ival === "object")
                message.ival = new $util.LongBits(object.ival.low >>> 0, object.ival.high >>> 0).toNumber();
        if (object.fval != null)
            message.fval = Number(object.fval);
        return message;
    };

    /**
     * Creates a plain object from a PropValue message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PropValue
     * @static
     * @param {PropValue} message PropValue
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PropValue.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.type = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.val = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.val = options.longs === String ? "0" : 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.ival != null && message.hasOwnProperty("ival")) {
            if (typeof message.ival === "number")
                object.ival = options.longs === String ? String(message.ival) : message.ival;
            else
                object.ival = options.longs === String ? $util.Long.prototype.toString.call(message.ival) : options.longs === Number ? new $util.LongBits(message.ival.low >>> 0, message.ival.high >>> 0).toNumber() : message.ival;
            if (options.oneofs)
                object.value = "ival";
        }
        if (message.fval != null && message.hasOwnProperty("fval")) {
            object.fval = options.json && !isFinite(message.fval) ? String(message.fval) : message.fval;
            if (options.oneofs)
                object.value = "fval";
        }
        if (message.val != null && message.hasOwnProperty("val"))
            if (typeof message.val === "number")
                object.val = options.longs === String ? String(message.val) : message.val;
            else
                object.val = options.longs === String ? $util.Long.prototype.toString.call(message.val) : options.longs === Number ? new $util.LongBits(message.val.low >>> 0, message.val.high >>> 0).toNumber() : message.val;
        return object;
    };

    /**
     * Converts this PropValue to JSON.
     * @function toJSON
     * @memberof PropValue
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PropValue.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PropValue;
})();

export const TrialAvatarInfo = $root.TrialAvatarInfo = (() => {

    /**
     * Properties of a TrialAvatarInfo.
     * @exports ITrialAvatarInfo
     * @interface ITrialAvatarInfo
     * @property {number|null} [trialAvatarId] TrialAvatarInfo trialAvatarId
     * @property {Array.<IItem>|null} [trialEquipList] TrialAvatarInfo trialEquipList
     * @property {ITrialAvatarGrantRecord|null} [grantRecord] TrialAvatarInfo grantRecord
     */

    /**
     * Constructs a new TrialAvatarInfo.
     * @exports TrialAvatarInfo
     * @classdesc Represents a TrialAvatarInfo.
     * @implements ITrialAvatarInfo
     * @constructor
     * @param {ITrialAvatarInfo=} [properties] Properties to set
     */
    function TrialAvatarInfo(properties) {
        this.trialEquipList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TrialAvatarInfo trialAvatarId.
     * @member {number} trialAvatarId
     * @memberof TrialAvatarInfo
     * @instance
     */
    TrialAvatarInfo.prototype.trialAvatarId = 0;

    /**
     * TrialAvatarInfo trialEquipList.
     * @member {Array.<IItem>} trialEquipList
     * @memberof TrialAvatarInfo
     * @instance
     */
    TrialAvatarInfo.prototype.trialEquipList = $util.emptyArray;

    /**
     * TrialAvatarInfo grantRecord.
     * @member {ITrialAvatarGrantRecord|null|undefined} grantRecord
     * @memberof TrialAvatarInfo
     * @instance
     */
    TrialAvatarInfo.prototype.grantRecord = null;

    /**
     * Creates a new TrialAvatarInfo instance using the specified properties.
     * @function create
     * @memberof TrialAvatarInfo
     * @static
     * @param {ITrialAvatarInfo=} [properties] Properties to set
     * @returns {TrialAvatarInfo} TrialAvatarInfo instance
     */
    TrialAvatarInfo.create = function create(properties) {
        return new TrialAvatarInfo(properties);
    };

    /**
     * Encodes the specified TrialAvatarInfo message. Does not implicitly {@link TrialAvatarInfo.verify|verify} messages.
     * @function encode
     * @memberof TrialAvatarInfo
     * @static
     * @param {ITrialAvatarInfo} message TrialAvatarInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TrialAvatarInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.trialAvatarId != null && Object.hasOwnProperty.call(message, "trialAvatarId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.trialAvatarId);
        if (message.trialEquipList != null && message.trialEquipList.length)
            for (let i = 0; i < message.trialEquipList.length; ++i)
                $root.Item.encode(message.trialEquipList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.grantRecord != null && Object.hasOwnProperty.call(message, "grantRecord"))
            $root.TrialAvatarGrantRecord.encode(message.grantRecord, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified TrialAvatarInfo message, length delimited. Does not implicitly {@link TrialAvatarInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TrialAvatarInfo
     * @static
     * @param {ITrialAvatarInfo} message TrialAvatarInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TrialAvatarInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TrialAvatarInfo message from the specified reader or buffer.
     * @function decode
     * @memberof TrialAvatarInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TrialAvatarInfo} TrialAvatarInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TrialAvatarInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TrialAvatarInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.trialAvatarId = reader.uint32();
                    break;
                case 2:
                    if (!(message.trialEquipList && message.trialEquipList.length))
                        message.trialEquipList = [];
                    message.trialEquipList.push($root.Item.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.grantRecord = $root.TrialAvatarGrantRecord.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a TrialAvatarInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TrialAvatarInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TrialAvatarInfo} TrialAvatarInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TrialAvatarInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TrialAvatarInfo message.
     * @function verify
     * @memberof TrialAvatarInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TrialAvatarInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.trialAvatarId != null && message.hasOwnProperty("trialAvatarId"))
            if (!$util.isInteger(message.trialAvatarId))
                return "trialAvatarId: integer expected";
        if (message.trialEquipList != null && message.hasOwnProperty("trialEquipList")) {
            if (!Array.isArray(message.trialEquipList))
                return "trialEquipList: array expected";
            for (let i = 0; i < message.trialEquipList.length; ++i) {
                let error = $root.Item.verify(message.trialEquipList[i]);
                if (error)
                    return "trialEquipList." + error;
            }
        }
        if (message.grantRecord != null && message.hasOwnProperty("grantRecord")) {
            let error = $root.TrialAvatarGrantRecord.verify(message.grantRecord);
            if (error)
                return "grantRecord." + error;
        }
        return null;
    };

    /**
     * Creates a TrialAvatarInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TrialAvatarInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TrialAvatarInfo} TrialAvatarInfo
     */
    TrialAvatarInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.TrialAvatarInfo)
            return object;
        let message = new $root.TrialAvatarInfo();
        if (object.trialAvatarId != null)
            message.trialAvatarId = object.trialAvatarId >>> 0;
        if (object.trialEquipList) {
            if (!Array.isArray(object.trialEquipList))
                throw TypeError(".TrialAvatarInfo.trialEquipList: array expected");
            message.trialEquipList = [];
            for (let i = 0; i < object.trialEquipList.length; ++i) {
                if (typeof object.trialEquipList[i] !== "object")
                    throw TypeError(".TrialAvatarInfo.trialEquipList: object expected");
                message.trialEquipList[i] = $root.Item.fromObject(object.trialEquipList[i]);
            }
        }
        if (object.grantRecord != null) {
            if (typeof object.grantRecord !== "object")
                throw TypeError(".TrialAvatarInfo.grantRecord: object expected");
            message.grantRecord = $root.TrialAvatarGrantRecord.fromObject(object.grantRecord);
        }
        return message;
    };

    /**
     * Creates a plain object from a TrialAvatarInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TrialAvatarInfo
     * @static
     * @param {TrialAvatarInfo} message TrialAvatarInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TrialAvatarInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.trialEquipList = [];
        if (options.defaults) {
            object.trialAvatarId = 0;
            object.grantRecord = null;
        }
        if (message.trialAvatarId != null && message.hasOwnProperty("trialAvatarId"))
            object.trialAvatarId = message.trialAvatarId;
        if (message.trialEquipList && message.trialEquipList.length) {
            object.trialEquipList = [];
            for (let j = 0; j < message.trialEquipList.length; ++j)
                object.trialEquipList[j] = $root.Item.toObject(message.trialEquipList[j], options);
        }
        if (message.grantRecord != null && message.hasOwnProperty("grantRecord"))
            object.grantRecord = $root.TrialAvatarGrantRecord.toObject(message.grantRecord, options);
        return object;
    };

    /**
     * Converts this TrialAvatarInfo to JSON.
     * @function toJSON
     * @memberof TrialAvatarInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TrialAvatarInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TrialAvatarInfo;
})();

export const Item = $root.Item = (() => {

    /**
     * Properties of an Item.
     * @exports IItem
     * @interface IItem
     * @property {number|null} [itemId] Item itemId
     * @property {Long|null} [guid] Item guid
     * @property {IMaterial|null} [material] Item material
     * @property {IEquip|null} [equip] Item equip
     * @property {IFurniture|null} [furniture] Item furniture
     */

    /**
     * Constructs a new Item.
     * @exports Item
     * @classdesc Represents an Item.
     * @implements IItem
     * @constructor
     * @param {IItem=} [properties] Properties to set
     */
    function Item(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Item itemId.
     * @member {number} itemId
     * @memberof Item
     * @instance
     */
    Item.prototype.itemId = 0;

    /**
     * Item guid.
     * @member {Long} guid
     * @memberof Item
     * @instance
     */
    Item.prototype.guid = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * Item material.
     * @member {IMaterial|null|undefined} material
     * @memberof Item
     * @instance
     */
    Item.prototype.material = null;

    /**
     * Item equip.
     * @member {IEquip|null|undefined} equip
     * @memberof Item
     * @instance
     */
    Item.prototype.equip = null;

    /**
     * Item furniture.
     * @member {IFurniture|null|undefined} furniture
     * @memberof Item
     * @instance
     */
    Item.prototype.furniture = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Item detail.
     * @member {"material"|"equip"|"furniture"|undefined} detail
     * @memberof Item
     * @instance
     */
    Object.defineProperty(Item.prototype, "detail", {
        get: $util.oneOfGetter($oneOfFields = ["material", "equip", "furniture"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Item instance using the specified properties.
     * @function create
     * @memberof Item
     * @static
     * @param {IItem=} [properties] Properties to set
     * @returns {Item} Item instance
     */
    Item.create = function create(properties) {
        return new Item(properties);
    };

    /**
     * Encodes the specified Item message. Does not implicitly {@link Item.verify|verify} messages.
     * @function encode
     * @memberof Item
     * @static
     * @param {IItem} message Item message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Item.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.itemId != null && Object.hasOwnProperty.call(message, "itemId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.itemId);
        if (message.guid != null && Object.hasOwnProperty.call(message, "guid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.guid);
        if (message.material != null && Object.hasOwnProperty.call(message, "material"))
            $root.Material.encode(message.material, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.equip != null && Object.hasOwnProperty.call(message, "equip"))
            $root.Equip.encode(message.equip, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.furniture != null && Object.hasOwnProperty.call(message, "furniture"))
            $root.Furniture.encode(message.furniture, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Item message, length delimited. Does not implicitly {@link Item.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Item
     * @static
     * @param {IItem} message Item message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Item.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Item message from the specified reader or buffer.
     * @function decode
     * @memberof Item
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Item} Item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Item.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Item();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.itemId = reader.uint32();
                    break;
                case 2:
                    message.guid = reader.uint64();
                    break;
                case 5:
                    message.material = $root.Material.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.equip = $root.Equip.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.furniture = $root.Furniture.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an Item message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Item
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Item} Item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Item.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Item message.
     * @function verify
     * @memberof Item
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Item.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.itemId != null && message.hasOwnProperty("itemId"))
            if (!$util.isInteger(message.itemId))
                return "itemId: integer expected";
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (!$util.isInteger(message.guid) && !(message.guid && $util.isInteger(message.guid.low) && $util.isInteger(message.guid.high)))
                return "guid: integer|Long expected";
        if (message.material != null && message.hasOwnProperty("material")) {
            properties.detail = 1;
            {
                let error = $root.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
        }
        if (message.equip != null && message.hasOwnProperty("equip")) {
            if (properties.detail === 1)
                return "detail: multiple values";
            properties.detail = 1;
            {
                let error = $root.Equip.verify(message.equip);
                if (error)
                    return "equip." + error;
            }
        }
        if (message.furniture != null && message.hasOwnProperty("furniture")) {
            if (properties.detail === 1)
                return "detail: multiple values";
            properties.detail = 1;
            {
                let error = $root.Furniture.verify(message.furniture);
                if (error)
                    return "furniture." + error;
            }
        }
        return null;
    };

    /**
     * Creates an Item message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Item
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Item} Item
     */
    Item.fromObject = function fromObject(object) {
        if (object instanceof $root.Item)
            return object;
        let message = new $root.Item();
        if (object.itemId != null)
            message.itemId = object.itemId >>> 0;
        if (object.guid != null)
            if ($util.Long)
                (message.guid = $util.Long.fromValue(object.guid)).unsigned = true;
            else if (typeof object.guid === "string")
                message.guid = parseInt(object.guid, 10);
            else if (typeof object.guid === "number")
                message.guid = object.guid;
            else if (typeof object.guid === "object")
                message.guid = new $util.LongBits(object.guid.low >>> 0, object.guid.high >>> 0).toNumber(true);
        if (object.material != null) {
            if (typeof object.material !== "object")
                throw TypeError(".Item.material: object expected");
            message.material = $root.Material.fromObject(object.material);
        }
        if (object.equip != null) {
            if (typeof object.equip !== "object")
                throw TypeError(".Item.equip: object expected");
            message.equip = $root.Equip.fromObject(object.equip);
        }
        if (object.furniture != null) {
            if (typeof object.furniture !== "object")
                throw TypeError(".Item.furniture: object expected");
            message.furniture = $root.Furniture.fromObject(object.furniture);
        }
        return message;
    };

    /**
     * Creates a plain object from an Item message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Item
     * @static
     * @param {Item} message Item
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Item.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.itemId = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.guid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.guid = options.longs === String ? "0" : 0;
        }
        if (message.itemId != null && message.hasOwnProperty("itemId"))
            object.itemId = message.itemId;
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (typeof message.guid === "number")
                object.guid = options.longs === String ? String(message.guid) : message.guid;
            else
                object.guid = options.longs === String ? $util.Long.prototype.toString.call(message.guid) : options.longs === Number ? new $util.LongBits(message.guid.low >>> 0, message.guid.high >>> 0).toNumber(true) : message.guid;
        if (message.material != null && message.hasOwnProperty("material")) {
            object.material = $root.Material.toObject(message.material, options);
            if (options.oneofs)
                object.detail = "material";
        }
        if (message.equip != null && message.hasOwnProperty("equip")) {
            object.equip = $root.Equip.toObject(message.equip, options);
            if (options.oneofs)
                object.detail = "equip";
        }
        if (message.furniture != null && message.hasOwnProperty("furniture")) {
            object.furniture = $root.Furniture.toObject(message.furniture, options);
            if (options.oneofs)
                object.detail = "furniture";
        }
        return object;
    };

    /**
     * Converts this Item to JSON.
     * @function toJSON
     * @memberof Item
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Item.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Item;
})();

export const Equip = $root.Equip = (() => {

    /**
     * Properties of an Equip.
     * @exports IEquip
     * @interface IEquip
     * @property {boolean|null} [isLocked] Equip isLocked
     * @property {IReliquary|null} [reliquary] Equip reliquary
     * @property {IWeapon|null} [weapon] Equip weapon
     */

    /**
     * Constructs a new Equip.
     * @exports Equip
     * @classdesc Represents an Equip.
     * @implements IEquip
     * @constructor
     * @param {IEquip=} [properties] Properties to set
     */
    function Equip(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Equip isLocked.
     * @member {boolean} isLocked
     * @memberof Equip
     * @instance
     */
    Equip.prototype.isLocked = false;

    /**
     * Equip reliquary.
     * @member {IReliquary|null|undefined} reliquary
     * @memberof Equip
     * @instance
     */
    Equip.prototype.reliquary = null;

    /**
     * Equip weapon.
     * @member {IWeapon|null|undefined} weapon
     * @memberof Equip
     * @instance
     */
    Equip.prototype.weapon = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Equip detail.
     * @member {"reliquary"|"weapon"|undefined} detail
     * @memberof Equip
     * @instance
     */
    Object.defineProperty(Equip.prototype, "detail", {
        get: $util.oneOfGetter($oneOfFields = ["reliquary", "weapon"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Equip instance using the specified properties.
     * @function create
     * @memberof Equip
     * @static
     * @param {IEquip=} [properties] Properties to set
     * @returns {Equip} Equip instance
     */
    Equip.create = function create(properties) {
        return new Equip(properties);
    };

    /**
     * Encodes the specified Equip message. Does not implicitly {@link Equip.verify|verify} messages.
     * @function encode
     * @memberof Equip
     * @static
     * @param {IEquip} message Equip message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Equip.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.reliquary != null && Object.hasOwnProperty.call(message, "reliquary"))
            $root.Reliquary.encode(message.reliquary, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            $root.Weapon.encode(message.weapon, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.isLocked != null && Object.hasOwnProperty.call(message, "isLocked"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isLocked);
        return writer;
    };

    /**
     * Encodes the specified Equip message, length delimited. Does not implicitly {@link Equip.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Equip
     * @static
     * @param {IEquip} message Equip message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Equip.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Equip message from the specified reader or buffer.
     * @function decode
     * @memberof Equip
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Equip} Equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Equip.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Equip();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 3:
                    message.isLocked = reader.bool();
                    break;
                case 1:
                    message.reliquary = $root.Reliquary.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.weapon = $root.Weapon.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an Equip message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Equip
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Equip} Equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Equip.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Equip message.
     * @function verify
     * @memberof Equip
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Equip.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.isLocked != null && message.hasOwnProperty("isLocked"))
            if (typeof message.isLocked !== "boolean")
                return "isLocked: boolean expected";
        if (message.reliquary != null && message.hasOwnProperty("reliquary")) {
            properties.detail = 1;
            {
                let error = $root.Reliquary.verify(message.reliquary);
                if (error)
                    return "reliquary." + error;
            }
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            if (properties.detail === 1)
                return "detail: multiple values";
            properties.detail = 1;
            {
                let error = $root.Weapon.verify(message.weapon);
                if (error)
                    return "weapon." + error;
            }
        }
        return null;
    };

    /**
     * Creates an Equip message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Equip
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Equip} Equip
     */
    Equip.fromObject = function fromObject(object) {
        if (object instanceof $root.Equip)
            return object;
        let message = new $root.Equip();
        if (object.isLocked != null)
            message.isLocked = Boolean(object.isLocked);
        if (object.reliquary != null) {
            if (typeof object.reliquary !== "object")
                throw TypeError(".Equip.reliquary: object expected");
            message.reliquary = $root.Reliquary.fromObject(object.reliquary);
        }
        if (object.weapon != null) {
            if (typeof object.weapon !== "object")
                throw TypeError(".Equip.weapon: object expected");
            message.weapon = $root.Weapon.fromObject(object.weapon);
        }
        return message;
    };

    /**
     * Creates a plain object from an Equip message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Equip
     * @static
     * @param {Equip} message Equip
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Equip.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.isLocked = false;
        if (message.reliquary != null && message.hasOwnProperty("reliquary")) {
            object.reliquary = $root.Reliquary.toObject(message.reliquary, options);
            if (options.oneofs)
                object.detail = "reliquary";
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            object.weapon = $root.Weapon.toObject(message.weapon, options);
            if (options.oneofs)
                object.detail = "weapon";
        }
        if (message.isLocked != null && message.hasOwnProperty("isLocked"))
            object.isLocked = message.isLocked;
        return object;
    };

    /**
     * Converts this Equip to JSON.
     * @function toJSON
     * @memberof Equip
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Equip.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Equip;
})();

export const Reliquary = $root.Reliquary = (() => {

    /**
     * Properties of a Reliquary.
     * @exports IReliquary
     * @interface IReliquary
     * @property {number|null} [level] Reliquary level
     * @property {number|null} [exp] Reliquary exp
     * @property {number|null} [promoteLevel] Reliquary promoteLevel
     * @property {number|null} [mainPropId] Reliquary mainPropId
     * @property {Array.<number>|null} [appendPropIdList] Reliquary appendPropIdList
     */

    /**
     * Constructs a new Reliquary.
     * @exports Reliquary
     * @classdesc Represents a Reliquary.
     * @implements IReliquary
     * @constructor
     * @param {IReliquary=} [properties] Properties to set
     */
    function Reliquary(properties) {
        this.appendPropIdList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Reliquary level.
     * @member {number} level
     * @memberof Reliquary
     * @instance
     */
    Reliquary.prototype.level = 0;

    /**
     * Reliquary exp.
     * @member {number} exp
     * @memberof Reliquary
     * @instance
     */
    Reliquary.prototype.exp = 0;

    /**
     * Reliquary promoteLevel.
     * @member {number} promoteLevel
     * @memberof Reliquary
     * @instance
     */
    Reliquary.prototype.promoteLevel = 0;

    /**
     * Reliquary mainPropId.
     * @member {number} mainPropId
     * @memberof Reliquary
     * @instance
     */
    Reliquary.prototype.mainPropId = 0;

    /**
     * Reliquary appendPropIdList.
     * @member {Array.<number>} appendPropIdList
     * @memberof Reliquary
     * @instance
     */
    Reliquary.prototype.appendPropIdList = $util.emptyArray;

    /**
     * Creates a new Reliquary instance using the specified properties.
     * @function create
     * @memberof Reliquary
     * @static
     * @param {IReliquary=} [properties] Properties to set
     * @returns {Reliquary} Reliquary instance
     */
    Reliquary.create = function create(properties) {
        return new Reliquary(properties);
    };

    /**
     * Encodes the specified Reliquary message. Does not implicitly {@link Reliquary.verify|verify} messages.
     * @function encode
     * @memberof Reliquary
     * @static
     * @param {IReliquary} message Reliquary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Reliquary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.level != null && Object.hasOwnProperty.call(message, "level"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.level);
        if (message.exp != null && Object.hasOwnProperty.call(message, "exp"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.exp);
        if (message.promoteLevel != null && Object.hasOwnProperty.call(message, "promoteLevel"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.promoteLevel);
        if (message.mainPropId != null && Object.hasOwnProperty.call(message, "mainPropId"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.mainPropId);
        if (message.appendPropIdList != null && message.appendPropIdList.length) {
            writer.uint32(/* id 5, wireType 2 =*/42).fork();
            for (let i = 0; i < message.appendPropIdList.length; ++i)
                writer.uint32(message.appendPropIdList[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Reliquary message, length delimited. Does not implicitly {@link Reliquary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Reliquary
     * @static
     * @param {IReliquary} message Reliquary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Reliquary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Reliquary message from the specified reader or buffer.
     * @function decode
     * @memberof Reliquary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Reliquary} Reliquary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Reliquary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Reliquary();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.level = reader.uint32();
                    break;
                case 2:
                    message.exp = reader.uint32();
                    break;
                case 3:
                    message.promoteLevel = reader.uint32();
                    break;
                case 4:
                    message.mainPropId = reader.uint32();
                    break;
                case 5:
                    if (!(message.appendPropIdList && message.appendPropIdList.length))
                        message.appendPropIdList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.appendPropIdList.push(reader.uint32());
                    } else
                        message.appendPropIdList.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Reliquary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Reliquary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Reliquary} Reliquary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Reliquary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Reliquary message.
     * @function verify
     * @memberof Reliquary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Reliquary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.level != null && message.hasOwnProperty("level"))
            if (!$util.isInteger(message.level))
                return "level: integer expected";
        if (message.exp != null && message.hasOwnProperty("exp"))
            if (!$util.isInteger(message.exp))
                return "exp: integer expected";
        if (message.promoteLevel != null && message.hasOwnProperty("promoteLevel"))
            if (!$util.isInteger(message.promoteLevel))
                return "promoteLevel: integer expected";
        if (message.mainPropId != null && message.hasOwnProperty("mainPropId"))
            if (!$util.isInteger(message.mainPropId))
                return "mainPropId: integer expected";
        if (message.appendPropIdList != null && message.hasOwnProperty("appendPropIdList")) {
            if (!Array.isArray(message.appendPropIdList))
                return "appendPropIdList: array expected";
            for (let i = 0; i < message.appendPropIdList.length; ++i)
                if (!$util.isInteger(message.appendPropIdList[i]))
                    return "appendPropIdList: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a Reliquary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Reliquary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Reliquary} Reliquary
     */
    Reliquary.fromObject = function fromObject(object) {
        if (object instanceof $root.Reliquary)
            return object;
        let message = new $root.Reliquary();
        if (object.level != null)
            message.level = object.level >>> 0;
        if (object.exp != null)
            message.exp = object.exp >>> 0;
        if (object.promoteLevel != null)
            message.promoteLevel = object.promoteLevel >>> 0;
        if (object.mainPropId != null)
            message.mainPropId = object.mainPropId >>> 0;
        if (object.appendPropIdList) {
            if (!Array.isArray(object.appendPropIdList))
                throw TypeError(".Reliquary.appendPropIdList: array expected");
            message.appendPropIdList = [];
            for (let i = 0; i < object.appendPropIdList.length; ++i)
                message.appendPropIdList[i] = object.appendPropIdList[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a Reliquary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Reliquary
     * @static
     * @param {Reliquary} message Reliquary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Reliquary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.appendPropIdList = [];
        if (options.defaults) {
            object.level = 0;
            object.exp = 0;
            object.promoteLevel = 0;
            object.mainPropId = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.exp != null && message.hasOwnProperty("exp"))
            object.exp = message.exp;
        if (message.promoteLevel != null && message.hasOwnProperty("promoteLevel"))
            object.promoteLevel = message.promoteLevel;
        if (message.mainPropId != null && message.hasOwnProperty("mainPropId"))
            object.mainPropId = message.mainPropId;
        if (message.appendPropIdList && message.appendPropIdList.length) {
            object.appendPropIdList = [];
            for (let j = 0; j < message.appendPropIdList.length; ++j)
                object.appendPropIdList[j] = message.appendPropIdList[j];
        }
        return object;
    };

    /**
     * Converts this Reliquary to JSON.
     * @function toJSON
     * @memberof Reliquary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Reliquary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Reliquary;
})();

export const Weapon = $root.Weapon = (() => {

    /**
     * Properties of a Weapon.
     * @exports IWeapon
     * @interface IWeapon
     * @property {number|null} [level] Weapon level
     * @property {number|null} [exp] Weapon exp
     * @property {number|null} [promoteLevel] Weapon promoteLevel
     * @property {Object.<string,number>|null} [affixMap] Weapon affixMap
     */

    /**
     * Constructs a new Weapon.
     * @exports Weapon
     * @classdesc Represents a Weapon.
     * @implements IWeapon
     * @constructor
     * @param {IWeapon=} [properties] Properties to set
     */
    function Weapon(properties) {
        this.affixMap = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Weapon level.
     * @member {number} level
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.level = 0;

    /**
     * Weapon exp.
     * @member {number} exp
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.exp = 0;

    /**
     * Weapon promoteLevel.
     * @member {number} promoteLevel
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.promoteLevel = 0;

    /**
     * Weapon affixMap.
     * @member {Object.<string,number>} affixMap
     * @memberof Weapon
     * @instance
     */
    Weapon.prototype.affixMap = $util.emptyObject;

    /**
     * Creates a new Weapon instance using the specified properties.
     * @function create
     * @memberof Weapon
     * @static
     * @param {IWeapon=} [properties] Properties to set
     * @returns {Weapon} Weapon instance
     */
    Weapon.create = function create(properties) {
        return new Weapon(properties);
    };

    /**
     * Encodes the specified Weapon message. Does not implicitly {@link Weapon.verify|verify} messages.
     * @function encode
     * @memberof Weapon
     * @static
     * @param {IWeapon} message Weapon message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Weapon.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.level != null && Object.hasOwnProperty.call(message, "level"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.level);
        if (message.exp != null && Object.hasOwnProperty.call(message, "exp"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.exp);
        if (message.promoteLevel != null && Object.hasOwnProperty.call(message, "promoteLevel"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.promoteLevel);
        if (message.affixMap != null && Object.hasOwnProperty.call(message, "affixMap"))
            for (let keys = Object.keys(message.affixMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.affixMap[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Weapon message, length delimited. Does not implicitly {@link Weapon.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Weapon
     * @static
     * @param {IWeapon} message Weapon message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Weapon.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Weapon message from the specified reader or buffer.
     * @function decode
     * @memberof Weapon
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Weapon} Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapon.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapon(), key, value;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.level = reader.uint32();
                    break;
                case 2:
                    message.exp = reader.uint32();
                    break;
                case 3:
                    message.promoteLevel = reader.uint32();
                    break;
                case 4:
                    if (message.affixMap === $util.emptyObject)
                        message.affixMap = {};
                    let end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = 0;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                            case 1:
                                key = reader.uint32();
                                break;
                            case 2:
                                value = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                        }
                    }
                    message.affixMap[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Weapon message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Weapon
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Weapon} Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapon.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Weapon message.
     * @function verify
     * @memberof Weapon
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Weapon.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.level != null && message.hasOwnProperty("level"))
            if (!$util.isInteger(message.level))
                return "level: integer expected";
        if (message.exp != null && message.hasOwnProperty("exp"))
            if (!$util.isInteger(message.exp))
                return "exp: integer expected";
        if (message.promoteLevel != null && message.hasOwnProperty("promoteLevel"))
            if (!$util.isInteger(message.promoteLevel))
                return "promoteLevel: integer expected";
        if (message.affixMap != null && message.hasOwnProperty("affixMap")) {
            if (!$util.isObject(message.affixMap))
                return "affixMap: object expected";
            let key = Object.keys(message.affixMap);
            for (let i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "affixMap: integer key{k:uint32} expected";
                if (!$util.isInteger(message.affixMap[key[i]]))
                    return "affixMap: integer{k:uint32} expected";
            }
        }
        return null;
    };

    /**
     * Creates a Weapon message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Weapon
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Weapon} Weapon
     */
    Weapon.fromObject = function fromObject(object) {
        if (object instanceof $root.Weapon)
            return object;
        let message = new $root.Weapon();
        if (object.level != null)
            message.level = object.level >>> 0;
        if (object.exp != null)
            message.exp = object.exp >>> 0;
        if (object.promoteLevel != null)
            message.promoteLevel = object.promoteLevel >>> 0;
        if (object.affixMap) {
            if (typeof object.affixMap !== "object")
                throw TypeError(".Weapon.affixMap: object expected");
            message.affixMap = {};
            for (let keys = Object.keys(object.affixMap), i = 0; i < keys.length; ++i)
                message.affixMap[keys[i]] = object.affixMap[keys[i]] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a Weapon message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Weapon
     * @static
     * @param {Weapon} message Weapon
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Weapon.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.affixMap = {};
        if (options.defaults) {
            object.level = 0;
            object.exp = 0;
            object.promoteLevel = 0;
        }
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.exp != null && message.hasOwnProperty("exp"))
            object.exp = message.exp;
        if (message.promoteLevel != null && message.hasOwnProperty("promoteLevel"))
            object.promoteLevel = message.promoteLevel;
        let keys2;
        if (message.affixMap && (keys2 = Object.keys(message.affixMap)).length) {
            object.affixMap = {};
            for (let j = 0; j < keys2.length; ++j)
                object.affixMap[keys2[j]] = message.affixMap[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this Weapon to JSON.
     * @function toJSON
     * @memberof Weapon
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Weapon.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Weapon;
})();

export const Furniture = $root.Furniture = (() => {

    /**
     * Properties of a Furniture.
     * @exports IFurniture
     * @interface IFurniture
     * @property {number|null} [count] Furniture count
     */

    /**
     * Constructs a new Furniture.
     * @exports Furniture
     * @classdesc Represents a Furniture.
     * @implements IFurniture
     * @constructor
     * @param {IFurniture=} [properties] Properties to set
     */
    function Furniture(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Furniture count.
     * @member {number} count
     * @memberof Furniture
     * @instance
     */
    Furniture.prototype.count = 0;

    /**
     * Creates a new Furniture instance using the specified properties.
     * @function create
     * @memberof Furniture
     * @static
     * @param {IFurniture=} [properties] Properties to set
     * @returns {Furniture} Furniture instance
     */
    Furniture.create = function create(properties) {
        return new Furniture(properties);
    };

    /**
     * Encodes the specified Furniture message. Does not implicitly {@link Furniture.verify|verify} messages.
     * @function encode
     * @memberof Furniture
     * @static
     * @param {IFurniture} message Furniture message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Furniture.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.count != null && Object.hasOwnProperty.call(message, "count"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.count);
        return writer;
    };

    /**
     * Encodes the specified Furniture message, length delimited. Does not implicitly {@link Furniture.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Furniture
     * @static
     * @param {IFurniture} message Furniture message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Furniture.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Furniture message from the specified reader or buffer.
     * @function decode
     * @memberof Furniture
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Furniture} Furniture
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Furniture.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Furniture();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.count = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Furniture message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Furniture
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Furniture} Furniture
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Furniture.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Furniture message.
     * @function verify
     * @memberof Furniture
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Furniture.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.count != null && message.hasOwnProperty("count"))
            if (!$util.isInteger(message.count))
                return "count: integer expected";
        return null;
    };

    /**
     * Creates a Furniture message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Furniture
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Furniture} Furniture
     */
    Furniture.fromObject = function fromObject(object) {
        if (object instanceof $root.Furniture)
            return object;
        let message = new $root.Furniture();
        if (object.count != null)
            message.count = object.count >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Furniture message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Furniture
     * @static
     * @param {Furniture} message Furniture
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Furniture.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.count = 0;
        if (message.count != null && message.hasOwnProperty("count"))
            object.count = message.count;
        return object;
    };

    /**
     * Converts this Furniture to JSON.
     * @function toJSON
     * @memberof Furniture
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Furniture.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Furniture;
})();

export const Material = $root.Material = (() => {

    /**
     * Properties of a Material.
     * @exports IMaterial
     * @interface IMaterial
     * @property {number|null} [count] Material count
     * @property {IMaterialDeleteInfo|null} [deleteInfo] Material deleteInfo
     */

    /**
     * Constructs a new Material.
     * @exports Material
     * @classdesc Represents a Material.
     * @implements IMaterial
     * @constructor
     * @param {IMaterial=} [properties] Properties to set
     */
    function Material(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Material count.
     * @member {number} count
     * @memberof Material
     * @instance
     */
    Material.prototype.count = 0;

    /**
     * Material deleteInfo.
     * @member {IMaterialDeleteInfo|null|undefined} deleteInfo
     * @memberof Material
     * @instance
     */
    Material.prototype.deleteInfo = null;

    /**
     * Creates a new Material instance using the specified properties.
     * @function create
     * @memberof Material
     * @static
     * @param {IMaterial=} [properties] Properties to set
     * @returns {Material} Material instance
     */
    Material.create = function create(properties) {
        return new Material(properties);
    };

    /**
     * Encodes the specified Material message. Does not implicitly {@link Material.verify|verify} messages.
     * @function encode
     * @memberof Material
     * @static
     * @param {IMaterial} message Material message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Material.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.count != null && Object.hasOwnProperty.call(message, "count"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.count);
        if (message.deleteInfo != null && Object.hasOwnProperty.call(message, "deleteInfo"))
            $root.MaterialDeleteInfo.encode(message.deleteInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Material message, length delimited. Does not implicitly {@link Material.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Material
     * @static
     * @param {IMaterial} message Material message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Material.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Material message from the specified reader or buffer.
     * @function decode
     * @memberof Material
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Material} Material
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Material.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Material();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.count = reader.uint32();
                    break;
                case 2:
                    message.deleteInfo = $root.MaterialDeleteInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Material message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Material
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Material} Material
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Material.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Material message.
     * @function verify
     * @memberof Material
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Material.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.count != null && message.hasOwnProperty("count"))
            if (!$util.isInteger(message.count))
                return "count: integer expected";
        if (message.deleteInfo != null && message.hasOwnProperty("deleteInfo")) {
            let error = $root.MaterialDeleteInfo.verify(message.deleteInfo);
            if (error)
                return "deleteInfo." + error;
        }
        return null;
    };

    /**
     * Creates a Material message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Material
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Material} Material
     */
    Material.fromObject = function fromObject(object) {
        if (object instanceof $root.Material)
            return object;
        let message = new $root.Material();
        if (object.count != null)
            message.count = object.count >>> 0;
        if (object.deleteInfo != null) {
            if (typeof object.deleteInfo !== "object")
                throw TypeError(".Material.deleteInfo: object expected");
            message.deleteInfo = $root.MaterialDeleteInfo.fromObject(object.deleteInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a Material message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Material
     * @static
     * @param {Material} message Material
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Material.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.count = 0;
            object.deleteInfo = null;
        }
        if (message.count != null && message.hasOwnProperty("count"))
            object.count = message.count;
        if (message.deleteInfo != null && message.hasOwnProperty("deleteInfo"))
            object.deleteInfo = $root.MaterialDeleteInfo.toObject(message.deleteInfo, options);
        return object;
    };

    /**
     * Converts this Material to JSON.
     * @function toJSON
     * @memberof Material
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Material.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Material;
})();

export const MaterialDeleteInfo = $root.MaterialDeleteInfo = (() => {

    /**
     * Properties of a MaterialDeleteInfo.
     * @exports IMaterialDeleteInfo
     * @interface IMaterialDeleteInfo
     * @property {boolean|null} [hasDeleteConfig] MaterialDeleteInfo hasDeleteConfig
     * @property {MaterialDeleteInfo.ICountDownDelete|null} [countDownDelete] MaterialDeleteInfo countDownDelete
     * @property {MaterialDeleteInfo.IDateTimeDelete|null} [dateDelete] MaterialDeleteInfo dateDelete
     * @property {MaterialDeleteInfo.IDelayWeekCountDownDelete|null} [delayWeekCountDownDelete] MaterialDeleteInfo delayWeekCountDownDelete
     */

    /**
     * Constructs a new MaterialDeleteInfo.
     * @exports MaterialDeleteInfo
     * @classdesc Represents a MaterialDeleteInfo.
     * @implements IMaterialDeleteInfo
     * @constructor
     * @param {IMaterialDeleteInfo=} [properties] Properties to set
     */
    function MaterialDeleteInfo(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MaterialDeleteInfo hasDeleteConfig.
     * @member {boolean} hasDeleteConfig
     * @memberof MaterialDeleteInfo
     * @instance
     */
    MaterialDeleteInfo.prototype.hasDeleteConfig = false;

    /**
     * MaterialDeleteInfo countDownDelete.
     * @member {MaterialDeleteInfo.ICountDownDelete|null|undefined} countDownDelete
     * @memberof MaterialDeleteInfo
     * @instance
     */
    MaterialDeleteInfo.prototype.countDownDelete = null;

    /**
     * MaterialDeleteInfo dateDelete.
     * @member {MaterialDeleteInfo.IDateTimeDelete|null|undefined} dateDelete
     * @memberof MaterialDeleteInfo
     * @instance
     */
    MaterialDeleteInfo.prototype.dateDelete = null;

    /**
     * MaterialDeleteInfo delayWeekCountDownDelete.
     * @member {MaterialDeleteInfo.IDelayWeekCountDownDelete|null|undefined} delayWeekCountDownDelete
     * @memberof MaterialDeleteInfo
     * @instance
     */
    MaterialDeleteInfo.prototype.delayWeekCountDownDelete = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * MaterialDeleteInfo deleteInfo.
     * @member {"countDownDelete"|"dateDelete"|"delayWeekCountDownDelete"|undefined} deleteInfo
     * @memberof MaterialDeleteInfo
     * @instance
     */
    Object.defineProperty(MaterialDeleteInfo.prototype, "deleteInfo", {
        get: $util.oneOfGetter($oneOfFields = ["countDownDelete", "dateDelete", "delayWeekCountDownDelete"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MaterialDeleteInfo instance using the specified properties.
     * @function create
     * @memberof MaterialDeleteInfo
     * @static
     * @param {IMaterialDeleteInfo=} [properties] Properties to set
     * @returns {MaterialDeleteInfo} MaterialDeleteInfo instance
     */
    MaterialDeleteInfo.create = function create(properties) {
        return new MaterialDeleteInfo(properties);
    };

    /**
     * Encodes the specified MaterialDeleteInfo message. Does not implicitly {@link MaterialDeleteInfo.verify|verify} messages.
     * @function encode
     * @memberof MaterialDeleteInfo
     * @static
     * @param {IMaterialDeleteInfo} message MaterialDeleteInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MaterialDeleteInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.hasDeleteConfig != null && Object.hasOwnProperty.call(message, "hasDeleteConfig"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.hasDeleteConfig);
        if (message.countDownDelete != null && Object.hasOwnProperty.call(message, "countDownDelete"))
            $root.MaterialDeleteInfo.CountDownDelete.encode(message.countDownDelete, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.dateDelete != null && Object.hasOwnProperty.call(message, "dateDelete"))
            $root.MaterialDeleteInfo.DateTimeDelete.encode(message.dateDelete, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.delayWeekCountDownDelete != null && Object.hasOwnProperty.call(message, "delayWeekCountDownDelete"))
            $root.MaterialDeleteInfo.DelayWeekCountDownDelete.encode(message.delayWeekCountDownDelete, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MaterialDeleteInfo message, length delimited. Does not implicitly {@link MaterialDeleteInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MaterialDeleteInfo
     * @static
     * @param {IMaterialDeleteInfo} message MaterialDeleteInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MaterialDeleteInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MaterialDeleteInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MaterialDeleteInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MaterialDeleteInfo} MaterialDeleteInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MaterialDeleteInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MaterialDeleteInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hasDeleteConfig = reader.bool();
                    break;
                case 2:
                    message.countDownDelete = $root.MaterialDeleteInfo.CountDownDelete.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dateDelete = $root.MaterialDeleteInfo.DateTimeDelete.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.delayWeekCountDownDelete = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a MaterialDeleteInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MaterialDeleteInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MaterialDeleteInfo} MaterialDeleteInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MaterialDeleteInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MaterialDeleteInfo message.
     * @function verify
     * @memberof MaterialDeleteInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MaterialDeleteInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.hasDeleteConfig != null && message.hasOwnProperty("hasDeleteConfig"))
            if (typeof message.hasDeleteConfig !== "boolean")
                return "hasDeleteConfig: boolean expected";
        if (message.countDownDelete != null && message.hasOwnProperty("countDownDelete")) {
            properties.deleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.CountDownDelete.verify(message.countDownDelete);
                if (error)
                    return "countDownDelete." + error;
            }
        }
        if (message.dateDelete != null && message.hasOwnProperty("dateDelete")) {
            if (properties.deleteInfo === 1)
                return "deleteInfo: multiple values";
            properties.deleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.DateTimeDelete.verify(message.dateDelete);
                if (error)
                    return "dateDelete." + error;
            }
        }
        if (message.delayWeekCountDownDelete != null && message.hasOwnProperty("delayWeekCountDownDelete")) {
            if (properties.deleteInfo === 1)
                return "deleteInfo: multiple values";
            properties.deleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.verify(message.delayWeekCountDownDelete);
                if (error)
                    return "delayWeekCountDownDelete." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MaterialDeleteInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MaterialDeleteInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MaterialDeleteInfo} MaterialDeleteInfo
     */
    MaterialDeleteInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.MaterialDeleteInfo)
            return object;
        let message = new $root.MaterialDeleteInfo();
        if (object.hasDeleteConfig != null)
            message.hasDeleteConfig = Boolean(object.hasDeleteConfig);
        if (object.countDownDelete != null) {
            if (typeof object.countDownDelete !== "object")
                throw TypeError(".MaterialDeleteInfo.countDownDelete: object expected");
            message.countDownDelete = $root.MaterialDeleteInfo.CountDownDelete.fromObject(object.countDownDelete);
        }
        if (object.dateDelete != null) {
            if (typeof object.dateDelete !== "object")
                throw TypeError(".MaterialDeleteInfo.dateDelete: object expected");
            message.dateDelete = $root.MaterialDeleteInfo.DateTimeDelete.fromObject(object.dateDelete);
        }
        if (object.delayWeekCountDownDelete != null) {
            if (typeof object.delayWeekCountDownDelete !== "object")
                throw TypeError(".MaterialDeleteInfo.delayWeekCountDownDelete: object expected");
            message.delayWeekCountDownDelete = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.fromObject(object.delayWeekCountDownDelete);
        }
        return message;
    };

    /**
     * Creates a plain object from a MaterialDeleteInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MaterialDeleteInfo
     * @static
     * @param {MaterialDeleteInfo} message MaterialDeleteInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MaterialDeleteInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.hasDeleteConfig = false;
        if (message.hasDeleteConfig != null && message.hasOwnProperty("hasDeleteConfig"))
            object.hasDeleteConfig = message.hasDeleteConfig;
        if (message.countDownDelete != null && message.hasOwnProperty("countDownDelete")) {
            object.countDownDelete = $root.MaterialDeleteInfo.CountDownDelete.toObject(message.countDownDelete, options);
            if (options.oneofs)
                object.deleteInfo = "countDownDelete";
        }
        if (message.dateDelete != null && message.hasOwnProperty("dateDelete")) {
            object.dateDelete = $root.MaterialDeleteInfo.DateTimeDelete.toObject(message.dateDelete, options);
            if (options.oneofs)
                object.deleteInfo = "dateDelete";
        }
        if (message.delayWeekCountDownDelete != null && message.hasOwnProperty("delayWeekCountDownDelete")) {
            object.delayWeekCountDownDelete = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.toObject(message.delayWeekCountDownDelete, options);
            if (options.oneofs)
                object.deleteInfo = "delayWeekCountDownDelete";
        }
        return object;
    };

    /**
     * Converts this MaterialDeleteInfo to JSON.
     * @function toJSON
     * @memberof MaterialDeleteInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MaterialDeleteInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    MaterialDeleteInfo.CountDownDelete = (function () {

        /**
         * Properties of a CountDownDelete.
         * @memberof MaterialDeleteInfo
         * @interface ICountDownDelete
         * @property {Object.<string,number>|null} [deleteTimeNumMap] CountDownDelete deleteTimeNumMap
         * @property {number|null} [configCountDownTime] CountDownDelete configCountDownTime
         */

        /**
         * Constructs a new CountDownDelete.
         * @memberof MaterialDeleteInfo
         * @classdesc Represents a CountDownDelete.
         * @implements ICountDownDelete
         * @constructor
         * @param {MaterialDeleteInfo.ICountDownDelete=} [properties] Properties to set
         */
        function CountDownDelete(properties) {
            this.deleteTimeNumMap = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CountDownDelete deleteTimeNumMap.
         * @member {Object.<string,number>} deleteTimeNumMap
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @instance
         */
        CountDownDelete.prototype.deleteTimeNumMap = $util.emptyObject;

        /**
         * CountDownDelete configCountDownTime.
         * @member {number} configCountDownTime
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @instance
         */
        CountDownDelete.prototype.configCountDownTime = 0;

        /**
         * Creates a new CountDownDelete instance using the specified properties.
         * @function create
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {MaterialDeleteInfo.ICountDownDelete=} [properties] Properties to set
         * @returns {MaterialDeleteInfo.CountDownDelete} CountDownDelete instance
         */
        CountDownDelete.create = function create(properties) {
            return new CountDownDelete(properties);
        };

        /**
         * Encodes the specified CountDownDelete message. Does not implicitly {@link MaterialDeleteInfo.CountDownDelete.verify|verify} messages.
         * @function encode
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {MaterialDeleteInfo.ICountDownDelete} message CountDownDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CountDownDelete.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deleteTimeNumMap != null && Object.hasOwnProperty.call(message, "deleteTimeNumMap"))
                for (let keys = Object.keys(message.deleteTimeNumMap), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.deleteTimeNumMap[keys[i]]).ldelim();
            if (message.configCountDownTime != null && Object.hasOwnProperty.call(message, "configCountDownTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.configCountDownTime);
            return writer;
        };

        /**
         * Encodes the specified CountDownDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.CountDownDelete.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {MaterialDeleteInfo.ICountDownDelete} message CountDownDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CountDownDelete.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CountDownDelete message from the specified reader or buffer.
         * @function decode
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MaterialDeleteInfo.CountDownDelete} CountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CountDownDelete.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MaterialDeleteInfo.CountDownDelete(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (message.deleteTimeNumMap === $util.emptyObject)
                            message.deleteTimeNumMap = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.uint32();
                                    break;
                                case 2:
                                    value = reader.uint32();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                            }
                        }
                        message.deleteTimeNumMap[key] = value;
                        break;
                    case 2:
                        message.configCountDownTime = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CountDownDelete message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MaterialDeleteInfo.CountDownDelete} CountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CountDownDelete.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CountDownDelete message.
         * @function verify
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CountDownDelete.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deleteTimeNumMap != null && message.hasOwnProperty("deleteTimeNumMap")) {
                if (!$util.isObject(message.deleteTimeNumMap))
                    return "deleteTimeNumMap: object expected";
                let key = Object.keys(message.deleteTimeNumMap);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "deleteTimeNumMap: integer key{k:uint32} expected";
                    if (!$util.isInteger(message.deleteTimeNumMap[key[i]]))
                        return "deleteTimeNumMap: integer{k:uint32} expected";
                }
            }
            if (message.configCountDownTime != null && message.hasOwnProperty("configCountDownTime"))
                if (!$util.isInteger(message.configCountDownTime))
                    return "configCountDownTime: integer expected";
            return null;
        };

        /**
         * Creates a CountDownDelete message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MaterialDeleteInfo.CountDownDelete} CountDownDelete
         */
        CountDownDelete.fromObject = function fromObject(object) {
            if (object instanceof $root.MaterialDeleteInfo.CountDownDelete)
                return object;
            let message = new $root.MaterialDeleteInfo.CountDownDelete();
            if (object.deleteTimeNumMap) {
                if (typeof object.deleteTimeNumMap !== "object")
                    throw TypeError(".MaterialDeleteInfo.CountDownDelete.deleteTimeNumMap: object expected");
                message.deleteTimeNumMap = {};
                for (let keys = Object.keys(object.deleteTimeNumMap), i = 0; i < keys.length; ++i)
                    message.deleteTimeNumMap[keys[i]] = object.deleteTimeNumMap[keys[i]] >>> 0;
            }
            if (object.configCountDownTime != null)
                message.configCountDownTime = object.configCountDownTime >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a CountDownDelete message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @static
         * @param {MaterialDeleteInfo.CountDownDelete} message CountDownDelete
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CountDownDelete.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.objects || options.defaults)
                object.deleteTimeNumMap = {};
            if (options.defaults)
                object.configCountDownTime = 0;
            let keys2;
            if (message.deleteTimeNumMap && (keys2 = Object.keys(message.deleteTimeNumMap)).length) {
                object.deleteTimeNumMap = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.deleteTimeNumMap[keys2[j]] = message.deleteTimeNumMap[keys2[j]];
            }
            if (message.configCountDownTime != null && message.hasOwnProperty("configCountDownTime"))
                object.configCountDownTime = message.configCountDownTime;
            return object;
        };

        /**
         * Converts this CountDownDelete to JSON.
         * @function toJSON
         * @memberof MaterialDeleteInfo.CountDownDelete
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CountDownDelete.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CountDownDelete;
    })();

    MaterialDeleteInfo.DateTimeDelete = (function () {

        /**
         * Properties of a DateTimeDelete.
         * @memberof MaterialDeleteInfo
         * @interface IDateTimeDelete
         * @property {number|null} [deleteTime] DateTimeDelete deleteTime
         */

        /**
         * Constructs a new DateTimeDelete.
         * @memberof MaterialDeleteInfo
         * @classdesc Represents a DateTimeDelete.
         * @implements IDateTimeDelete
         * @constructor
         * @param {MaterialDeleteInfo.IDateTimeDelete=} [properties] Properties to set
         */
        function DateTimeDelete(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DateTimeDelete deleteTime.
         * @member {number} deleteTime
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @instance
         */
        DateTimeDelete.prototype.deleteTime = 0;

        /**
         * Creates a new DateTimeDelete instance using the specified properties.
         * @function create
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {MaterialDeleteInfo.IDateTimeDelete=} [properties] Properties to set
         * @returns {MaterialDeleteInfo.DateTimeDelete} DateTimeDelete instance
         */
        DateTimeDelete.create = function create(properties) {
            return new DateTimeDelete(properties);
        };

        /**
         * Encodes the specified DateTimeDelete message. Does not implicitly {@link MaterialDeleteInfo.DateTimeDelete.verify|verify} messages.
         * @function encode
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {MaterialDeleteInfo.IDateTimeDelete} message DateTimeDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DateTimeDelete.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deleteTime != null && Object.hasOwnProperty.call(message, "deleteTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.deleteTime);
            return writer;
        };

        /**
         * Encodes the specified DateTimeDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.DateTimeDelete.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {MaterialDeleteInfo.IDateTimeDelete} message DateTimeDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DateTimeDelete.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DateTimeDelete message from the specified reader or buffer.
         * @function decode
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MaterialDeleteInfo.DateTimeDelete} DateTimeDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DateTimeDelete.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MaterialDeleteInfo.DateTimeDelete();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.deleteTime = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a DateTimeDelete message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MaterialDeleteInfo.DateTimeDelete} DateTimeDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DateTimeDelete.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DateTimeDelete message.
         * @function verify
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DateTimeDelete.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deleteTime != null && message.hasOwnProperty("deleteTime"))
                if (!$util.isInteger(message.deleteTime))
                    return "deleteTime: integer expected";
            return null;
        };

        /**
         * Creates a DateTimeDelete message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MaterialDeleteInfo.DateTimeDelete} DateTimeDelete
         */
        DateTimeDelete.fromObject = function fromObject(object) {
            if (object instanceof $root.MaterialDeleteInfo.DateTimeDelete)
                return object;
            let message = new $root.MaterialDeleteInfo.DateTimeDelete();
            if (object.deleteTime != null)
                message.deleteTime = object.deleteTime >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a DateTimeDelete message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @static
         * @param {MaterialDeleteInfo.DateTimeDelete} message DateTimeDelete
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DateTimeDelete.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.deleteTime = 0;
            if (message.deleteTime != null && message.hasOwnProperty("deleteTime"))
                object.deleteTime = message.deleteTime;
            return object;
        };

        /**
         * Converts this DateTimeDelete to JSON.
         * @function toJSON
         * @memberof MaterialDeleteInfo.DateTimeDelete
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DateTimeDelete.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DateTimeDelete;
    })();

    MaterialDeleteInfo.DelayWeekCountDownDelete = (function () {

        /**
         * Properties of a DelayWeekCountDownDelete.
         * @memberof MaterialDeleteInfo
         * @interface IDelayWeekCountDownDelete
         * @property {Object.<string,number>|null} [deleteTimeNumMap] DelayWeekCountDownDelete deleteTimeNumMap
         * @property {number|null} [configDelayWeek] DelayWeekCountDownDelete configDelayWeek
         * @property {number|null} [configCountDownTime] DelayWeekCountDownDelete configCountDownTime
         */

        /**
         * Constructs a new DelayWeekCountDownDelete.
         * @memberof MaterialDeleteInfo
         * @classdesc Represents a DelayWeekCountDownDelete.
         * @implements IDelayWeekCountDownDelete
         * @constructor
         * @param {MaterialDeleteInfo.IDelayWeekCountDownDelete=} [properties] Properties to set
         */
        function DelayWeekCountDownDelete(properties) {
            this.deleteTimeNumMap = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelayWeekCountDownDelete deleteTimeNumMap.
         * @member {Object.<string,number>} deleteTimeNumMap
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @instance
         */
        DelayWeekCountDownDelete.prototype.deleteTimeNumMap = $util.emptyObject;

        /**
         * DelayWeekCountDownDelete configDelayWeek.
         * @member {number} configDelayWeek
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @instance
         */
        DelayWeekCountDownDelete.prototype.configDelayWeek = 0;

        /**
         * DelayWeekCountDownDelete configCountDownTime.
         * @member {number} configCountDownTime
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @instance
         */
        DelayWeekCountDownDelete.prototype.configCountDownTime = 0;

        /**
         * Creates a new DelayWeekCountDownDelete instance using the specified properties.
         * @function create
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {MaterialDeleteInfo.IDelayWeekCountDownDelete=} [properties] Properties to set
         * @returns {MaterialDeleteInfo.DelayWeekCountDownDelete} DelayWeekCountDownDelete instance
         */
        DelayWeekCountDownDelete.create = function create(properties) {
            return new DelayWeekCountDownDelete(properties);
        };

        /**
         * Encodes the specified DelayWeekCountDownDelete message. Does not implicitly {@link MaterialDeleteInfo.DelayWeekCountDownDelete.verify|verify} messages.
         * @function encode
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {MaterialDeleteInfo.IDelayWeekCountDownDelete} message DelayWeekCountDownDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelayWeekCountDownDelete.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deleteTimeNumMap != null && Object.hasOwnProperty.call(message, "deleteTimeNumMap"))
                for (let keys = Object.keys(message.deleteTimeNumMap), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.deleteTimeNumMap[keys[i]]).ldelim();
            if (message.configDelayWeek != null && Object.hasOwnProperty.call(message, "configDelayWeek"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.configDelayWeek);
            if (message.configCountDownTime != null && Object.hasOwnProperty.call(message, "configCountDownTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.configCountDownTime);
            return writer;
        };

        /**
         * Encodes the specified DelayWeekCountDownDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.DelayWeekCountDownDelete.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {MaterialDeleteInfo.IDelayWeekCountDownDelete} message DelayWeekCountDownDelete message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelayWeekCountDownDelete.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelayWeekCountDownDelete message from the specified reader or buffer.
         * @function decode
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MaterialDeleteInfo.DelayWeekCountDownDelete} DelayWeekCountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelayWeekCountDownDelete.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MaterialDeleteInfo.DelayWeekCountDownDelete(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (message.deleteTimeNumMap === $util.emptyObject)
                            message.deleteTimeNumMap = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.uint32();
                                    break;
                                case 2:
                                    value = reader.uint32();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                            }
                        }
                        message.deleteTimeNumMap[key] = value;
                        break;
                    case 2:
                        message.configDelayWeek = reader.uint32();
                        break;
                    case 3:
                        message.configCountDownTime = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelayWeekCountDownDelete message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MaterialDeleteInfo.DelayWeekCountDownDelete} DelayWeekCountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelayWeekCountDownDelete.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelayWeekCountDownDelete message.
         * @function verify
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelayWeekCountDownDelete.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deleteTimeNumMap != null && message.hasOwnProperty("deleteTimeNumMap")) {
                if (!$util.isObject(message.deleteTimeNumMap))
                    return "deleteTimeNumMap: object expected";
                let key = Object.keys(message.deleteTimeNumMap);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "deleteTimeNumMap: integer key{k:uint32} expected";
                    if (!$util.isInteger(message.deleteTimeNumMap[key[i]]))
                        return "deleteTimeNumMap: integer{k:uint32} expected";
                }
            }
            if (message.configDelayWeek != null && message.hasOwnProperty("configDelayWeek"))
                if (!$util.isInteger(message.configDelayWeek))
                    return "configDelayWeek: integer expected";
            if (message.configCountDownTime != null && message.hasOwnProperty("configCountDownTime"))
                if (!$util.isInteger(message.configCountDownTime))
                    return "configCountDownTime: integer expected";
            return null;
        };

        /**
         * Creates a DelayWeekCountDownDelete message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MaterialDeleteInfo.DelayWeekCountDownDelete} DelayWeekCountDownDelete
         */
        DelayWeekCountDownDelete.fromObject = function fromObject(object) {
            if (object instanceof $root.MaterialDeleteInfo.DelayWeekCountDownDelete)
                return object;
            let message = new $root.MaterialDeleteInfo.DelayWeekCountDownDelete();
            if (object.deleteTimeNumMap) {
                if (typeof object.deleteTimeNumMap !== "object")
                    throw TypeError(".MaterialDeleteInfo.DelayWeekCountDownDelete.deleteTimeNumMap: object expected");
                message.deleteTimeNumMap = {};
                for (let keys = Object.keys(object.deleteTimeNumMap), i = 0; i < keys.length; ++i)
                    message.deleteTimeNumMap[keys[i]] = object.deleteTimeNumMap[keys[i]] >>> 0;
            }
            if (object.configDelayWeek != null)
                message.configDelayWeek = object.configDelayWeek >>> 0;
            if (object.configCountDownTime != null)
                message.configCountDownTime = object.configCountDownTime >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a DelayWeekCountDownDelete message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @static
         * @param {MaterialDeleteInfo.DelayWeekCountDownDelete} message DelayWeekCountDownDelete
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelayWeekCountDownDelete.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.objects || options.defaults)
                object.deleteTimeNumMap = {};
            if (options.defaults) {
                object.configDelayWeek = 0;
                object.configCountDownTime = 0;
            }
            let keys2;
            if (message.deleteTimeNumMap && (keys2 = Object.keys(message.deleteTimeNumMap)).length) {
                object.deleteTimeNumMap = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.deleteTimeNumMap[keys2[j]] = message.deleteTimeNumMap[keys2[j]];
            }
            if (message.configDelayWeek != null && message.hasOwnProperty("configDelayWeek"))
                object.configDelayWeek = message.configDelayWeek;
            if (message.configCountDownTime != null && message.hasOwnProperty("configCountDownTime"))
                object.configCountDownTime = message.configCountDownTime;
            return object;
        };

        /**
         * Converts this DelayWeekCountDownDelete to JSON.
         * @function toJSON
         * @memberof MaterialDeleteInfo.DelayWeekCountDownDelete
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelayWeekCountDownDelete.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DelayWeekCountDownDelete;
    })();

    return MaterialDeleteInfo;
})();

export const TrialAvatarGrantRecord = $root.TrialAvatarGrantRecord = (() => {

    /**
     * Properties of a TrialAvatarGrantRecord.
     * @exports ITrialAvatarGrantRecord
     * @interface ITrialAvatarGrantRecord
     * @property {number|null} [grantReason] TrialAvatarGrantRecord grantReason
     * @property {number|null} [fromParentQuestId] TrialAvatarGrantRecord fromParentQuestId
     */

    /**
     * Constructs a new TrialAvatarGrantRecord.
     * @exports TrialAvatarGrantRecord
     * @classdesc Represents a TrialAvatarGrantRecord.
     * @implements ITrialAvatarGrantRecord
     * @constructor
     * @param {ITrialAvatarGrantRecord=} [properties] Properties to set
     */
    function TrialAvatarGrantRecord(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TrialAvatarGrantRecord grantReason.
     * @member {number} grantReason
     * @memberof TrialAvatarGrantRecord
     * @instance
     */
    TrialAvatarGrantRecord.prototype.grantReason = 0;

    /**
     * TrialAvatarGrantRecord fromParentQuestId.
     * @member {number} fromParentQuestId
     * @memberof TrialAvatarGrantRecord
     * @instance
     */
    TrialAvatarGrantRecord.prototype.fromParentQuestId = 0;

    /**
     * Creates a new TrialAvatarGrantRecord instance using the specified properties.
     * @function create
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {ITrialAvatarGrantRecord=} [properties] Properties to set
     * @returns {TrialAvatarGrantRecord} TrialAvatarGrantRecord instance
     */
    TrialAvatarGrantRecord.create = function create(properties) {
        return new TrialAvatarGrantRecord(properties);
    };

    /**
     * Encodes the specified TrialAvatarGrantRecord message. Does not implicitly {@link TrialAvatarGrantRecord.verify|verify} messages.
     * @function encode
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {ITrialAvatarGrantRecord} message TrialAvatarGrantRecord message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TrialAvatarGrantRecord.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.grantReason != null && Object.hasOwnProperty.call(message, "grantReason"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.grantReason);
        if (message.fromParentQuestId != null && Object.hasOwnProperty.call(message, "fromParentQuestId"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.fromParentQuestId);
        return writer;
    };

    /**
     * Encodes the specified TrialAvatarGrantRecord message, length delimited. Does not implicitly {@link TrialAvatarGrantRecord.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {ITrialAvatarGrantRecord} message TrialAvatarGrantRecord message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TrialAvatarGrantRecord.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TrialAvatarGrantRecord message from the specified reader or buffer.
     * @function decode
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TrialAvatarGrantRecord} TrialAvatarGrantRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TrialAvatarGrantRecord.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TrialAvatarGrantRecord();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.grantReason = reader.uint32();
                    break;
                case 2:
                    message.fromParentQuestId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a TrialAvatarGrantRecord message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TrialAvatarGrantRecord} TrialAvatarGrantRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TrialAvatarGrantRecord.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TrialAvatarGrantRecord message.
     * @function verify
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TrialAvatarGrantRecord.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.grantReason != null && message.hasOwnProperty("grantReason"))
            if (!$util.isInteger(message.grantReason))
                return "grantReason: integer expected";
        if (message.fromParentQuestId != null && message.hasOwnProperty("fromParentQuestId"))
            if (!$util.isInteger(message.fromParentQuestId))
                return "fromParentQuestId: integer expected";
        return null;
    };

    /**
     * Creates a TrialAvatarGrantRecord message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TrialAvatarGrantRecord} TrialAvatarGrantRecord
     */
    TrialAvatarGrantRecord.fromObject = function fromObject(object) {
        if (object instanceof $root.TrialAvatarGrantRecord)
            return object;
        let message = new $root.TrialAvatarGrantRecord();
        if (object.grantReason != null)
            message.grantReason = object.grantReason >>> 0;
        if (object.fromParentQuestId != null)
            message.fromParentQuestId = object.fromParentQuestId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a TrialAvatarGrantRecord message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TrialAvatarGrantRecord
     * @static
     * @param {TrialAvatarGrantRecord} message TrialAvatarGrantRecord
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TrialAvatarGrantRecord.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.grantReason = 0;
            object.fromParentQuestId = 0;
        }
        if (message.grantReason != null && message.hasOwnProperty("grantReason"))
            object.grantReason = message.grantReason;
        if (message.fromParentQuestId != null && message.hasOwnProperty("fromParentQuestId"))
            object.fromParentQuestId = message.fromParentQuestId;
        return object;
    };

    /**
     * Converts this TrialAvatarGrantRecord to JSON.
     * @function toJSON
     * @memberof TrialAvatarGrantRecord
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TrialAvatarGrantRecord.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * GrantReason enum.
     * @name TrialAvatarGrantRecord.GrantReason
     * @enum {number}
     * @property {number} GRANT_REASON_INVALID=0 GRANT_REASON_INVALID value
     * @property {number} GRANT_REASON_BY_QUEST=1 GRANT_REASON_BY_QUEST value
     * @property {number} GRANT_REASON_BY_TRIAL_AVATAR_ACTIVITY=2 GRANT_REASON_BY_TRIAL_AVATAR_ACTIVITY value
     * @property {number} GRANT_REASON_BY_DUNGEON_ELEMENT_CHALLENGE=3 GRANT_REASON_BY_DUNGEON_ELEMENT_CHALLENGE value
     * @property {number} GRANT_REASON_BY_MIST_TRIAL_ACTIVITY=4 GRANT_REASON_BY_MIST_TRIAL_ACTIVITY value
     * @property {number} GRANT_REASON_BY_SUMO_ACTIVITY=5 GRANT_REASON_BY_SUMO_ACTIVITY value
     * @property {number} GRANT_REASON_ELPMDIEIOHP=6 GRANT_REASON_ELPMDIEIOHP value
     * @property {number} GRANT_REASON_FALPDBLGHJB=7 GRANT_REASON_FALPDBLGHJB value
     * @property {number} GRANT_REASON_GAMADMGGMBC=8 GRANT_REASON_GAMADMGGMBC value
     */
    TrialAvatarGrantRecord.GrantReason = (function () {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GRANT_REASON_INVALID"] = 0;
        values[valuesById[1] = "GRANT_REASON_BY_QUEST"] = 1;
        values[valuesById[2] = "GRANT_REASON_BY_TRIAL_AVATAR_ACTIVITY"] = 2;
        values[valuesById[3] = "GRANT_REASON_BY_DUNGEON_ELEMENT_CHALLENGE"] = 3;
        values[valuesById[4] = "GRANT_REASON_BY_MIST_TRIAL_ACTIVITY"] = 4;
        values[valuesById[5] = "GRANT_REASON_BY_SUMO_ACTIVITY"] = 5;
        values[valuesById[6] = "GRANT_REASON_ELPMDIEIOHP"] = 6;
        values[valuesById[7] = "GRANT_REASON_FALPDBLGHJB"] = 7;
        values[valuesById[8] = "GRANT_REASON_GAMADMGGMBC"] = 8;
        return values;
    })();

    return TrialAvatarGrantRecord;
})();

export const AvatarTeam = $root.AvatarTeam = (() => {

    /**
     * Properties of an AvatarTeam.
     * @exports IAvatarTeam
     * @interface IAvatarTeam
     * @property {Array.<Long>|null} [avatarGuidList] AvatarTeam avatarGuidList
     * @property {string|null} [teamName] AvatarTeam teamName
     */

    /**
     * Constructs a new AvatarTeam.
     * @exports AvatarTeam
     * @classdesc Represents an AvatarTeam.
     * @implements IAvatarTeam
     * @constructor
     * @param {IAvatarTeam=} [properties] Properties to set
     */
    function AvatarTeam(properties) {
        this.avatarGuidList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AvatarTeam avatarGuidList.
     * @member {Array.<Long>} avatarGuidList
     * @memberof AvatarTeam
     * @instance
     */
    AvatarTeam.prototype.avatarGuidList = $util.emptyArray;

    /**
     * AvatarTeam teamName.
     * @member {string} teamName
     * @memberof AvatarTeam
     * @instance
     */
    AvatarTeam.prototype.teamName = "";

    /**
     * Creates a new AvatarTeam instance using the specified properties.
     * @function create
     * @memberof AvatarTeam
     * @static
     * @param {IAvatarTeam=} [properties] Properties to set
     * @returns {AvatarTeam} AvatarTeam instance
     */
    AvatarTeam.create = function create(properties) {
        return new AvatarTeam(properties);
    };

    /**
     * Encodes the specified AvatarTeam message. Does not implicitly {@link AvatarTeam.verify|verify} messages.
     * @function encode
     * @memberof AvatarTeam
     * @static
     * @param {IAvatarTeam} message AvatarTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarTeam.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.avatarGuidList != null && message.avatarGuidList.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (let i = 0; i < message.avatarGuidList.length; ++i)
                writer.uint64(message.avatarGuidList[i]);
            writer.ldelim();
        }
        if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.teamName);
        return writer;
    };

    /**
     * Encodes the specified AvatarTeam message, length delimited. Does not implicitly {@link AvatarTeam.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AvatarTeam
     * @static
     * @param {IAvatarTeam} message AvatarTeam message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AvatarTeam.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AvatarTeam message from the specified reader or buffer.
     * @function decode
     * @memberof AvatarTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AvatarTeam} AvatarTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarTeam.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AvatarTeam();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (!(message.avatarGuidList && message.avatarGuidList.length))
                        message.avatarGuidList = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.avatarGuidList.push(reader.uint64());
                    } else
                        message.avatarGuidList.push(reader.uint64());
                    break;
                case 2:
                    message.teamName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an AvatarTeam message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AvatarTeam
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AvatarTeam} AvatarTeam
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AvatarTeam.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AvatarTeam message.
     * @function verify
     * @memberof AvatarTeam
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AvatarTeam.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.avatarGuidList != null && message.hasOwnProperty("avatarGuidList")) {
            if (!Array.isArray(message.avatarGuidList))
                return "avatarGuidList: array expected";
            for (let i = 0; i < message.avatarGuidList.length; ++i)
                if (!$util.isInteger(message.avatarGuidList[i]) && !(message.avatarGuidList[i] && $util.isInteger(message.avatarGuidList[i].low) && $util.isInteger(message.avatarGuidList[i].high)))
                    return "avatarGuidList: integer|Long[] expected";
        }
        if (message.teamName != null && message.hasOwnProperty("teamName"))
            if (!$util.isString(message.teamName))
                return "teamName: string expected";
        return null;
    };

    /**
     * Creates an AvatarTeam message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AvatarTeam
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AvatarTeam} AvatarTeam
     */
    AvatarTeam.fromObject = function fromObject(object) {
        if (object instanceof $root.AvatarTeam)
            return object;
        let message = new $root.AvatarTeam();
        if (object.avatarGuidList) {
            if (!Array.isArray(object.avatarGuidList))
                throw TypeError(".AvatarTeam.avatarGuidList: array expected");
            message.avatarGuidList = [];
            for (let i = 0; i < object.avatarGuidList.length; ++i)
                if ($util.Long)
                    (message.avatarGuidList[i] = $util.Long.fromValue(object.avatarGuidList[i])).unsigned = true;
                else if (typeof object.avatarGuidList[i] === "string")
                    message.avatarGuidList[i] = parseInt(object.avatarGuidList[i], 10);
                else if (typeof object.avatarGuidList[i] === "number")
                    message.avatarGuidList[i] = object.avatarGuidList[i];
                else if (typeof object.avatarGuidList[i] === "object")
                    message.avatarGuidList[i] = new $util.LongBits(object.avatarGuidList[i].low >>> 0, object.avatarGuidList[i].high >>> 0).toNumber(true);
        }
        if (object.teamName != null)
            message.teamName = String(object.teamName);
        return message;
    };

    /**
     * Creates a plain object from an AvatarTeam message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AvatarTeam
     * @static
     * @param {AvatarTeam} message AvatarTeam
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AvatarTeam.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.avatarGuidList = [];
        if (options.defaults)
            object.teamName = "";
        if (message.avatarGuidList && message.avatarGuidList.length) {
            object.avatarGuidList = [];
            for (let j = 0; j < message.avatarGuidList.length; ++j)
                if (typeof message.avatarGuidList[j] === "number")
                    object.avatarGuidList[j] = options.longs === String ? String(message.avatarGuidList[j]) : message.avatarGuidList[j];
                else
                    object.avatarGuidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.avatarGuidList[j]) : options.longs === Number ? new $util.LongBits(message.avatarGuidList[j].low >>> 0, message.avatarGuidList[j].high >>> 0).toNumber(true) : message.avatarGuidList[j];
        }
        if (message.teamName != null && message.hasOwnProperty("teamName"))
            object.teamName = message.teamName;
        return object;
    };

    /**
     * Converts this AvatarTeam to JSON.
     * @function toJSON
     * @memberof AvatarTeam
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AvatarTeam.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AvatarTeam;
})();

export const GetPlayerTokenRsp = $root.GetPlayerTokenRsp = (() => {

    /**
     * Properties of a GetPlayerTokenRsp.
     * @exports IGetPlayerTokenRsp
     * @interface IGetPlayerTokenRsp
     * @property {number|null} [retcode] GetPlayerTokenRsp retcode
     * @property {string|null} [msg] GetPlayerTokenRsp msg
     * @property {number|null} [uid] GetPlayerTokenRsp uid
     * @property {string|null} [token] GetPlayerTokenRsp token
     * @property {number|null} [blackUidEndTime] GetPlayerTokenRsp blackUidEndTime
     * @property {number|null} [accountType] GetPlayerTokenRsp accountType
     * @property {string|null} [accountUid] GetPlayerTokenRsp accountUid
     * @property {boolean|null} [isProficientPlayer] GetPlayerTokenRsp isProficientPlayer
     * @property {string|null} [secretKey] GetPlayerTokenRsp secretKey
     * @property {number|null} [gmUid] GetPlayerTokenRsp gmUid
     * @property {Long|null} [secretKeySeed] GetPlayerTokenRsp secretKeySeed
     * @property {Uint8Array|null} [securityCmdBuffer] GetPlayerTokenRsp securityCmdBuffer
     * @property {number|null} [platformType] GetPlayerTokenRsp platformType
     * @property {Uint8Array|null} [extraBinData] GetPlayerTokenRsp extraBinData
     * @property {boolean|null} [isGuest] GetPlayerTokenRsp isGuest
     * @property {number|null} [channelId] GetPlayerTokenRsp channelId
     * @property {number|null} [subChannelId] GetPlayerTokenRsp subChannelId
     * @property {number|null} [tag] GetPlayerTokenRsp tag
     * @property {string|null} [countryCode] GetPlayerTokenRsp countryCode
     * @property {boolean|null} [isLoginWhiteList] GetPlayerTokenRsp isLoginWhiteList
     * @property {string|null} [psnId] GetPlayerTokenRsp psnId
     * @property {string|null} [clientVersionRandomKey] GetPlayerTokenRsp clientVersionRandomKey
     * @property {number|null} [regPlatform] GetPlayerTokenRsp regPlatform
     * @property {string|null} [clientIpStr] GetPlayerTokenRsp clientIpStr
     * @property {string|null} [birthday] GetPlayerTokenRsp birthday
     * @property {number|null} [NNCIBOLDIAI] GetPlayerTokenRsp NNCIBOLDIAI
     * @property {boolean|null} [FNECFLEAKKO] GetPlayerTokenRsp FNECFLEAKKO
     */

    /**
     * Constructs a new GetPlayerTokenRsp.
     * @exports GetPlayerTokenRsp
     * @classdesc Represents a GetPlayerTokenRsp.
     * @implements IGetPlayerTokenRsp
     * @constructor
     * @param {IGetPlayerTokenRsp=} [properties] Properties to set
     */
    function GetPlayerTokenRsp(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetPlayerTokenRsp retcode.
     * @member {number} retcode
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.retcode = 0;

    /**
     * GetPlayerTokenRsp msg.
     * @member {string} msg
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.msg = "";

    /**
     * GetPlayerTokenRsp uid.
     * @member {number} uid
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.uid = 0;

    /**
     * GetPlayerTokenRsp token.
     * @member {string} token
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.token = "";

    /**
     * GetPlayerTokenRsp blackUidEndTime.
     * @member {number} blackUidEndTime
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.blackUidEndTime = 0;

    /**
     * GetPlayerTokenRsp accountType.
     * @member {number} accountType
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.accountType = 0;

    /**
     * GetPlayerTokenRsp accountUid.
     * @member {string} accountUid
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.accountUid = "";

    /**
     * GetPlayerTokenRsp isProficientPlayer.
     * @member {boolean} isProficientPlayer
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.isProficientPlayer = false;

    /**
     * GetPlayerTokenRsp secretKey.
     * @member {string} secretKey
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.secretKey = "";

    /**
     * GetPlayerTokenRsp gmUid.
     * @member {number} gmUid
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.gmUid = 0;

    /**
     * GetPlayerTokenRsp secretKeySeed.
     * @member {Long} secretKeySeed
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.secretKeySeed = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * GetPlayerTokenRsp securityCmdBuffer.
     * @member {Uint8Array} securityCmdBuffer
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.securityCmdBuffer = $util.newBuffer([]);

    /**
     * GetPlayerTokenRsp platformType.
     * @member {number} platformType
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.platformType = 0;

    /**
     * GetPlayerTokenRsp extraBinData.
     * @member {Uint8Array} extraBinData
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.extraBinData = $util.newBuffer([]);

    /**
     * GetPlayerTokenRsp isGuest.
     * @member {boolean} isGuest
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.isGuest = false;

    /**
     * GetPlayerTokenRsp channelId.
     * @member {number} channelId
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.channelId = 0;

    /**
     * GetPlayerTokenRsp subChannelId.
     * @member {number} subChannelId
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.subChannelId = 0;

    /**
     * GetPlayerTokenRsp tag.
     * @member {number} tag
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.tag = 0;

    /**
     * GetPlayerTokenRsp countryCode.
     * @member {string} countryCode
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.countryCode = "";

    /**
     * GetPlayerTokenRsp isLoginWhiteList.
     * @member {boolean} isLoginWhiteList
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.isLoginWhiteList = false;

    /**
     * GetPlayerTokenRsp psnId.
     * @member {string} psnId
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.psnId = "";

    /**
     * GetPlayerTokenRsp clientVersionRandomKey.
     * @member {string} clientVersionRandomKey
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.clientVersionRandomKey = "";

    /**
     * GetPlayerTokenRsp regPlatform.
     * @member {number} regPlatform
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.regPlatform = 0;

    /**
     * GetPlayerTokenRsp clientIpStr.
     * @member {string} clientIpStr
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.clientIpStr = "";

    /**
     * GetPlayerTokenRsp birthday.
     * @member {string} birthday
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.birthday = "";

    /**
     * GetPlayerTokenRsp NNCIBOLDIAI.
     * @member {number} NNCIBOLDIAI
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.NNCIBOLDIAI = 0;

    /**
     * GetPlayerTokenRsp FNECFLEAKKO.
     * @member {boolean} FNECFLEAKKO
     * @memberof GetPlayerTokenRsp
     * @instance
     */
    GetPlayerTokenRsp.prototype.FNECFLEAKKO = false;

    /**
     * Creates a new GetPlayerTokenRsp instance using the specified properties.
     * @function create
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {IGetPlayerTokenRsp=} [properties] Properties to set
     * @returns {GetPlayerTokenRsp} GetPlayerTokenRsp instance
     */
    GetPlayerTokenRsp.create = function create(properties) {
        return new GetPlayerTokenRsp(properties);
    };

    /**
     * Encodes the specified GetPlayerTokenRsp message. Does not implicitly {@link GetPlayerTokenRsp.verify|verify} messages.
     * @function encode
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {IGetPlayerTokenRsp} message GetPlayerTokenRsp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetPlayerTokenRsp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.uid);
        if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.platformType);
        if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.accountUid);
        if (message.isProficientPlayer != null && Object.hasOwnProperty.call(message, "isProficientPlayer"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isProficientPlayer);
        if (message.securityCmdBuffer != null && Object.hasOwnProperty.call(message, "securityCmdBuffer"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.securityCmdBuffer);
        if (message.retcode != null && Object.hasOwnProperty.call(message, "retcode"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.retcode);
        if (message.extraBinData != null && Object.hasOwnProperty.call(message, "extraBinData"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.extraBinData);
        if (message.isGuest != null && Object.hasOwnProperty.call(message, "isGuest"))
            writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isGuest);
        if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.msg);
        if (message.secretKeySeed != null && Object.hasOwnProperty.call(message, "secretKeySeed"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.secretKeySeed);
        if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
            writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.accountType);
        if (message.secretKey != null && Object.hasOwnProperty.call(message, "secretKey"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.secretKey);
        if (message.gmUid != null && Object.hasOwnProperty.call(message, "gmUid"))
            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.gmUid);
        if (message.blackUidEndTime != null && Object.hasOwnProperty.call(message, "blackUidEndTime"))
            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.blackUidEndTime);
        if (message.psnId != null && Object.hasOwnProperty.call(message, "psnId"))
            writer.uint32(/* id 245, wireType 2 =*/1962).string(message.psnId);
        if (message.regPlatform != null && Object.hasOwnProperty.call(message, "regPlatform"))
            writer.uint32(/* id 633, wireType 0 =*/5064).uint32(message.regPlatform);
        if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
            writer.uint32(/* id 739, wireType 2 =*/5914).string(message.countryCode);
        if (message.isLoginWhiteList != null && Object.hasOwnProperty.call(message, "isLoginWhiteList"))
            writer.uint32(/* id 977, wireType 0 =*/7816).bool(message.isLoginWhiteList);
        if (message.birthday != null && Object.hasOwnProperty.call(message, "birthday"))
            writer.uint32(/* id 1109, wireType 2 =*/8874).string(message.birthday);
        if (message.clientIpStr != null && Object.hasOwnProperty.call(message, "clientIpStr"))
            writer.uint32(/* id 1238, wireType 2 =*/9906).string(message.clientIpStr);
        if (message.clientVersionRandomKey != null && Object.hasOwnProperty.call(message, "clientVersionRandomKey"))
            writer.uint32(/* id 1387, wireType 2 =*/11098).string(message.clientVersionRandomKey);
        if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
            writer.uint32(/* id 1614, wireType 0 =*/12912).uint32(message.channelId);
        if (message.FNECFLEAKKO != null && Object.hasOwnProperty.call(message, "FNECFLEAKKO"))
            writer.uint32(/* id 1679, wireType 0 =*/13432).bool(message.FNECFLEAKKO);
        if (message.NNCIBOLDIAI != null && Object.hasOwnProperty.call(message, "NNCIBOLDIAI"))
            writer.uint32(/* id 1728, wireType 0 =*/13824).uint32(message.NNCIBOLDIAI);
        if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
            writer.uint32(/* id 1855, wireType 0 =*/14840).uint32(message.tag);
        if (message.subChannelId != null && Object.hasOwnProperty.call(message, "subChannelId"))
            writer.uint32(/* id 1911, wireType 0 =*/15288).uint32(message.subChannelId);
        return writer;
    };

    /**
     * Encodes the specified GetPlayerTokenRsp message, length delimited. Does not implicitly {@link GetPlayerTokenRsp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {IGetPlayerTokenRsp} message GetPlayerTokenRsp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetPlayerTokenRsp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetPlayerTokenRsp message from the specified reader or buffer.
     * @function decode
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetPlayerTokenRsp} GetPlayerTokenRsp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetPlayerTokenRsp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetPlayerTokenRsp();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 7:
                    message.retcode = reader.int32();
                    break;
                case 10:
                    message.msg = reader.string();
                    break;
                case 2:
                    message.uid = reader.uint32();
                    break;
                case 1:
                    message.token = reader.string();
                    break;
                case 15:
                    message.blackUidEndTime = reader.uint32();
                    break;
                case 12:
                    message.accountType = reader.uint32();
                    break;
                case 4:
                    message.accountUid = reader.string();
                    break;
                case 5:
                    message.isProficientPlayer = reader.bool();
                    break;
                case 13:
                    message.secretKey = reader.string();
                    break;
                case 14:
                    message.gmUid = reader.uint32();
                    break;
                case 11:
                    message.secretKeySeed = reader.uint64();
                    break;
                case 6:
                    message.securityCmdBuffer = reader.bytes();
                    break;
                case 3:
                    message.platformType = reader.uint32();
                    break;
                case 8:
                    message.extraBinData = reader.bytes();
                    break;
                case 9:
                    message.isGuest = reader.bool();
                    break;
                case 1614:
                    message.channelId = reader.uint32();
                    break;
                case 1911:
                    message.subChannelId = reader.uint32();
                    break;
                case 1855:
                    message.tag = reader.uint32();
                    break;
                case 739:
                    message.countryCode = reader.string();
                    break;
                case 977:
                    message.isLoginWhiteList = reader.bool();
                    break;
                case 245:
                    message.psnId = reader.string();
                    break;
                case 1387:
                    message.clientVersionRandomKey = reader.string();
                    break;
                case 633:
                    message.regPlatform = reader.uint32();
                    break;
                case 1238:
                    message.clientIpStr = reader.string();
                    break;
                case 1109:
                    message.birthday = reader.string();
                    break;
                case 1728:
                    message.NNCIBOLDIAI = reader.uint32();
                    break;
                case 1679:
                    message.FNECFLEAKKO = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetPlayerTokenRsp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetPlayerTokenRsp} GetPlayerTokenRsp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetPlayerTokenRsp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetPlayerTokenRsp message.
     * @function verify
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetPlayerTokenRsp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.retcode != null && message.hasOwnProperty("retcode"))
            if (!$util.isInteger(message.retcode))
                return "retcode: integer expected";
        if (message.msg != null && message.hasOwnProperty("msg"))
            if (!$util.isString(message.msg))
                return "msg: string expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid))
                return "uid: integer expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.blackUidEndTime != null && message.hasOwnProperty("blackUidEndTime"))
            if (!$util.isInteger(message.blackUidEndTime))
                return "blackUidEndTime: integer expected";
        if (message.accountType != null && message.hasOwnProperty("accountType"))
            if (!$util.isInteger(message.accountType))
                return "accountType: integer expected";
        if (message.accountUid != null && message.hasOwnProperty("accountUid"))
            if (!$util.isString(message.accountUid))
                return "accountUid: string expected";
        if (message.isProficientPlayer != null && message.hasOwnProperty("isProficientPlayer"))
            if (typeof message.isProficientPlayer !== "boolean")
                return "isProficientPlayer: boolean expected";
        if (message.secretKey != null && message.hasOwnProperty("secretKey"))
            if (!$util.isString(message.secretKey))
                return "secretKey: string expected";
        if (message.gmUid != null && message.hasOwnProperty("gmUid"))
            if (!$util.isInteger(message.gmUid))
                return "gmUid: integer expected";
        if (message.secretKeySeed != null && message.hasOwnProperty("secretKeySeed"))
            if (!$util.isInteger(message.secretKeySeed) && !(message.secretKeySeed && $util.isInteger(message.secretKeySeed.low) && $util.isInteger(message.secretKeySeed.high)))
                return "secretKeySeed: integer|Long expected";
        if (message.securityCmdBuffer != null && message.hasOwnProperty("securityCmdBuffer"))
            if (!(message.securityCmdBuffer && typeof message.securityCmdBuffer.length === "number" || $util.isString(message.securityCmdBuffer)))
                return "securityCmdBuffer: buffer expected";
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            if (!$util.isInteger(message.platformType))
                return "platformType: integer expected";
        if (message.extraBinData != null && message.hasOwnProperty("extraBinData"))
            if (!(message.extraBinData && typeof message.extraBinData.length === "number" || $util.isString(message.extraBinData)))
                return "extraBinData: buffer expected";
        if (message.isGuest != null && message.hasOwnProperty("isGuest"))
            if (typeof message.isGuest !== "boolean")
                return "isGuest: boolean expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!$util.isInteger(message.channelId))
                return "channelId: integer expected";
        if (message.subChannelId != null && message.hasOwnProperty("subChannelId"))
            if (!$util.isInteger(message.subChannelId))
                return "subChannelId: integer expected";
        if (message.tag != null && message.hasOwnProperty("tag"))
            if (!$util.isInteger(message.tag))
                return "tag: integer expected";
        if (message.countryCode != null && message.hasOwnProperty("countryCode"))
            if (!$util.isString(message.countryCode))
                return "countryCode: string expected";
        if (message.isLoginWhiteList != null && message.hasOwnProperty("isLoginWhiteList"))
            if (typeof message.isLoginWhiteList !== "boolean")
                return "isLoginWhiteList: boolean expected";
        if (message.psnId != null && message.hasOwnProperty("psnId"))
            if (!$util.isString(message.psnId))
                return "psnId: string expected";
        if (message.clientVersionRandomKey != null && message.hasOwnProperty("clientVersionRandomKey"))
            if (!$util.isString(message.clientVersionRandomKey))
                return "clientVersionRandomKey: string expected";
        if (message.regPlatform != null && message.hasOwnProperty("regPlatform"))
            if (!$util.isInteger(message.regPlatform))
                return "regPlatform: integer expected";
        if (message.clientIpStr != null && message.hasOwnProperty("clientIpStr"))
            if (!$util.isString(message.clientIpStr))
                return "clientIpStr: string expected";
        if (message.birthday != null && message.hasOwnProperty("birthday"))
            if (!$util.isString(message.birthday))
                return "birthday: string expected";
        if (message.NNCIBOLDIAI != null && message.hasOwnProperty("NNCIBOLDIAI"))
            if (!$util.isInteger(message.NNCIBOLDIAI))
                return "NNCIBOLDIAI: integer expected";
        if (message.FNECFLEAKKO != null && message.hasOwnProperty("FNECFLEAKKO"))
            if (typeof message.FNECFLEAKKO !== "boolean")
                return "FNECFLEAKKO: boolean expected";
        return null;
    };

    /**
     * Creates a GetPlayerTokenRsp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetPlayerTokenRsp} GetPlayerTokenRsp
     */
    GetPlayerTokenRsp.fromObject = function fromObject(object) {
        if (object instanceof $root.GetPlayerTokenRsp)
            return object;
        let message = new $root.GetPlayerTokenRsp();
        if (object.retcode != null)
            message.retcode = object.retcode | 0;
        if (object.msg != null)
            message.msg = String(object.msg);
        if (object.uid != null)
            message.uid = object.uid >>> 0;
        if (object.token != null)
            message.token = String(object.token);
        if (object.blackUidEndTime != null)
            message.blackUidEndTime = object.blackUidEndTime >>> 0;
        if (object.accountType != null)
            message.accountType = object.accountType >>> 0;
        if (object.accountUid != null)
            message.accountUid = String(object.accountUid);
        if (object.isProficientPlayer != null)
            message.isProficientPlayer = Boolean(object.isProficientPlayer);
        if (object.secretKey != null)
            message.secretKey = String(object.secretKey);
        if (object.gmUid != null)
            message.gmUid = object.gmUid >>> 0;
        if (object.secretKeySeed != null)
            if ($util.Long)
                (message.secretKeySeed = $util.Long.fromValue(object.secretKeySeed)).unsigned = true;
            else if (typeof object.secretKeySeed === "string")
                message.secretKeySeed = parseInt(object.secretKeySeed, 10);
            else if (typeof object.secretKeySeed === "number")
                message.secretKeySeed = object.secretKeySeed;
            else if (typeof object.secretKeySeed === "object")
                message.secretKeySeed = new $util.LongBits(object.secretKeySeed.low >>> 0, object.secretKeySeed.high >>> 0).toNumber(true);
        if (object.securityCmdBuffer != null)
            if (typeof object.securityCmdBuffer === "string")
                $util.base64.decode(object.securityCmdBuffer, message.securityCmdBuffer = $util.newBuffer($util.base64.length(object.securityCmdBuffer)), 0);
            else if (object.securityCmdBuffer.length)
                message.securityCmdBuffer = object.securityCmdBuffer;
        if (object.platformType != null)
            message.platformType = object.platformType >>> 0;
        if (object.extraBinData != null)
            if (typeof object.extraBinData === "string")
                $util.base64.decode(object.extraBinData, message.extraBinData = $util.newBuffer($util.base64.length(object.extraBinData)), 0);
            else if (object.extraBinData.length)
                message.extraBinData = object.extraBinData;
        if (object.isGuest != null)
            message.isGuest = Boolean(object.isGuest);
        if (object.channelId != null)
            message.channelId = object.channelId >>> 0;
        if (object.subChannelId != null)
            message.subChannelId = object.subChannelId >>> 0;
        if (object.tag != null)
            message.tag = object.tag >>> 0;
        if (object.countryCode != null)
            message.countryCode = String(object.countryCode);
        if (object.isLoginWhiteList != null)
            message.isLoginWhiteList = Boolean(object.isLoginWhiteList);
        if (object.psnId != null)
            message.psnId = String(object.psnId);
        if (object.clientVersionRandomKey != null)
            message.clientVersionRandomKey = String(object.clientVersionRandomKey);
        if (object.regPlatform != null)
            message.regPlatform = object.regPlatform >>> 0;
        if (object.clientIpStr != null)
            message.clientIpStr = String(object.clientIpStr);
        if (object.birthday != null)
            message.birthday = String(object.birthday);
        if (object.NNCIBOLDIAI != null)
            message.NNCIBOLDIAI = object.NNCIBOLDIAI >>> 0;
        if (object.FNECFLEAKKO != null)
            message.FNECFLEAKKO = Boolean(object.FNECFLEAKKO);
        return message;
    };

    /**
     * Creates a plain object from a GetPlayerTokenRsp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetPlayerTokenRsp
     * @static
     * @param {GetPlayerTokenRsp} message GetPlayerTokenRsp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetPlayerTokenRsp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.token = "";
            object.uid = 0;
            object.platformType = 0;
            object.accountUid = "";
            object.isProficientPlayer = false;
            if (options.bytes === String)
                object.securityCmdBuffer = "";
            else {
                object.securityCmdBuffer = [];
                if (options.bytes !== Array)
                    object.securityCmdBuffer = $util.newBuffer(object.securityCmdBuffer);
            }
            object.retcode = 0;
            if (options.bytes === String)
                object.extraBinData = "";
            else {
                object.extraBinData = [];
                if (options.bytes !== Array)
                    object.extraBinData = $util.newBuffer(object.extraBinData);
            }
            object.isGuest = false;
            object.msg = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.secretKeySeed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.secretKeySeed = options.longs === String ? "0" : 0;
            object.accountType = 0;
            object.secretKey = "";
            object.gmUid = 0;
            object.blackUidEndTime = 0;
            object.psnId = "";
            object.regPlatform = 0;
            object.countryCode = "";
            object.isLoginWhiteList = false;
            object.birthday = "";
            object.clientIpStr = "";
            object.clientVersionRandomKey = "";
            object.channelId = 0;
            object.FNECFLEAKKO = false;
            object.NNCIBOLDIAI = 0;
            object.tag = 0;
            object.subChannelId = 0;
        }
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.uid != null && message.hasOwnProperty("uid"))
            object.uid = message.uid;
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            object.platformType = message.platformType;
        if (message.accountUid != null && message.hasOwnProperty("accountUid"))
            object.accountUid = message.accountUid;
        if (message.isProficientPlayer != null && message.hasOwnProperty("isProficientPlayer"))
            object.isProficientPlayer = message.isProficientPlayer;
        if (message.securityCmdBuffer != null && message.hasOwnProperty("securityCmdBuffer"))
            object.securityCmdBuffer = options.bytes === String ? $util.base64.encode(message.securityCmdBuffer, 0, message.securityCmdBuffer.length) : options.bytes === Array ? Array.prototype.slice.call(message.securityCmdBuffer) : message.securityCmdBuffer;
        if (message.retcode != null && message.hasOwnProperty("retcode"))
            object.retcode = message.retcode;
        if (message.extraBinData != null && message.hasOwnProperty("extraBinData"))
            object.extraBinData = options.bytes === String ? $util.base64.encode(message.extraBinData, 0, message.extraBinData.length) : options.bytes === Array ? Array.prototype.slice.call(message.extraBinData) : message.extraBinData;
        if (message.isGuest != null && message.hasOwnProperty("isGuest"))
            object.isGuest = message.isGuest;
        if (message.msg != null && message.hasOwnProperty("msg"))
            object.msg = message.msg;
        if (message.secretKeySeed != null && message.hasOwnProperty("secretKeySeed"))
            if (typeof message.secretKeySeed === "number")
                object.secretKeySeed = options.longs === String ? String(message.secretKeySeed) : message.secretKeySeed;
            else
                object.secretKeySeed = options.longs === String ? $util.Long.prototype.toString.call(message.secretKeySeed) : options.longs === Number ? new $util.LongBits(message.secretKeySeed.low >>> 0, message.secretKeySeed.high >>> 0).toNumber(true) : message.secretKeySeed;
        if (message.accountType != null && message.hasOwnProperty("accountType"))
            object.accountType = message.accountType;
        if (message.secretKey != null && message.hasOwnProperty("secretKey"))
            object.secretKey = message.secretKey;
        if (message.gmUid != null && message.hasOwnProperty("gmUid"))
            object.gmUid = message.gmUid;
        if (message.blackUidEndTime != null && message.hasOwnProperty("blackUidEndTime"))
            object.blackUidEndTime = message.blackUidEndTime;
        if (message.psnId != null && message.hasOwnProperty("psnId"))
            object.psnId = message.psnId;
        if (message.regPlatform != null && message.hasOwnProperty("regPlatform"))
            object.regPlatform = message.regPlatform;
        if (message.countryCode != null && message.hasOwnProperty("countryCode"))
            object.countryCode = message.countryCode;
        if (message.isLoginWhiteList != null && message.hasOwnProperty("isLoginWhiteList"))
            object.isLoginWhiteList = message.isLoginWhiteList;
        if (message.birthday != null && message.hasOwnProperty("birthday"))
            object.birthday = message.birthday;
        if (message.clientIpStr != null && message.hasOwnProperty("clientIpStr"))
            object.clientIpStr = message.clientIpStr;
        if (message.clientVersionRandomKey != null && message.hasOwnProperty("clientVersionRandomKey"))
            object.clientVersionRandomKey = message.clientVersionRandomKey;
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = message.channelId;
        if (message.FNECFLEAKKO != null && message.hasOwnProperty("FNECFLEAKKO"))
            object.FNECFLEAKKO = message.FNECFLEAKKO;
        if (message.NNCIBOLDIAI != null && message.hasOwnProperty("NNCIBOLDIAI"))
            object.NNCIBOLDIAI = message.NNCIBOLDIAI;
        if (message.tag != null && message.hasOwnProperty("tag"))
            object.tag = message.tag;
        if (message.subChannelId != null && message.hasOwnProperty("subChannelId"))
            object.subChannelId = message.subChannelId;
        return object;
    };

    /**
     * Converts this GetPlayerTokenRsp to JSON.
     * @function toJSON
     * @memberof GetPlayerTokenRsp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetPlayerTokenRsp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetPlayerTokenRsp;
})();

export const PlayerStoreNotify = $root.PlayerStoreNotify = (() => {

    /**
     * Properties of a PlayerStoreNotify.
     * @exports IPlayerStoreNotify
     * @interface IPlayerStoreNotify
     * @property {StoreType|null} [storeType] PlayerStoreNotify storeType
     * @property {Array.<IItem>|null} [itemList] PlayerStoreNotify itemList
     * @property {number|null} [weightLimit] PlayerStoreNotify weightLimit
     */

    /**
     * Constructs a new PlayerStoreNotify.
     * @exports PlayerStoreNotify
     * @classdesc Represents a PlayerStoreNotify.
     * @implements IPlayerStoreNotify
     * @constructor
     * @param {IPlayerStoreNotify=} [properties] Properties to set
     */
    function PlayerStoreNotify(properties) {
        this.itemList = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerStoreNotify storeType.
     * @member {StoreType} storeType
     * @memberof PlayerStoreNotify
     * @instance
     */
    PlayerStoreNotify.prototype.storeType = 0;

    /**
     * PlayerStoreNotify itemList.
     * @member {Array.<IItem>} itemList
     * @memberof PlayerStoreNotify
     * @instance
     */
    PlayerStoreNotify.prototype.itemList = $util.emptyArray;

    /**
     * PlayerStoreNotify weightLimit.
     * @member {number} weightLimit
     * @memberof PlayerStoreNotify
     * @instance
     */
    PlayerStoreNotify.prototype.weightLimit = 0;

    /**
     * Creates a new PlayerStoreNotify instance using the specified properties.
     * @function create
     * @memberof PlayerStoreNotify
     * @static
     * @param {IPlayerStoreNotify=} [properties] Properties to set
     * @returns {PlayerStoreNotify} PlayerStoreNotify instance
     */
    PlayerStoreNotify.create = function create(properties) {
        return new PlayerStoreNotify(properties);
    };

    /**
     * Encodes the specified PlayerStoreNotify message. Does not implicitly {@link PlayerStoreNotify.verify|verify} messages.
     * @function encode
     * @memberof PlayerStoreNotify
     * @static
     * @param {IPlayerStoreNotify} message PlayerStoreNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerStoreNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.itemList != null && message.itemList.length)
            for (let i = 0; i < message.itemList.length; ++i)
                $root.Item.encode(message.itemList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.storeType != null && Object.hasOwnProperty.call(message, "storeType"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.storeType);
        if (message.weightLimit != null && Object.hasOwnProperty.call(message, "weightLimit"))
            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.weightLimit);
        return writer;
    };

    /**
     * Encodes the specified PlayerStoreNotify message, length delimited. Does not implicitly {@link PlayerStoreNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerStoreNotify
     * @static
     * @param {IPlayerStoreNotify} message PlayerStoreNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerStoreNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerStoreNotify message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerStoreNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerStoreNotify} PlayerStoreNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerStoreNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerStoreNotify();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
                case 4:
                    message.storeType = reader.int32();
                    break;
                case 3:
                    if (!(message.itemList && message.itemList.length))
                        message.itemList = [];
                    message.itemList.push($root.Item.decode(reader, reader.uint32()));
                    break;
                case 15:
                    message.weightLimit = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerStoreNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerStoreNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerStoreNotify} PlayerStoreNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerStoreNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerStoreNotify message.
     * @function verify
     * @memberof PlayerStoreNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerStoreNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.storeType != null && message.hasOwnProperty("storeType"))
            switch (message.storeType) {
                default:
                    return "storeType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
            }
        if (message.itemList != null && message.hasOwnProperty("itemList")) {
            if (!Array.isArray(message.itemList))
                return "itemList: array expected";
            for (let i = 0; i < message.itemList.length; ++i) {
                let error = $root.Item.verify(message.itemList[i]);
                if (error)
                    return "itemList." + error;
            }
        }
        if (message.weightLimit != null && message.hasOwnProperty("weightLimit"))
            if (!$util.isInteger(message.weightLimit))
                return "weightLimit: integer expected";
        return null;
    };

    /**
     * Creates a PlayerStoreNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerStoreNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerStoreNotify} PlayerStoreNotify
     */
    PlayerStoreNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerStoreNotify)
            return object;
        let message = new $root.PlayerStoreNotify();
        switch (object.storeType) {
            case "STORE_TYPE_NONE":
            case 0:
                message.storeType = 0;
                break;
            case "STORE_TYPE_PACK":
            case 1:
                message.storeType = 1;
                break;
            case "STORE_TYPE_DEPOT":
            case 2:
                message.storeType = 2;
                break;
        }
        if (object.itemList) {
            if (!Array.isArray(object.itemList))
                throw TypeError(".PlayerStoreNotify.itemList: array expected");
            message.itemList = [];
            for (let i = 0; i < object.itemList.length; ++i) {
                if (typeof object.itemList[i] !== "object")
                    throw TypeError(".PlayerStoreNotify.itemList: object expected");
                message.itemList[i] = $root.Item.fromObject(object.itemList[i]);
            }
        }
        if (object.weightLimit != null)
            message.weightLimit = object.weightLimit >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayerStoreNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerStoreNotify
     * @static
     * @param {PlayerStoreNotify} message PlayerStoreNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerStoreNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.itemList = [];
        if (options.defaults) {
            object.storeType = options.enums === String ? "STORE_TYPE_NONE" : 0;
            object.weightLimit = 0;
        }
        if (message.itemList && message.itemList.length) {
            object.itemList = [];
            for (let j = 0; j < message.itemList.length; ++j)
                object.itemList[j] = $root.Item.toObject(message.itemList[j], options);
        }
        if (message.storeType != null && message.hasOwnProperty("storeType"))
            object.storeType = options.enums === String ? $root.StoreType[message.storeType] : message.storeType;
        if (message.weightLimit != null && message.hasOwnProperty("weightLimit"))
            object.weightLimit = message.weightLimit;
        return object;
    };

    /**
     * Converts this PlayerStoreNotify to JSON.
     * @function toJSON
     * @memberof PlayerStoreNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerStoreNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerStoreNotify;
})();

/**
 * StoreType enum.
 * @exports StoreType
 * @enum {number}
 * @property {number} STORE_TYPE_NONE=0 STORE_TYPE_NONE value
 * @property {number} STORE_TYPE_PACK=1 STORE_TYPE_PACK value
 * @property {number} STORE_TYPE_DEPOT=2 STORE_TYPE_DEPOT value
 */
export const StoreType = $root.StoreType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STORE_TYPE_NONE"] = 0;
    values[valuesById[1] = "STORE_TYPE_PACK"] = 1;
    values[valuesById[2] = "STORE_TYPE_DEPOT"] = 2;
    return values;
})();

export { $root as default };
