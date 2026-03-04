import { Button } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';

import InfoCircle from '@/assets/icons/info-circle.svg';
import TickCircle from '@/assets/icons/tick-circle.svg';

const variants = {
  success: {
    bg: 'bg-success-50',
    text: 'text-success-700',
    icon: <TickCircle fill="#12A150" />,
  },
  error: {
    bg: 'bg-danger-50',
    text: 'text-danger-700',
    icon: <InfoCircle fill="#c20e4d" />,
  },
  info: {
    bg: 'bg-info-50',
    text: 'text-info-700',
    icon: <InfoCircle fill={'#f5a524'} />,
  },
  warn: {
    bg: 'bg-info-50', // Replace
    text: 'text-info-700', // Replace
    icon: <InfoCircle fill={'#f5a524'} />, // Replace
  },
  default: {
    bg: 'bg-neutral-50',
    text: 'text-neutral-700',
    icon: <TickCircle fill="#12A150" />, // Replace
  },
};

type ToastType = keyof typeof variants;
type ToastConfigParams = {
  text1?: string;
};

export const toastConfig: Record<ToastType, (props: ToastConfigParams) => React.ReactNode> =
  Object.fromEntries(
    (Object.keys(variants) as ToastType[]).map((type) => {
      const { bg, text, icon } = variants[type];

      return [
        type,
        (props: ToastConfigParams) => {
          return (
            <View
              className={`${bg} gap-4 flex-row items-center justify-between p-3 rounded-lg mx-4 lg:w-[80%]`}
            >
              <View className="flex-2 flex-row items-center gap-4 pr-10">
                <View>{icon}</View>
                <Text className={`font-semibold ${text}`}>{props.text1 ?? ''}</Text>
              </View>

              <Button
                variant="secondary"
                pressableFeedbackVariant="ripple"
                onPress={() => Toast.hide()}
                className="bg-transparent border-1 border-neutral-700 native:flex-1 px-7"
              >
                <Button.Label className="text-neutral-700 font-semibold">
                  Dismiss
                </Button.Label>
              </Button>
            </View>
          );
        },
      ];
    }),
  ) as Record<ToastType, (props: ToastConfigParams) => React.ReactNode>;
