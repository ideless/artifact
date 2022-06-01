import * as $protobuf from "protobufjs";
/** Properties of an Equip. */
export interface IEquip {

    /** Equip reliquary */
    reliquary?: (IReliquary|null);

    /** Equip weapon */
    weapon?: (IWeapon|null);

    /** Equip isLocked */
    isLocked?: (boolean|null);
}

/** Represents an Equip. */
export class Equip implements IEquip {

    /**
     * Constructs a new Equip.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEquip);

    /** Equip reliquary. */
    public reliquary?: (IReliquary|null);

    /** Equip weapon. */
    public weapon?: (IWeapon|null);

    /** Equip isLocked. */
    public isLocked: boolean;

    /** Equip Detail. */
    public Detail?: ("reliquary"|"weapon");

    /**
     * Creates a new Equip instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Equip instance
     */
    public static create(properties?: IEquip): Equip;

    /**
     * Encodes the specified Equip message. Does not implicitly {@link Equip.verify|verify} messages.
     * @param message Equip message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEquip, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Equip message, length delimited. Does not implicitly {@link Equip.verify|verify} messages.
     * @param message Equip message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEquip, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Equip message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Equip;

    /**
     * Decodes an Equip message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Equip;

    /**
     * Verifies an Equip message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Equip message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Equip
     */
    public static fromObject(object: { [k: string]: any }): Equip;

    /**
     * Creates a plain object from an Equip message. Also converts values to other types if specified.
     * @param message Equip
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Equip, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Equip to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Reliquary. */
export interface IReliquary {

    /** Reliquary level */
    level?: (number|null);

    /** Reliquary exp */
    exp?: (number|null);

    /** Reliquary promoteLevel */
    promoteLevel?: (number|null);

    /** Reliquary mainPropId */
    mainPropId?: (number|null);

    /** Reliquary appendPropIdList */
    appendPropIdList?: (number[]|null);
}

/** Represents a Reliquary. */
export class Reliquary implements IReliquary {

    /**
     * Constructs a new Reliquary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReliquary);

    /** Reliquary level. */
    public level: number;

    /** Reliquary exp. */
    public exp: number;

    /** Reliquary promoteLevel. */
    public promoteLevel: number;

    /** Reliquary mainPropId. */
    public mainPropId: number;

    /** Reliquary appendPropIdList. */
    public appendPropIdList: number[];

    /**
     * Creates a new Reliquary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Reliquary instance
     */
    public static create(properties?: IReliquary): Reliquary;

    /**
     * Encodes the specified Reliquary message. Does not implicitly {@link Reliquary.verify|verify} messages.
     * @param message Reliquary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReliquary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Reliquary message, length delimited. Does not implicitly {@link Reliquary.verify|verify} messages.
     * @param message Reliquary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReliquary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Reliquary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Reliquary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Reliquary;

    /**
     * Decodes a Reliquary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Reliquary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Reliquary;

    /**
     * Verifies a Reliquary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Reliquary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Reliquary
     */
    public static fromObject(object: { [k: string]: any }): Reliquary;

    /**
     * Creates a plain object from a Reliquary message. Also converts values to other types if specified.
     * @param message Reliquary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Reliquary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Reliquary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Weapon. */
export interface IWeapon {

    /** Weapon level */
    level?: (number|null);

    /** Weapon exp */
    exp?: (number|null);

    /** Weapon promoteLevel */
    promoteLevel?: (number|null);

    /** Weapon affixMap */
    affixMap?: ({ [k: string]: number }|null);
}

/** Represents a Weapon. */
export class Weapon implements IWeapon {

    /**
     * Constructs a new Weapon.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWeapon);

    /** Weapon level. */
    public level: number;

    /** Weapon exp. */
    public exp: number;

    /** Weapon promoteLevel. */
    public promoteLevel: number;

    /** Weapon affixMap. */
    public affixMap: { [k: string]: number };

    /**
     * Creates a new Weapon instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Weapon instance
     */
    public static create(properties?: IWeapon): Weapon;

    /**
     * Encodes the specified Weapon message. Does not implicitly {@link Weapon.verify|verify} messages.
     * @param message Weapon message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWeapon, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Weapon message, length delimited. Does not implicitly {@link Weapon.verify|verify} messages.
     * @param message Weapon message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWeapon, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Weapon message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapon;

    /**
     * Decodes a Weapon message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Weapon
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapon;

    /**
     * Verifies a Weapon message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Weapon message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Weapon
     */
    public static fromObject(object: { [k: string]: any }): Weapon;

