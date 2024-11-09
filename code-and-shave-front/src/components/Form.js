import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Form = () => {
    return (
        <div>
            <Box>
                <Outlet />
            </Box>
        </div>
    );
}