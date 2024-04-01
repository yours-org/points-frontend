import * as wasm from "./points_miner_bg.wasm";
import { __wbg_set_wasm } from "./points_miner_bg.js";
__wbg_set_wasm(wasm);
export * from "./points_miner_bg.js";
