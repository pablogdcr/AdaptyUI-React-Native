import { AdaptyPaywall } from 'react-native-adapty';
import { CreatePaywallViewParamsInput, EventHandlers } from './types';
/**
 * Provides methods to control created paywall view
 * @public
 */
export declare class ViewController {
    /**
     * Intended way to create a ViewController instance.
     * It prepares a native controller to be presented
     * and creates reference between native controller and JS instance
     */
    static create(paywall: AdaptyPaywall, params: CreatePaywallViewParamsInput): Promise<ViewController>;
    private id;
    private unsubscribeAllListeners;
    private handle;
    /**
     * Presents a paywall view as a full-screen modal
     *
     * @remarks
     * Calling `present` upon already visible paywall view
     * would result in an error
     *
     * @throws {AdaptyError}
     */
    present(): Promise<void>;
    /**
     * Dismisses a paywall view
     *
     * @throws {AdaptyError}
     */
    dismiss(): Promise<void>;
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
    registerEventHandlers(eventHandlers?: Partial<EventHandlers>): () => void;
    private errNoViewReference;
}
//# sourceMappingURL=view-controller.d.ts.map