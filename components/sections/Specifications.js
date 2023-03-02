import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {Tab, Tabs, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Specifications({windows, macos}) {
  const {t} = useTranslation();
  console.log("windows :", windows);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-background-secondary py-4">
      <Box sx={{marginLeft: 5}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {windows.length !== 0 && <Tab label="Windows" {...a11yProps(0)} />}
          {macos.length !== 0 && <Tab label="MacOS" {...a11yProps(1)} />}
        </Tabs>
      </Box>
      {windows.length !== 0 && (
        <TabPanel value={value} index={0}>
          <div className="flex space-x-2">
            {windows[0].__typename === "ComponentSpecificationsMinimum" && (
              <div className="w-1/2 px-5">
                <p className="uppercase pb-4">{t("minimum")}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-secondary">OS</p>
                    <p>{windows[0].OS}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Processor</p>
                    <p>{windows[0].Processor}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Memory</p>
                    <p>{windows[0].Memory}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Storage</p>
                    <p>{windows[0].Storage}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Graphics</p>
                    <p>{windows[0].Graphics}</p>
                  </div>
                </div>
              </div>
            )}
            {windows[1].__typename === "ComponentSpecificationsRecommended" && (
              <div className="w-1/2 px-5">
                <p className="uppercase pb-4">{t("recommended")}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-secondary">OS</p>
                    <p>{windows[1].OS}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Processor</p>
                    <p>{windows[1].Processor}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Memory</p>
                    <p>{windows[1].Memory}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Storage</p>
                    <p>{windows[1].Storage}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Graphics</p>
                    <p>{windows[1].Graphics}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabPanel>
      )}
      {macos.length !== 0 && (
        <TabPanel value={value} index={1}>
          <div className="flex space-x-2">
            {macos[0].__typename === "ComponentSpecificationsMinimum" && (
              <div className="w-1/2 px-5">
                <p className="uppercase pb-4">{t("minimum")}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-secondary">OS</p>
                    <p>{macos[0].OS}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Processor</p>
                    <p>{macos[0].Processor}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Memory</p>
                    <p>{macos[0].Memory}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Storage</p>
                    <p>{macos[0].Storage}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Graphics</p>
                    <p>{macos[0].Graphics}</p>
                  </div>
                </div>
              </div>
            )}
            {macos[1].__typename === "ComponentSpecificationsRecommended" && (
              <div className="w-1/2 px-5">
                <p className="uppercase pb-4">{t("recommended")}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-secondary">OS</p>
                    <p>{macos[1].OS}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Processor</p>
                    <p>{macos[1].Processor}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Memory</p>
                    <p>{macos[1].Memory}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Storage</p>
                    <p>{macos[1].Storage}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Graphics</p>
                    <p>{macos[1].Graphics}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabPanel>
      )}
    </div>
  );
}

Specifications.propTypes = {};

export default Specifications;
