import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Platform } from 'react-native';
import ForgotPasswordScreen, {
  PASSWORD_RESET_GENERIC_SUCCESS,
} from '@/src/screens/auth/ForgotPasswordScreen';
import { Brand } from '@/src/theme/brand';

export { PASSWORD_RESET_GENERIC_SUCCESS };

export type ForgotPasswordProps = React.ComponentProps<typeof ForgotPasswordScreen>;

/** @deprecated Prefer `ForgotPasswordScreen` from `@/src/screens/auth/ForgotPasswordScreen` — kept for route compatibility. */
export default function ForgotPassword(props: ForgotPasswordProps) {
  return <ForgotPasswordScreen {...props} />;
}

export type ForgotPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
  initialEmail?: string;
  loginEmailHint?: string;
};

/** Non-blocking sheet over the current screen — same flow as full-page routes. */
export function ForgotPasswordModal({
  visible,
  onClose,
  initialEmail = '',
  loginEmailHint = '',
}: ForgotPasswordModalProps) {
  const [instance, setInstance] = useState(0);
  useEffect(() => {
    if (visible) setInstance((k) => k + 1);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <ForgotPasswordScreen
            key={instance}
            initialEmail={initialEmail}
            loginEmailHint={loginEmailHint}
            onClosePress={onClose}
            compact
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Brand.radiusLg,
    borderTopRightRadius: Brand.radiusLg,
    paddingHorizontal: Brand.space,
    paddingTop: Brand.space,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    maxHeight: '88%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 16 },
      default: {},
    }),
  },
});