    /**
     * Creates a plain object from a Weapon message. Also converts values to other types if specified.
     * @param message Weapon
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Weapon, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Weapon to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Furniture. */
export interface IFurniture {

    /** Furniture count */
    count?: (number|null);
}

/** Represents a Furniture. */
export class Furniture implements IFurniture {

    /**
     * Constructs a new Furniture.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFurniture);

    /** Furniture count. */
    public count: number;

    /**
     * Creates a new Furniture instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Furniture instance
     */
    public static create(properties?: IFurniture): Furniture;

    /**
     * Encodes the specified Furniture message. Does not implicitly {@link Furniture.verify|verify} messages.
     * @param message Furniture message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFurniture, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Furniture message, length delimited. Does not implicitly {@link Furniture.verify|verify} messages.
     * @param message Furniture message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFurniture, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Furniture message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Furniture
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Furniture;

    /**
     * Decodes a Furniture message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Furniture
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Furniture;

    /**
     * Verifies a Furniture message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Furniture message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Furniture
     */
    public static fromObject(object: { [k: string]: any }): Furniture;

    /**
     * Creates a plain object from a Furniture message. Also converts values to other types if specified.
     * @param message Furniture
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Furniture, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Furniture to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GetPlayerTokenRsp. */
export interface IGetPlayerTokenRsp {

    /** GetPlayerTokenRsp retcode */
    retcode?: (number|null);

    /** GetPlayerTokenRsp msg */
    msg?: (string|null);

    /** GetPlayerTokenRsp uid */
    uid?: (number|null);

    /** GetPlayerTokenRsp token */
    token?: (string|null);

    /** GetPlayerTokenRsp blackUidEndTime */
    blackUidEndTime?: (number|null);

    /** GetPlayerTokenRsp accountType */
    accountType?: (number|null);

    /** GetPlayerTokenRsp accountUid */
    accountUid?: (string|null);

    /** GetPlayerTokenRsp isProficientPlayer */
    isProficientPlayer?: (boolean|null);

    /** GetPlayerTokenRsp secretKey */
    secretKey?: (string|null);

    /** GetPlayerTokenRsp gmUid */
    gmUid?: (number|null);

    /** GetPlayerTokenRsp secretKeySeed */
    secretKeySeed?: (Long|null);

    /** GetPlayerTokenRsp securityCmdBuffer */
    securityCmdBuffer?: (Uint8Array|null);

    /** GetPlayerTokenRsp platformType */
    platformType?: (number|null);

    /** GetPlayerTokenRsp extraBinData */
    extraBinData?: (Uint8Array|null);

    /** GetPlayerTokenRsp isGuest */
    isGuest?: (boolean|null);

    /** GetPlayerTokenRsp channelId */
    channelId?: (number|null);

    /** GetPlayerTokenRsp subChannelId */
    subChannelId?: (number|null);

    /** GetPlayerTokenRsp tag */
    tag?: (number|null);

    /** GetPlayerTokenRsp countryCode */
    countryCode?: (string|null);

    /** GetPlayerTokenRsp isLoginWhiteList */
    isLoginWhiteList?: (boolean|null);

    /** GetPlayerTokenRsp psnId */
    psnId?: (string|null);

    /** GetPlayerTokenRsp clientVersionRandomKey */
    clientVersionRandomKey?: (string|null);

    /** GetPlayerTokenRsp regPlatform */
    regPlatform?: (number|null);

    /** GetPlayerTokenRsp clientIpStr */
    clientIpStr?: (string|null);

    /** GetPlayerTokenRsp birthday */
    birthday?: (string|null);

    /** GetPlayerTokenRsp NNCIBOLDIAI */
    NNCIBOLDIAI?: (number|null);

    /** GetPlayerTokenRsp FNECFLEAKKO */
    FNECFLEAKKO?: (boolean|null);
}

/** Represents a GetPlayerTokenRsp. */
export class GetPlayerTokenRsp implements IGetPlayerTokenRsp {

    /**
     * Constructs a new GetPlayerTokenRsp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGetPlayerTokenRsp);

    /** GetPlayerTokenRsp retcode. */
    public retcode: number;

    /** GetPlayerTokenRsp msg. */
    public msg: string;

    /** GetPlayerTokenRsp uid. */
    public uid: number;

