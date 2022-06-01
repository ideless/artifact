import Module from "./p2p"
import { GetPlayerTokenRsp, PlayerStoreNotify } from "./proto"
import store from "./store"

const o = {
    async parseArtifacts(data: Uint8Array) {
        throw new Error('pparser Uninitialized')
    }
}
export default o

Module().then((p2p: any) => {
    const p2p_open = p2p.cwrap(
        'p2p_open',
        'number',
        ['number', 'number']
    )

    const p2p_close = p2p.cwrap(
        'p2p_close',
        null,
        ['number']
    )

    const p2p_set_key_seed = p2p.cwrap(
        'p2p_set_key_seed',
        null,
        ['number', 'string']
    )

    const p2p_decrypt_packet = p2p.cwrap(
        'p2p_decrypt_packet',
        'number',
        ['number', 'number', 'number']
    )

    function xmalloc(size: number) {
        const ptr = p2p._malloc(size)
        if (ptr == 0) {
            throw new Error(`Failed allocation of ${size} bytes`)
        }
        return ptr;
    }

    (o.parseArtifacts as any) = async (data: Uint8Array) => {
        let good;
        const data_len = data.length
        const data_ptr = xmalloc(data_len)
        const protobuf_ptr = xmalloc(data_len)
        const packetid_ptr = xmalloc(2)

        p2p.HEAPU8.set(data, data_ptr)
        let p2p_ctx_ptr = p2p_open(data_ptr, data_len)
        if (p2p_ctx_ptr == 0) {
            throw new Error("Fail to open pcap file")
        }

        while (true) {
            let protobuf_size = p2p_decrypt_packet(p2p_ctx_ptr, protobuf_ptr, packetid_ptr)
            if (protobuf_size == -1) break
            if (protobuf_size < -1) {
                console.debug(protobuf_size)
                throw new Error("Fail to decrypt packet")
            }
            let packetid = (new Uint16Array(p2p.HEAPU8.buffer, packetid_ptr, 2))[0]
            // console.log(packetid)
            if (packetid == 131) {
                let msg = GetPlayerTokenRsp.decode(new Uint8Array(p2p.HEAPU8.buffer, protobuf_ptr, protobuf_size))
                // console.log(msg)
                p2p_set_key_seed(p2p_ctx_ptr, msg.secretKeySeed.toString())
            } else if (packetid == 609) {
                let msg = PlayerStoreNotify.decode(new Uint8Array(p2p.HEAPU8.buffer, protobuf_ptr, protobuf_size))
                good = store.toGood(PlayerStoreNotify.toObject(msg, {
                    longs: String,
                    enums: String,
                    bytes: String,
                }))
                break;
            }
        }

        p2p_close(p2p_ctx_ptr)

        p2p._free(data_ptr)
        p2p._free(protobuf_ptr)
        p2p._free(packetid_ptr)

        return good;
    }
})