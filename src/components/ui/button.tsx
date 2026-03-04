import type { ButtonRootProps } from 'heroui-native';
import { Button as HeroButton, cn, Spinner } from 'heroui-native';
import { createContext, useContext } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';

const buttonStyles = tv({
  slots: {
    root: 'px-7 rounded-full',
    label: 'font-semibold text-center flex-shrink',
  },
  variants: {
    variant: {
      primary: {
        root: 'bg-primary-600',
        label: 'text-white',
      },
      secondary: {
        root: 'bg-neutral-100',
        label: 'text-neutral-700',
      },
      tertiary: {
        root: 'border-1 border-neutral-700 bg-transparent',
        label: 'text-neutral-700',
      },
      ghost: {
        root: 'px-0 bg-transparent',
        label: 'text-primary-600 underline',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

type RootProps = Omit<ButtonRootProps, 'className' | 'variant'> &
  ButtonVariants & {
    className?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
  };
type HeroLabelProps = React.ComponentProps<typeof HeroButton.Label>;

type LabelProps = HeroLabelProps & {
  className?: string;
  children?: React.ReactNode;
};

const ButtonContext = createContext<{ variant?: ButtonVariants['variant'] } | null>(null);
const useButtonContext = () => useContext(ButtonContext) ?? {};

function ButtonRoot({ variant, className, children, isLoading = false, ...props }: RootProps) {
  const spinnerColor = String(useCSSVariable('--color-neutral-700'));

  const { root } = buttonStyles({ variant });

  return (
    <ButtonContext.Provider value={{ variant }}>
      <HeroButton
        className={cn(root(), props.isIconOnly && 'px-0', className)}
        pressableFeedbackVariant="ripple"
        pressableFeedbackRippleProps={{
          animation: {
            backgroundColor: { value: 'transparent' },
          },
        }}
        size={'lg'}
        {...props}
      >
        {isLoading ? (
          <Spinner
            color={variant === 'secondary' || variant === 'tertiary' ? spinnerColor : 'white'}
          />
        ) : (
          children
        )}
      </HeroButton>
    </ButtonContext.Provider>
  );
}

function ButtonLabel({ className, children }: LabelProps) {
  const { variant } = useButtonContext();
  const { label } = buttonStyles({ variant });

  return (
    <HeroButton.Label numberOfLines={1} className={cn(label(), className)}>
      {children}
    </HeroButton.Label>
  );
}

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
});
