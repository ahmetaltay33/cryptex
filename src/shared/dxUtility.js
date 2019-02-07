import notify from 'devextreme/ui/notify';
import dialog from 'devextreme/ui/dialog';

export const dxNotify = (message, type = 'success') => {
  // The message's type: "info", "warning", "error" or "success"
  notify(message, type, 3000);
  /*notify({
    message: messsage,
    position: {
      my: 'right bottom',
      at: 'right bottom'
    }
  }, 'success', 3000);*/
};

export const dxAlert = (message = '', tittle = '', onOkClickHandle = null) => {
  dialog.alert(message, tittle)
    .done(() => {
      if (onOkClickHandle)
        onOkClickHandle();
    });
};

export const dxConfirm = (message = '', tittle = '', onYesClickHandle = null, onNoClickHandle = null) => {
  dialog.confirm(message, tittle)
    .done((result) => {
      if (result) {
        if (onYesClickHandle)
          onYesClickHandle();
      }
      else {
        if (onNoClickHandle)
          onNoClickHandle();
      }
    });
};