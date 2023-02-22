import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react";

function PopupDialog({open, close, title, content}) {
  return (
    <Dialog open={open}>
      <DialogTitle className="text-primary">{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={close}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopupDialog;
