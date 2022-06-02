import Module from "./p2p"
import { GetPlayerTokenRsp, PlayerStoreNotify } from "./proto"
import store from "./store"

const o = {
    async parseArtifacts(data: Uint8Array) {
        throw new Error('pparser Uninitialized')
    }
}
export default o

Module().then(p2p => {
    let parser = new p2p.Parser();

    (o.parseArtifacts as any) = async (data: Uint8Array) => {
        let good;
        parser.parse(data, (pkt, ctx) => {
            // console.log(pkt.id)
            if (pkt.id == 131) {
                let msg = GetPlayerTokenRsp.decode(pkt.protobuf)
                // console.log(msg)
                // console.log(msg.secretKeySeed.toString())
                ctx.setKeySeed(msg.secretKeySeed.toString())
            } else if (pkt.id == 609) {
                let msg = PlayerStoreNotify.decode(pkt.protobuf)
                good = store.toGood(PlayerStoreNotify.toObject(msg, {
                    longs: String,
                    enums: String,
                    bytes: String,
                }))
                return 1 // stop parsing
            }
        })
        return good
    }
})