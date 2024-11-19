import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export const Principal = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    )
}