"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bridge = exports.ParamMap = exports.MODULE_NAME = void 0;
const native_request_handler_1 = require("react-native-adapty/dist/native-request-handler");
/**
 * Name of bridge package
 * React Native looks for a module with provided name
 * via NativeModules API
 *
 * Must be the same as string:
 * - iOS: RNAdapty.m & RNAdapty.swift. Also match in RCT_EXTERN_MODULE
 * - Android: AdaptyReactModule.kt (getName)
 */
exports.MODULE_NAME = 'RNAUICallHandler';
class ParamMap extends native_request_handler_1.ParamMap {
    constructor() {
        super();
    }
}
exports.ParamMap = ParamMap;
exports.$bridge = new native_request_handler_1.NativeRequestHandler(exports.MODULE_NAME);
//# sourceMappingURL=bridge.js.map