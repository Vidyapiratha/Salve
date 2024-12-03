import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useRef } from "react";

export enum SortOption {
  ID = "id",
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  DATE_OF_BIRTH = "date_of_birth",
}

const sortOptionsMap: Record<SortOption, string> = {
  [SortOption.ID]: "Id",
  [SortOption.FIRST_NAME]: "First Name",
  [SortOption.LAST_NAME]: "Last Name",
  [SortOption.DATE_OF_BIRTH]: "Date Of Birth",
};

interface PopperProps {
  setSortBy: Function;
  isopen: boolean;
  sortBy: string;
  setOpen: Function;
  anchorRef: React.RefObject<HTMLButtonElement>;
  handleToggle: () => void;
  handleClose: (event: Event | React.SyntheticEvent) => void;
  handleListKeyDown: (event: React.KeyboardEvent) => void;
}

export default function MenuPopper(props: PopperProps) {
  const prevOpen = useRef(props.isopen);

  const handleSelection = (value: string) => {
    props.setSortBy(value);
  };
  useEffect(() => {
    if (prevOpen.current === true && props.isopen === false) {
      props.anchorRef.current!.focus();
    }

    prevOpen.current = props.isopen;
  }, [props.isopen, props.anchorRef]);

  return (
    <Popper
      open={props.isopen}
      anchorEl={props.anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={props.handleClose}>
              <MenuList
                autoFocusItem={props.isopen}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={props.handleListKeyDown}
                style={{ padding: "15px" }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={props.sortBy}
                  >
                    {Object.entries(sortOptionsMap).map(([key, label]) => (
                      <FormControlLabel
                        key={key}
                        value={key}
                        control={<Radio />}
                        label={label}
                        onClick={(event) => {
                          handleSelection(key);
                          props.handleClose(event);
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
