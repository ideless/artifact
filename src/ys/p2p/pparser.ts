import Module from './p2p';
import {
    GetPlayerTokenRsp,
    PlayerStoreNotify,
    AvatarDataNotify,
} from './proto';
import store from './store';

const o = {
    async parseArtifacts(data: Uint8Array): Promise<any> {
        throw new Error('pparser Uninitialized');
    },
};
export default o;

Module().then((p2p) => {
    let parser = new p2p.Parser();

    parser.setInitSeeds(['5030560303351918544']);
    parser.setLogLevel(-1);

    o.parseArtifacts = async (data: Uint8Array) => {
        let s, a;
        parser.parse(data, (pkt, ctx) => {
            // console.log(pkt.id)
            if (pkt.id == 131) {
                let msg = GetPlayerTokenRsp.decode(pkt.protobuf);
                // console.log(msg)
                // console.log(msg.secretKeySeed.toString())
                ctx.setKeySeed(msg.secretKeySeed.toString());
            } else if (pkt.id == 609) {
                let msg = PlayerStoreNotify.decode(pkt.protobuf);
                s = PlayerStoreNotify.toObject(msg, {
                    longs: String,
                    enums: String,
                    bytes: String,
                });
            } else if (pkt.id == 1695) {
                let msg = AvatarDataNotify.decode(pkt.protobuf);
                a = AvatarDataNotify.toObject(msg, {
                    longs: String,
                    enums: String,
                    bytes: String,
                });
                return 1; // stop parsing
            }
        });
        return store.toGood(s, a);
    };
});
