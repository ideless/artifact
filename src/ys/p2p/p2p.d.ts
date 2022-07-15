/// <reference types="emscripten" />
/** Above will import declarations from @types/emscripten, including Module etc. */

export interface IParser {
    new(): IParser
    /**
     * create a packet stream (don't forget to close it)
     * @param verbose default: -1 (do not log at all)
     */
    open(data: Uint8Array): void
    /**
     * close current packet stream
     */
    close(): void
    /**
     * set secret key seed you get from GetPlayerTokenRsp, applied per session
     */
    setKeySeed(seed: string): void
    /**
     * set dispatch key seeds.
     * @param seeds array of decimal string of uint64 seeds
     */
    setInitSeeds(seeds: string[]): void
    /**
     * read and decrypt a packet
     * @returns decrypted packet, or void if reaches end or if failed
     */
    decryptPacket(): IPacket | void
    /**
     * set log level (log to _stdout)
     * @param verbose -1,0,1,2,...
     */
    setLogLevel(verbose: number): void
    /**
     * a highlevel wrapper, do open+iterate+close for you
     */
    parse(data: Uint8Array, callback: (packet: IPacket, ctx: IParser) => any): void
}

export interface IPacket {
    id: number
    protobuf: Uint8Array
}

// This will merge to the existing EmscriptenModule interface from @types/emscripten
// If this doesn't work, try globalThis.EmscriptenModule instead.
export interface P2PModule extends EmscriptenModule {
    Parser: IParser
}

export default function Module(): Promise<P2PModule>;