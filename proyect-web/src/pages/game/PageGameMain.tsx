import { Box } from "@mui/material";
import { PageTitleGame } from "../../components/atoms/PageTitleGame";
import { ReactElement, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppStore } from "../../redux/store.type";
import { PageMasterRecruitment } from "./master/PageMasterRecruitment";
import { PagePlayerRecruitment } from "./player/PagePlayerRecruitment";
import { GamePhaseEnum, PlayerRolEnum } from "../../services/api/api.enum";
import { PageMasterWordPhase } from "./master/PageMasterWordPhase";
import { PagePlayerWord } from "./player/PagePlayerWord";





const masterViews: Record<GamePhaseEnum, ReactElement> = {
    [GamePhaseEnum.RECRUITMENT]: <PageMasterRecruitment />,
    [GamePhaseEnum.WORDS]: <PageMasterWordPhase />,
    [GamePhaseEnum.STARTING]: <PageMasterRecruitment />,
    [GamePhaseEnum.VOTING]: <PageMasterRecruitment />,
    [GamePhaseEnum.VOTING_RESULTS]: <PageMasterRecruitment />,
    [GamePhaseEnum.FINISHED]: <PageMasterRecruitment />,
};

const playerViews: Record<GamePhaseEnum, ReactElement> = {
    [GamePhaseEnum.RECRUITMENT]: <PagePlayerRecruitment />,
    [GamePhaseEnum.WORDS]: <PagePlayerWord />,
    [GamePhaseEnum.STARTING]: <PagePlayerRecruitment />,
    [GamePhaseEnum.VOTING]: <PagePlayerRecruitment />,
    [GamePhaseEnum.VOTING_RESULTS]: <PagePlayerRecruitment />,
    [GamePhaseEnum.FINISHED]: <PagePlayerRecruitment />
}

/**
 * Master view of the game recruitment page
 * @returns 
 */
export const PageGameMain = () => {

    const currentParty = useSelector((store: IAppStore)=> store.party.party);
    const player = useSelector((store: IAppStore)=> store.auth.auth?.playerInfo);

    const playerRole: PlayerRolEnum = useMemo(()=>{
        if(player){
            return player.rol;
        } else {
            return PlayerRolEnum.PLAYER;
        }
    },[player])

    /**
     * Es la página que se encuentra actualmente activa
     */
    const mainPage: ReactElement = useMemo(()=>{
        if(!currentParty){
            return <Box/>
        }
        //Comprueba si la fase de juego es una de las fases del juego
        if(Object.values(GamePhaseEnum).includes(currentParty.gamePhase as GamePhaseEnum)){
            if(playerRole === PlayerRolEnum.PLAYER){
                return playerViews[currentParty.gamePhase as GamePhaseEnum];
            } else {
                return masterViews[currentParty.gamePhase as GamePhaseEnum];
            }
        }

        return <Box/>
    },[currentParty, playerRole])

    return (
        <Box
            width={'100%'}
            height={'100%'}>
            {/* Head */}
            <PageTitleGame />
            {/* Game info */}
            <Box
                height={'85%'}
                width={'100%'}>
                {mainPage}
            </Box>
            {/* Start game button */}
        </Box>
    );
};