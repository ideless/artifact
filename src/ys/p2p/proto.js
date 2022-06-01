/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

import Long from "long";
$protobuf.util.Long = Long
$protobuf.configure()

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Equip = $root.Equip = (() => {

    /**
     * Properties of an Equip.
     * @exports IEquip
     * @interface IEquip
     * @property {IReliquary|null} [reliquary] Equip reliquary
     * @property {IWeapon|null} [weapon] Equip weapon
     * @property {boolean|null} [isLocked] Equip isLocked
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

    /**
     * Equip isLocked.
     * @member {boolean} isLocked
     * @memberof Equip
     * @instance
     */
    Equip.prototype.isLocked = false;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Equip Detail.
     * @member {"reliquary"|"weapon"|undefined} Detail
     * @memberof Equip
     * @instance
     */
    Object.defineProperty(Equip.prototype, "Detail", {
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
                case 1:
                    message.reliquary = $root.Reliquary.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.weapon = $root.Weapon.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.isLocked = reader.bool();
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
        if (message.reliquary != null && message.hasOwnProperty("reliquary")) {
            properties.Detail = 1;
            {
                let error = $root.Reliquary.verify(message.reliquary);
                if (error)
                    return "reliquary." + error;
            }
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            if (properties.Detail === 1)
                return "Detail: multiple values";
            properties.Detail = 1;
            {
                let error = $root.Weapon.verify(message.weapon);
                if (error)
                    return "weapon." + error;
            }
        }
        if (message.isLocked != null && message.hasOwnProperty("isLocked"))
            if (typeof message.isLocked !== "boolean")
                return "isLocked: boolean expected";
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
        if (object.isLocked != null)
            message.isLocked = Boolean(object.isLocked);
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
                object.Detail = "reliquary";
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            object.weapon = $root.Weapon.toObject(message.weapon, options);
            if (options.oneofs)
                object.Detail = "weapon";
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

    /**
     * CmdId enum.
     * @name GetPlayerTokenRsp.CmdId
     * @enum {number}
     * @property {number} NONE=0 NONE value
     * @property {number} ENET_CHANNEL_ID=0 ENET_CHANNEL_ID value
     * @property {number} ENET_IS_RELIABLE=1 ENET_IS_RELIABLE value
     * @property {number} CMD_ID=131 CMD_ID value
     */
    GetPlayerTokenRsp.CmdId = (function () {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values["ENET_CHANNEL_ID"] = 0;
        values[valuesById[1] = "ENET_IS_RELIABLE"] = 1;
        values[valuesById[131] = "CMD_ID"] = 131;
        return values;
    })();

    return GetPlayerTokenRsp;
})();

export const Item = $root.Item = (() => {

    /**
     * Properties of an Item.
     * @exports IItem
     * @interface IItem
     * @property {IMaterial|null} [material] Item material
     * @property {IEquip|null} [equip] Item equip
     * @property {IFurniture|null} [furniture] Item furniture
     * @property {number|null} [itemId] Item itemId
     * @property {Long|null} [guid] Item guid
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

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Item Detail.
     * @member {"material"|"equip"|"furniture"|undefined} Detail
     * @memberof Item
     * @instance
     */
    Object.defineProperty(Item.prototype, "Detail", {
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
                case 5:
                    message.material = $root.Material.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.equip = $root.Equip.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.furniture = $root.Furniture.decode(reader, reader.uint32());
                    break;
                case 1:
                    message.itemId = reader.uint32();
                    break;
                case 2:
                    message.guid = reader.uint64();
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
        if (message.material != null && message.hasOwnProperty("material")) {
            properties.Detail = 1;
            {
                let error = $root.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
        }
        if (message.equip != null && message.hasOwnProperty("equip")) {
            if (properties.Detail === 1)
                return "Detail: multiple values";
            properties.Detail = 1;
            {
                let error = $root.Equip.verify(message.equip);
                if (error)
                    return "equip." + error;
            }
        }
        if (message.furniture != null && message.hasOwnProperty("furniture")) {
            if (properties.Detail === 1)
                return "Detail: multiple values";
            properties.Detail = 1;
            {
                let error = $root.Furniture.verify(message.furniture);
                if (error)
                    return "furniture." + error;
            }
        }
        if (message.itemId != null && message.hasOwnProperty("itemId"))
            if (!$util.isInteger(message.itemId))
                return "itemId: integer expected";
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (!$util.isInteger(message.guid) && !(message.guid && $util.isInteger(message.guid.low) && $util.isInteger(message.guid.high)))
                return "guid: integer|Long expected";
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
                object.Detail = "material";
        }
        if (message.equip != null && message.hasOwnProperty("equip")) {
            object.equip = $root.Equip.toObject(message.equip, options);
            if (options.oneofs)
                object.Detail = "equip";
        }
        if (message.furniture != null && message.hasOwnProperty("furniture")) {
            object.furniture = $root.Furniture.toObject(message.furniture, options);
            if (options.oneofs)
                object.Detail = "furniture";
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
     * @property {MaterialDeleteInfo.ICountDownDelete|null} [countDownDelete] MaterialDeleteInfo countDownDelete
     * @property {MaterialDeleteInfo.IDateTimeDelete|null} [dateDelete] MaterialDeleteInfo dateDelete
     * @property {MaterialDeleteInfo.IDelayWeekCountDownDelete|null} [delayWeekCountDownDelete] MaterialDeleteInfo delayWeekCountDownDelete
     * @property {boolean|null} [hasDeleteConfig] MaterialDeleteInfo hasDeleteConfig
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

    /**
     * MaterialDeleteInfo hasDeleteConfig.
     * @member {boolean} hasDeleteConfig
     * @memberof MaterialDeleteInfo
     * @instance
     */
    MaterialDeleteInfo.prototype.hasDeleteConfig = false;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * MaterialDeleteInfo DeleteInfo.
     * @member {"countDownDelete"|"dateDelete"|"delayWeekCountDownDelete"|undefined} DeleteInfo
     * @memberof MaterialDeleteInfo
     * @instance
     */
    Object.defineProperty(MaterialDeleteInfo.prototype, "DeleteInfo", {
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
                case 2:
                    message.countDownDelete = $root.MaterialDeleteInfo.CountDownDelete.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dateDelete = $root.MaterialDeleteInfo.DateTimeDelete.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.delayWeekCountDownDelete = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.decode(reader, reader.uint32());
                    break;
                case 1:
                    message.hasDeleteConfig = reader.bool();
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
        if (message.countDownDelete != null && message.hasOwnProperty("countDownDelete")) {
            properties.DeleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.CountDownDelete.verify(message.countDownDelete);
                if (error)
                    return "countDownDelete." + error;
            }
        }
        if (message.dateDelete != null && message.hasOwnProperty("dateDelete")) {
            if (properties.DeleteInfo === 1)
                return "DeleteInfo: multiple values";
            properties.DeleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.DateTimeDelete.verify(message.dateDelete);
                if (error)
                    return "dateDelete." + error;
            }
        }
        if (message.delayWeekCountDownDelete != null && message.hasOwnProperty("delayWeekCountDownDelete")) {
            if (properties.DeleteInfo === 1)
                return "DeleteInfo: multiple values";
            properties.DeleteInfo = 1;
            {
                let error = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.verify(message.delayWeekCountDownDelete);
                if (error)
                    return "delayWeekCountDownDelete." + error;
            }
        }
        if (message.hasDeleteConfig != null && message.hasOwnProperty("hasDeleteConfig"))
            if (typeof message.hasDeleteConfig !== "boolean")
                return "hasDeleteConfig: boolean expected";
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
        if (object.hasDeleteConfig != null)
            message.hasDeleteConfig = Boolean(object.hasDeleteConfig);
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
                object.DeleteInfo = "countDownDelete";
        }
        if (message.dateDelete != null && message.hasOwnProperty("dateDelete")) {
            object.dateDelete = $root.MaterialDeleteInfo.DateTimeDelete.toObject(message.dateDelete, options);
            if (options.oneofs)
                object.DeleteInfo = "dateDelete";
        }
        if (message.delayWeekCountDownDelete != null && message.hasOwnProperty("delayWeekCountDownDelete")) {
            object.delayWeekCountDownDelete = $root.MaterialDeleteInfo.DelayWeekCountDownDelete.toObject(message.delayWeekCountDownDelete, options);
            if (options.oneofs)
                object.DeleteInfo = "delayWeekCountDownDelete";
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
            case "STORE_NONE":
            case 0:
                message.storeType = 0;
                break;
            case "STORE_PACK":
            case 1:
                message.storeType = 1;
                break;
            case "STORE_DEPOT":
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
            object.storeType = options.enums === String ? "STORE_NONE" : 0;
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

    /**
     * CmdId enum.
     * @name PlayerStoreNotify.CmdId
     * @enum {number}
     * @property {number} NONE=0 NONE value
     * @property {number} ENET_CHANNEL_ID=0 ENET_CHANNEL_ID value
     * @property {number} ENET_IS_RELIABLE=1 ENET_IS_RELIABLE value
     * @property {number} CMD_ID=609 CMD_ID value
     */
    PlayerStoreNotify.CmdId = (function () {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values["ENET_CHANNEL_ID"] = 0;
        values[valuesById[1] = "ENET_IS_RELIABLE"] = 1;
        values[valuesById[609] = "CMD_ID"] = 609;
        return values;
    })();

    return PlayerStoreNotify;
})();

/**
 * StoreType enum.
 * @exports StoreType
 * @enum {number}
 * @property {number} STORE_NONE=0 STORE_NONE value
 * @property {number} STORE_PACK=1 STORE_PACK value
 * @property {number} STORE_DEPOT=2 STORE_DEPOT value
 */
export const StoreType = $root.StoreType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STORE_NONE"] = 0;
    values[valuesById[1] = "STORE_PACK"] = 1;
    values[valuesById[2] = "STORE_DEPOT"] = 2;
    return values;
})();

export { $root as default };