    /** GetPlayerTokenRsp token. */
    public token: string;

    /** GetPlayerTokenRsp blackUidEndTime. */
    public blackUidEndTime: number;

    /** GetPlayerTokenRsp accountType. */
    public accountType: number;

    /** GetPlayerTokenRsp accountUid. */
    public accountUid: string;

    /** GetPlayerTokenRsp isProficientPlayer. */
    public isProficientPlayer: boolean;

    /** GetPlayerTokenRsp secretKey. */
    public secretKey: string;

    /** GetPlayerTokenRsp gmUid. */
    public gmUid: number;

    /** GetPlayerTokenRsp secretKeySeed. */
    public secretKeySeed: Long;

    /** GetPlayerTokenRsp securityCmdBuffer. */
    public securityCmdBuffer: Uint8Array;

    /** GetPlayerTokenRsp platformType. */
    public platformType: number;

    /** GetPlayerTokenRsp extraBinData. */
    public extraBinData: Uint8Array;

    /** GetPlayerTokenRsp isGuest. */
    public isGuest: boolean;

    /** GetPlayerTokenRsp channelId. */
    public channelId: number;

    /** GetPlayerTokenRsp subChannelId. */
    public subChannelId: number;

    /** GetPlayerTokenRsp tag. */
    public tag: number;

    /** GetPlayerTokenRsp countryCode. */
    public countryCode: string;

    /** GetPlayerTokenRsp isLoginWhiteList. */
    public isLoginWhiteList: boolean;

    /** GetPlayerTokenRsp psnId. */
    public psnId: string;

    /** GetPlayerTokenRsp clientVersionRandomKey. */
    public clientVersionRandomKey: string;

    /** GetPlayerTokenRsp regPlatform. */
    public regPlatform: number;

    /** GetPlayerTokenRsp clientIpStr. */
    public clientIpStr: string;

    /** GetPlayerTokenRsp birthday. */
    public birthday: string;

    /** GetPlayerTokenRsp NNCIBOLDIAI. */
    public NNCIBOLDIAI: number;

    /** GetPlayerTokenRsp FNECFLEAKKO. */
    public FNECFLEAKKO: boolean;

    /**
     * Creates a new GetPlayerTokenRsp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetPlayerTokenRsp instance
     */
    public static create(properties?: IGetPlayerTokenRsp): GetPlayerTokenRsp;

    /**
     * Encodes the specified GetPlayerTokenRsp message. Does not implicitly {@link GetPlayerTokenRsp.verify|verify} messages.
     * @param message GetPlayerTokenRsp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGetPlayerTokenRsp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GetPlayerTokenRsp message, length delimited. Does not implicitly {@link GetPlayerTokenRsp.verify|verify} messages.
     * @param message GetPlayerTokenRsp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGetPlayerTokenRsp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GetPlayerTokenRsp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetPlayerTokenRsp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GetPlayerTokenRsp;

    /**
     * Decodes a GetPlayerTokenRsp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetPlayerTokenRsp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GetPlayerTokenRsp;

    /**
     * Verifies a GetPlayerTokenRsp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GetPlayerTokenRsp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetPlayerTokenRsp
     */
    public static fromObject(object: { [k: string]: any }): GetPlayerTokenRsp;

    /**
     * Creates a plain object from a GetPlayerTokenRsp message. Also converts values to other types if specified.
     * @param message GetPlayerTokenRsp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GetPlayerTokenRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GetPlayerTokenRsp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace GetPlayerTokenRsp {

    /** CmdId enum. */
    enum CmdId {
        NONE = 0,
        ENET_CHANNEL_ID = 0,
        ENET_IS_RELIABLE = 1,
        CMD_ID = 131
    }
}

/** Properties of an Item. */
export interface IItem {

    /** Item material */
    material?: (IMaterial|null);

    /** Item equip */
    equip?: (IEquip|null);

    /** Item furniture */
    furniture?: (IFurniture|null);

    /** Item itemId */
    itemId?: (number|null);

    /** Item guid */
    guid?: (Long|null);
}

/** Represents an Item. */
export class Item implements IItem {

    /**
     * Constructs a new Item.
     * @param [properties] Properties to set
     */
    constructor(properties?: IItem);

    /** Item material. */
    public material?: (IMaterial|null);

    /** Item equip. */
    public equip?: (IEquip|null);

    /** Item furniture. */
    public furniture?: (IFurniture|null);

