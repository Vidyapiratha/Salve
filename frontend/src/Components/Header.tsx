import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuPopper from "./MenuPopper";
import { Clinic } from "../Types/Clinic";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRef, useState } from "react";
import { FilterListOutlined } from "@mui/icons-material";

interface HeaderProps {
  sortBy: string;
  clinicData: Clinic[];
  selectedClinic: Clinic | undefined;
  setSelectedClinic: Function;
  setSortBy: Function;
}

export default function Header(props: HeaderProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const clinicsData: Clinic[] = props.clinicData;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleSelection = (event: SelectChangeEvent<string>) => {
    const selectedId = parseInt(event.target.value, 10);
    console.log("selectedId", selectedId);

    const selectedClinic = clinicsData.find((clinic) => {
      return Number(clinic.id) === selectedId;
    });
    console.log("selectedClinic", selectedClinic);

    if (selectedClinic) {
      props.setSelectedClinic(selectedClinic);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#8665e3",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "8px", sm: "16px" },
          }}
        >
          <Select
            label="Clinic"
            defaultValue={`${props.selectedClinic?.id}`}
            value={`${props.selectedClinic?.id}`}
            name={props.selectedClinic?.name}
            onChange={handleSelection}
            sx={{
              fontSize: { color: "inherit", xs: "12px", sm: "16px" },
              outlineColor: "inherit",
            }}
          >
            {clinicsData.map((clinic) => {
              return (
                <MenuItem color="inherit" key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </MenuItem>
              );
            })}
          </Select>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: { xs: "14px", sm: "20px" },
            }}
          >
            {props.selectedClinic?.name} Clinic Center
          </Typography>
          <Button
            ref={anchorRef}
            color="inherit"
            onClick={handleToggle}
            sx={{
              fontSize: { xs: "12px", sm: "16px" },
              padding: { xs: "8px 10px", sm: "10px 16px" },
            }}
          >
            <FilterListOutlined style={{ marginRight: "5px" }} />
            Sorted By {props.sortBy}
          </Button>
          <MenuPopper
            sortBy={props.sortBy}
            setSortBy={props.setSortBy}
            isopen={open}
            setOpen={setOpen}
            handleToggle={handleToggle}
            anchorRef={anchorRef}
            handleClose={handleClose}
            handleListKeyDown={handleListKeyDown}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
