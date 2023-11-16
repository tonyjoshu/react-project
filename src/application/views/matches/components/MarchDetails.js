import { nbcLogoUrl } from "src/nbc-logo-url"
import format from 'date-fns/format'
const { Typography, Popover } = require("@mui/material")
const { useState } = require("react");
import Label from "src/application/shared/components/Label"
import Column from "src/application/shared/components/Column"
import Row from "src/application/shared/components/Row"
const { BsCalendarRange, BsChevronBarContract } = require("react-icons/bs")
const { GiGoalKeeper } = require("react-icons/gi")


const MatchDetails = ({ testData }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <div
        aria-owns={open ? "mouse-over-popover" : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="flex items-center gap-2 px-2 py-1 bg-gray-300 rounded-lg cursor-pointer "
      >
        <p className="text-xs font-bold">Match details</p>
        <BsChevronBarContract />
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Column style={{ padding: 20 }}>
          <Row a_center gap={10}>
            <BsCalendarRange style={{ width: 30 }} />
            <Label
              small
              noWrap
              text={`${format(new Date(testData.playing_date),'dd/MMM/yyyy')} at ${testData?.playing_time}`}
            />
          </Row>
          <Row a_center gap={10}>
            <GiGoalKeeper style={{ width: 30 }} />
            <Label small noWrap text={testData?.ground} />
          </Row>
          <Row a_center gap={10}>
            <img src={nbcLogoUrl} style={{ width: 30 }} alt={"nbc logo"} />
            <Label
              small
              noWrap
              text={`NBC Premier League, Round ${testData?.round.num}`}
            />
          </Row>
        </Column>
      </Popover>
    </>
  );
};

export default MatchDetails;