    /** Item itemId. */
    public itemId: number;

    /** Item guid. */
    public guid: Long;

    /** Item Detail. */
    public Detail?: ("material"|"equip"|"furniture");

    /**
     * Creates a new Item instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Item instance
     */
    public static create(properties?: IItem): Item;

    /**
     * Encodes the specified Item message. Does not implicitly {@link Item.verify|verify} messages.
     * @param message Item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Item message, length delimited. Does not implicitly {@link Item.verify|verify} messages.
     * @param message Item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Item message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Item;

    /**
     * Decodes an Item message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Item;

    /**
     * Verifies an Item message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Item message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Item
     */
    public static fromObject(object: { [k: string]: any }): Item;

    /**
     * Creates a plain object from an Item message. Also converts values to other types if specified.
     * @param message Item
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Item to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Material. */
export interface IMaterial {

    /** Material count */
    count?: (number|null);

    /** Material deleteInfo */
    deleteInfo?: (IMaterialDeleteInfo|null);
}

/** Represents a Material. */
export class Material implements IMaterial {

    /**
     * Constructs a new Material.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMaterial);

    /** Material count. */
    public count: number;

    /** Material deleteInfo. */
    public deleteInfo?: (IMaterialDeleteInfo|null);

    /**
     * Creates a new Material instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Material instance
     */
    public static create(properties?: IMaterial): Material;

    /**
     * Encodes the specified Material message. Does not implicitly {@link Material.verify|verify} messages.
     * @param message Material message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMaterial, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Material message, length delimited. Does not implicitly {@link Material.verify|verify} messages.
     * @param message Material message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMaterial, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Material message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Material
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Material;

    /**
     * Decodes a Material message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Material
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Material;

    /**
     * Verifies a Material message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Material message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Material
     */
    public static fromObject(object: { [k: string]: any }): Material;

    /**
     * Creates a plain object from a Material message. Also converts values to other types if specified.
     * @param message Material
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Material, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Material to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MaterialDeleteInfo. */
export interface IMaterialDeleteInfo {

    /** MaterialDeleteInfo countDownDelete */
    countDownDelete?: (MaterialDeleteInfo.ICountDownDelete|null);

    /** MaterialDeleteInfo dateDelete */
    dateDelete?: (MaterialDeleteInfo.IDateTimeDelete|null);

    /** MaterialDeleteInfo delayWeekCountDownDelete */
    delayWeekCountDownDelete?: (MaterialDeleteInfo.IDelayWeekCountDownDelete|null);

    /** MaterialDeleteInfo hasDeleteConfig */
    hasDeleteConfig?: (boolean|null);
}

/** Represents a MaterialDeleteInfo. */
export class MaterialDeleteInfo implements IMaterialDeleteInfo {

    /**
     * Constructs a new MaterialDeleteInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMaterialDeleteInfo);

    /** MaterialDeleteInfo countDownDelete. */
    public countDownDelete?: (MaterialDeleteInfo.ICountDownDelete|null);

    /** MaterialDeleteInfo dateDelete. */
    public dateDelete?: (MaterialDeleteInfo.IDateTimeDelete|null);

    /** MaterialDeleteInfo delayWeekCountDownDelete. */
    public delayWeekCountDownDelete?: (MaterialDeleteInfo.IDelayWeekCountDownDelete|null);

    /** MaterialDeleteInfo hasDeleteConfig. */
    public hasDeleteConfig: boolean;

    /** MaterialDeleteInfo DeleteInfo. */
    public DeleteInfo?: ("countDownDelete"|"dateDelete"|"delayWeekCountDownDelete");

    /**
     * Creates a new MaterialDeleteInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MaterialDeleteInfo instance
     */
    public static create(properties?: IMaterialDeleteInfo): MaterialDeleteInfo;

    /**
     * Encodes the specified MaterialDeleteInfo message. Does not implicitly {@link MaterialDeleteInfo.verify|verify} messages.
     * @param message MaterialDeleteInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMaterialDeleteInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MaterialDeleteInfo message, length delimited. Does not implicitly {@link MaterialDeleteInfo.verify|verify} messages.
     * @param message MaterialDeleteInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMaterialDeleteInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MaterialDeleteInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MaterialDeleteInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MaterialDeleteInfo;

    /**
     * Decodes a MaterialDeleteInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MaterialDeleteInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MaterialDeleteInfo;

    /**
     * Verifies a MaterialDeleteInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MaterialDeleteInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MaterialDeleteInfo
     */
    public static fromObject(object: { [k: string]: any }): MaterialDeleteInfo;

