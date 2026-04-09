import React from 'react';
import { Text } from 'react-native-paper';
import { Portal, Dialog, Button } from 'react-native-paper';

export default function ConfirmDialog({ visible, onDismiss, title, message, confirmLabel = 'Confirmar', onConfirm }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onConfirm} textColor="#dc2626">{confirmLabel}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
