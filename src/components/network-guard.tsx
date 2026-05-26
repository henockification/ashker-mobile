import * as Network from 'expo-network';
import React, { useEffect, useMemo, useState } from 'react';

import { Popup } from './ui/popup';

interface NetworkGuardProps {
  blocking?: boolean;
}

export const NetworkGuard = ({ blocking = true }: NetworkGuardProps) => {
  const [networkState, setNetworkState] = useState<Network.NetworkState | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchInitial = async () => {
      const state = await Network.getNetworkStateAsync();
      if (mounted) setNetworkState(state);
    };

    fetchInitial();

    const subscription = Network.addNetworkStateListener((state) => {
      setNetworkState(state);
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  const isOffline = useMemo(() => {
    if (!networkState) {
      return false;
    }

    if (networkState.isInternetReachable === false) {
      return true;
    }

    if (networkState.isConnected === false) {
      return true;
    }

    return false;
  }, [networkState]);

  useEffect(() => {
    if (!isOffline) {
      setDismissed(false);
    }
  }, [isOffline]);

  const visible = isOffline && (!dismissed || blocking);

  const handleRetry = async () => {
    const state = await Network.getNetworkStateAsync();
    setNetworkState(state);
  };

  return (
    <Popup
      isOpen={visible}
      setOpen={setDismissed}
      title="Broken Connection"
      description="Please check your internet connection and try again."
      actionButtons={[
        {
          label: 'Retry',
          onPress: handleRetry,
        },
        {
          label: 'Close',
        },
      ]}
    />
  );
};
