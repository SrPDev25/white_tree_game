import { Box } from "@mui/material";
import { PageTitleGame } from "../../components/atoms/PageTitleGame";



/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PageMasterRecruitment = () => {

    return (
        <Box
            width={'100%'}
            height={'100%'}>
            {/* Head */}
            <PageTitleGame />
            {/* Game info */}
            <Box
                height={'85%'}>

            </Box>
            {/* Start game button */}
        </Box>
    );
};