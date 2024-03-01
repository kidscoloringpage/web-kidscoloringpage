export {};

declare global {
  interface Window {
    // To selectively enable/disable debug logs
    __DEBUG__: boolean;
    gtag: any;
    fireEvent: (props: GAEventType) => void;
  }
}

export type GAEventType = {
  action: string;
  category: string;
  label?: string;
  value?: string;
};

/**
 * Tracks the event on google analytics
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 * @param props Event properties
 * @returns void
 */
// @ts-ignore
window.fireEvent = (props: GAEventType) => {
  const { action, category, label, value } = props;
  // @ts-ignore
  if (!window.gtag) {
    // @ts-ignore
    console.warn('Missing GTAG - Analytics disabled');
    return;
  }

  // @ts-ignore
  if (window.__DEBUG__) {
    // @ts-ignore
    console.log('Analytics event fired', props);
  }

  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
