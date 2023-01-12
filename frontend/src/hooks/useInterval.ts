import { useEffect, useRef } from 'react';

/**
 * Custom hook for polling a function
 * @param callback Function to call
 * @param delayMilliseconds Delay between calls
 */
export const useInterval = (callback: () => void, delayMilliseconds: number) => {
  const callbackToUse: React.MutableRefObject<(() => void) | undefined> = useRef();

  useEffect(() => {
    callbackToUse.current = callback;
  }, [callback]);

  useEffect(() => {
    const action = () => {
      if (!callbackToUse.current) { return; }
      callbackToUse.current();
    };

    if (delayMilliseconds !== null) {
      const id = setInterval(action, delayMilliseconds);

      return () => {
        clearInterval(id);
      }
    }
  }, [callback, delayMilliseconds]);
};