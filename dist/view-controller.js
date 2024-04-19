"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
const tslib_1 = require("tslib");
const logger_1 = require("react-native-adapty/dist/logger");
const adapty_paywall_1 = require("react-native-adapty/dist/coders/adapty-paywall");
const bridge_1 = require("./bridge");
const view_emitter_1 = require("./view-emitter");
const types_1 = require("./types");
/**
 * Provides methods to control created paywall view
 * @public
 */
class ViewController {
    /**
     * Intended way to create a ViewController instance.
     * It prepares a native controller to be presented
     * and creates reference between native controller and JS instance
     */
    static create(paywall, params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ctx = new logger_1.LogContext();
            const log = ctx.call({ methodName: 'createController' });
            log.start({ paywall, params });
            const view = new ViewController();
            const body = new bridge_1.ParamMap();
            const coder = new adapty_paywall_1.AdaptyPaywallCoder();
            body.set('paywall', JSON.stringify(coder.encode(paywall)));
            body.set('prefetch_products', (_a = params.prefetchProducts) !== null && _a !== void 0 ? _a : true);
            if (params.locale) {
                body.set('locale', params.locale);
            }
            if (params.customTags) {
                body.set('custom_tags', JSON.stringify(params.customTags));
            }
            const result = yield view.handle('create_view', body, ctx, log);
            view.id = result;
            return view;
        });
    }
    /**
     * Since constructors in JS cannot be async, it is not
     * preferred to create ViewControllers in direct way.
     * Consider using @link{ViewController.create} instead
     *
     * @remarks
     * Creating ViewController this way does not let you
     * to make native create request and set _id.
     * It is intended to avoid usage
     *
     * @internal
     */
    constructor() {
        this.unsubscribeAllListeners = null;
        this.id = null;
    }
    handle(method, params, ctx, log) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bridge_1.$bridge.request(method, params, ctx);
                log.success(result);
                return result;
            }
            catch (error) {
                /*
                 * Success because error was handled validly
                 * It is a developer task to define which errors must be logged
                 */
                log.success({ error });
                throw error;
            }
        });
    }
    /**
     * Presents a paywall view as a full-screen modal
     *
     * @remarks
     * Calling `present` upon already visible paywall view
     * would result in an error
     *
     * @throws {AdaptyError}
     */
    present() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ctx = new logger_1.LogContext();
            const log = ctx.call({ methodName: 'present' });
            log.start({ _id: this.id });
            if (this.id === null) {
                log.failed({ error: 'no _id' });
                throw this.errNoViewReference();
            }
            const body = new bridge_1.ParamMap();
            body.set('view_id', this.id);
            const result = yield this.handle('present_view', body, ctx, log);
            return result;
        });
    }
    /**
     * Dismisses a paywall view
     *
     * @throws {AdaptyError}
     */
    dismiss() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ctx = new logger_1.LogContext();
            const log = ctx.call({ methodName: 'dismiss' });
            log.start({ _id: this.id });
            if (this.id === null) {
                log.failed({ error: 'no id' });
                throw this.errNoViewReference();
            }
            const body = new bridge_1.ParamMap();
            body.set('view_id', this.id);
            yield this.handle('dismiss_view', body, ctx, log);
            if (this.unsubscribeAllListeners) {
                this.unsubscribeAllListeners();
            }
        });
    }
    /**
     * Creates a set of specific view event listeners
     *
     * @see {@link https://docs.adapty.io/docs/react-native-handling-events | [DOC] Handling View Events}
     *
     * @remarks
     * It registers only requested set of event handlers.
     * Your config is assigned into three event listeners {@link DEFAULT_EVENT_HANDLERS},
     * that handle default closing behavior.
     * - `onCloseButtonPress`
     * - `onAndroidSystemBack`
     * - `onRestoreCompleted`
     * - `onPurchaseCompleted`
     *
     * If you want to override these listeners, we strongly recommend to return `true`
     * from your custom listener to retain default closing behavior.
     *
     * @param {Partial<EventHandlers> | undefined} [eventHandlers] - set of event handling callbacks
     * @returns {() => void} unsubscribe - function to unsubscribe all listeners
     */
    registerEventHandlers(eventHandlers = types_1.DEFAULT_EVENT_HANDLERS) {
        const ctx = new logger_1.LogContext();
        const log = ctx.call({ methodName: 'registerEventHandlers' });
        log.start({ _id: this.id });
        if (this.id === null) {
            throw this.errNoViewReference();
        }
        const finalEventHandlers = Object.assign(Object.assign({}, types_1.DEFAULT_EVENT_HANDLERS), eventHandlers);
        // DIY way to tell TS that original arg should not be used
        const deprecateVar = (_target) => true;
        if (!deprecateVar(eventHandlers)) {
            return () => { };
        }
        const viewEmitter = new view_emitter_1.ViewEmitter(this.id);
        Object.keys(finalEventHandlers).forEach(eventStr => {
            const event = eventStr;
            if (!finalEventHandlers.hasOwnProperty(event)) {
                return;
            }
            const handler = finalEventHandlers[event];
            viewEmitter.addListener(event, handler, () => this.dismiss());
        });
        const unsubscribe = () => viewEmitter.removeAllListeners();
        // expose to class to be able to unsubscribe on dismiss
        this.unsubscribeAllListeners = unsubscribe;
        return unsubscribe;
    }
    errNoViewReference() {
        // TODO: Make a separate error type once AdaptyError is refactored
        throw new Error('View reference not found');
    }
}
exports.ViewController = ViewController;
//# sourceMappingURL=view-controller.js.map