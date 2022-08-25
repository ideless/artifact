[deprecated]

p2p (p2p.wasm, p2p.js, p2p.d.ts) 来自 https://github.com/ideless/p2p

更新 proto 后运行 `yarn proto` 以生成对应的 proto.js 和 proto.d.ts

注意在生成的 proto.js 文件中添加
```
import Long from "long"
$protobuf.util.Long = Long
$protobuf.configure()
```
要不然解析 uint64 会出现错误。当然这只是权宜之计，但至少能用。