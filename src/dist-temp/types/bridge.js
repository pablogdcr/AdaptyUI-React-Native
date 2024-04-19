"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNames = exports.ParamKeys = void 0;
/**
 * Valid list of expected parameters to the handlers
 * Must be the same as
 * - iOS RNAConstants.ParamKey
 * @internal
 */
exports.ParamKeys = [
    'paywall',
    'locale',
    'prefetch_products',
    'custom_tags',
    'view_id',
];
/**
 * Valid list of callable bridge handlers
 * Must be the same as
 * - iOS RNAConstants.MethodName
 * @internal
 */
exports.MethodNames = [
    'present_view',
    'dismiss_view',
    'create_view',
];
//# sourceMappingURL=bridge.js.map