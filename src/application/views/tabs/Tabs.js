import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabComponent({ value, handleChange, tabs, centered, backgroundColor })
{
  return (
    <Box
      sx={ {
        width: "100%",
        bgcolor: backgroundColor ?? "background.paper",
      } }
    >
      <Tabs
        value={ value }
        onChange={ handleChange }
        variant={ centered ? "standard" : "scrollable" }
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        centered={ centered }
      >
        { tabs.map((tab, index) => (
          <Tab
            key={ index }
            label={ tab }
            style={ { textTransform: "capitalize" } }
          />
        )) }
      </Tabs>
    </Box>
  );
}

export default TabComponent;