    /**
     * Creates a plain object from a MaterialDeleteInfo message. Also converts values to other types if specified.
     * @param message MaterialDeleteInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MaterialDeleteInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MaterialDeleteInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace MaterialDeleteInfo {

    /** Properties of a CountDownDelete. */
    interface ICountDownDelete {

        /** CountDownDelete deleteTimeNumMap */
        deleteTimeNumMap?: ({ [k: string]: number }|null);

        /** CountDownDelete configCountDownTime */
        configCountDownTime?: (number|null);
    }

    /** Represents a CountDownDelete. */
    class CountDownDelete implements ICountDownDelete {

        /**
         * Constructs a new CountDownDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: MaterialDeleteInfo.ICountDownDelete);

        /** CountDownDelete deleteTimeNumMap. */
        public deleteTimeNumMap: { [k: string]: number };

        /** CountDownDelete configCountDownTime. */
        public configCountDownTime: number;

        /**
         * Creates a new CountDownDelete instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CountDownDelete instance
         */
        public static create(properties?: MaterialDeleteInfo.ICountDownDelete): MaterialDeleteInfo.CountDownDelete;

        /**
         * Encodes the specified CountDownDelete message. Does not implicitly {@link MaterialDeleteInfo.CountDownDelete.verify|verify} messages.
         * @param message CountDownDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MaterialDeleteInfo.ICountDownDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CountDownDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.CountDownDelete.verify|verify} messages.
         * @param message CountDownDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MaterialDeleteInfo.ICountDownDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CountDownDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MaterialDeleteInfo.CountDownDelete;

        /**
         * Decodes a CountDownDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MaterialDeleteInfo.CountDownDelete;

        /**
         * Verifies a CountDownDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CountDownDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CountDownDelete
         */
        public static fromObject(object: { [k: string]: any }): MaterialDeleteInfo.CountDownDelete;

        /**
         * Creates a plain object from a CountDownDelete message. Also converts values to other types if specified.
         * @param message CountDownDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MaterialDeleteInfo.CountDownDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CountDownDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DateTimeDelete. */
    interface IDateTimeDelete {

        /** DateTimeDelete deleteTime */
        deleteTime?: (number|null);
    }

    /** Represents a DateTimeDelete. */
    class DateTimeDelete implements IDateTimeDelete {

        /**
         * Constructs a new DateTimeDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: MaterialDeleteInfo.IDateTimeDelete);

        /** DateTimeDelete deleteTime. */
        public deleteTime: number;

        /**
         * Creates a new DateTimeDelete instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DateTimeDelete instance
         */
        public static create(properties?: MaterialDeleteInfo.IDateTimeDelete): MaterialDeleteInfo.DateTimeDelete;

        /**
         * Encodes the specified DateTimeDelete message. Does not implicitly {@link MaterialDeleteInfo.DateTimeDelete.verify|verify} messages.
         * @param message DateTimeDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MaterialDeleteInfo.IDateTimeDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DateTimeDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.DateTimeDelete.verify|verify} messages.
         * @param message DateTimeDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MaterialDeleteInfo.IDateTimeDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DateTimeDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DateTimeDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MaterialDeleteInfo.DateTimeDelete;

        /**
         * Decodes a DateTimeDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DateTimeDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MaterialDeleteInfo.DateTimeDelete;

        /**
         * Verifies a DateTimeDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DateTimeDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DateTimeDelete
         */
        public static fromObject(object: { [k: string]: any }): MaterialDeleteInfo.DateTimeDelete;

        /**
         * Creates a plain object from a DateTimeDelete message. Also converts values to other types if specified.
         * @param message DateTimeDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MaterialDeleteInfo.DateTimeDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DateTimeDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelayWeekCountDownDelete. */
    interface IDelayWeekCountDownDelete {

        /** DelayWeekCountDownDelete deleteTimeNumMap */
        deleteTimeNumMap?: ({ [k: string]: number }|null);

        /** DelayWeekCountDownDelete configDelayWeek */
        configDelayWeek?: (number|null);

        /** DelayWeekCountDownDelete configCountDownTime */
        configCountDownTime?: (number|null);
    }

