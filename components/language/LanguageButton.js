import React from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import {useRouter} from "next/router";
import VnIcon from "assets/icons/VN.svg";
import UKIcon from "assets/icons/UK.svg";
function LanguageButton() {
  const router = useRouter();
  const {pathname, asPath, query, locale} = router;

  const handleChange = (nextLocale) => {
    router.push({pathname, query}, asPath, {locale: nextLocale.target.value});
  };

  return (
    <div>
      <FormControl sx={{minWidth: 50}}>
        <Select
          size="small"
          value={locale}
          onChange={handleChange}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {border: 0},
            ".MuiSelect-select": {
              paddingLeft: "14px !important",
              paddingTop: "8px !important",
              paddingBottom: "6px !important",
              paddingRight: "14px !important",
            },
          }}
          inputProps={{IconComponent: () => null}}
        >
          <MenuItem
            value={"en"}
            sx={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <UKIcon />
          </MenuItem>
          <MenuItem
            value={"vi-VN"}
            sx={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <VnIcon />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

LanguageButton.propTypes = {};

export default LanguageButton;
