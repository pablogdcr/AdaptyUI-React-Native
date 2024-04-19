import { NativeRequestHandler, ParamMap as GenericParamMap } from 'react-native-adapty/dist/native-request-handler';
import type { ParamKey } from './types/bridge';
/**
 * Name of bridge package
 * React Native looks for a module with provided name
 * via NativeModules API
 *
 * Must be the same as string:
 * - iOS: RNAdapty.m & RNAdapty.swift. Also match in RCT_EXTERN_MODULE
 * - Android: AdaptyReactModule.kt (getName)
 */
export declare const MODULE_NAME = "RNAUICallHandler";
export declare class ParamMap extends GenericParamMap<ParamKey> {
    constructor();
}
export declare const $bridge: NativeRequestHandler<"present_view" | "dismiss_view" | "create_view", ParamMap>;
//# sourceMappingURL=bridge.d.ts.map