    /** Represents a DelayWeekCountDownDelete. */
    class DelayWeekCountDownDelete implements IDelayWeekCountDownDelete {

        /**
         * Constructs a new DelayWeekCountDownDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: MaterialDeleteInfo.IDelayWeekCountDownDelete);

        /** DelayWeekCountDownDelete deleteTimeNumMap. */
        public deleteTimeNumMap: { [k: string]: number };

        /** DelayWeekCountDownDelete configDelayWeek. */
        public configDelayWeek: number;

        /** DelayWeekCountDownDelete configCountDownTime. */
        public configCountDownTime: number;

        /**
         * Creates a new DelayWeekCountDownDelete instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelayWeekCountDownDelete instance
         */
        public static create(properties?: MaterialDeleteInfo.IDelayWeekCountDownDelete): MaterialDeleteInfo.DelayWeekCountDownDelete;

        /**
         * Encodes the specified DelayWeekCountDownDelete message. Does not implicitly {@link MaterialDeleteInfo.DelayWeekCountDownDelete.verify|verify} messages.
         * @param message DelayWeekCountDownDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MaterialDeleteInfo.IDelayWeekCountDownDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelayWeekCountDownDelete message, length delimited. Does not implicitly {@link MaterialDeleteInfo.DelayWeekCountDownDelete.verify|verify} messages.
         * @param message DelayWeekCountDownDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MaterialDeleteInfo.IDelayWeekCountDownDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelayWeekCountDownDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelayWeekCountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MaterialDeleteInfo.DelayWeekCountDownDelete;

        /**
         * Decodes a DelayWeekCountDownDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelayWeekCountDownDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MaterialDeleteInfo.DelayWeekCountDownDelete;

        /**
         * Verifies a DelayWeekCountDownDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelayWeekCountDownDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelayWeekCountDownDelete
         */
        public static fromObject(object: { [k: string]: any }): MaterialDeleteInfo.DelayWeekCountDownDelete;

        /**
         * Creates a plain object from a DelayWeekCountDownDelete message. Also converts values to other types if specified.
         * @param message DelayWeekCountDownDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MaterialDeleteInfo.DelayWeekCountDownDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelayWeekCountDownDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a PlayerStoreNotify. */
export interface IPlayerStoreNotify {

    /** PlayerStoreNotify storeType */
    storeType?: (StoreType|null);

    /** PlayerStoreNotify itemList */
    itemList?: (IItem[]|null);

    /** PlayerStoreNotify weightLimit */
    weightLimit?: (number|null);
}

/** Represents a PlayerStoreNotify. */
export class PlayerStoreNotify implements IPlayerStoreNotify {

    /**
     * Constructs a new PlayerStoreNotify.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerStoreNotify);

    /** PlayerStoreNotify storeType. */
    public storeType: StoreType;

    /** PlayerStoreNotify itemList. */
    public itemList: IItem[];

    /** PlayerStoreNotify weightLimit. */
    public weightLimit: number;

    /**
     * Creates a new PlayerStoreNotify instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerStoreNotify instance
     */
    public static create(properties?: IPlayerStoreNotify): PlayerStoreNotify;

    /**
     * Encodes the specified PlayerStoreNotify message. Does not implicitly {@link PlayerStoreNotify.verify|verify} messages.
     * @param message PlayerStoreNotify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerStoreNotify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerStoreNotify message, length delimited. Does not implicitly {@link PlayerStoreNotify.verify|verify} messages.
     * @param message PlayerStoreNotify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerStoreNotify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerStoreNotify message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerStoreNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerStoreNotify;

    /**
     * Decodes a PlayerStoreNotify message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerStoreNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerStoreNotify;

    /**
     * Verifies a PlayerStoreNotify message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerStoreNotify message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerStoreNotify
     */
    public static fromObject(object: { [k: string]: any }): PlayerStoreNotify;

    /**
     * Creates a plain object from a PlayerStoreNotify message. Also converts values to other types if specified.
     * @param message PlayerStoreNotify
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerStoreNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerStoreNotify to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace PlayerStoreNotify {

    /** CmdId enum. */
    enum CmdId {
        NONE = 0,
        ENET_CHANNEL_ID = 0,
        ENET_IS_RELIABLE = 1,
        CMD_ID = 609
    }
}

/** StoreType enum. */
export enum StoreType {
    STORE_NONE = 0,
    STORE_PACK = 1,
    STORE_DEPOT = 2
}
