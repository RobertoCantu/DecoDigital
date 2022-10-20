import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

type Props = {
  boxProps: BoxProps;
  children: React.ReactNode;
};

const Item = (props: BoxProps) => {
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      {props.children}
    </Box>
  );
};

export default Item;
