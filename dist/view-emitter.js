"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewEmitter = void 0;
const bridge_1 = require("./bridge");
// Emitting view ID is passed in JSON["_view_id"]
// So that no all visible views would emit this event
// Must be in every callback response in the form of UUID string
// const KEY_VIEW = 'view_id';
/**
 * @remarks
 * View emitter wraps NativeEventEmitter
 * and provides several modifications:
 * - Synthetic type restrictions to avoid misspelling
 * - Safe data deserialization with SDK decoders
 * - Logging emitting and deserialization processes
 * - Filters out events for other views by _id
 *
 * @internal
 */
class ViewEmitter {
    constructor(viewId) {
        this.removeAllListeners = bridge_1.$bridge.removeAllEventListeners;
        this.viewId = viewId;
    }
    addListener(event, callback, onRequestClose) {
        // Native layer emits callbacks with serialized args
        // This function deserializes & decodes args
        // All native callbacks are expected to return only 1 arg
        const viewId = this.viewId;
        return bridge_1.$bridge.addEventListener(event, function (arg) {
            var _a;
            const eventView = (_a = this.rawValue['view']) !== null && _a !== void 0 ? _a : null;
            if (viewId !== eventView) {
                return;
            }
            const cb = callback;
            const shouldClose = cb.apply(null, [arg]);
            if (shouldClose) {
                onRequestClose();
            }
        });
    }
}
exports.ViewEmitter = ViewEmitter;
//# sourceMappingURL=view-emitter.js.map