import { CircularProgress } from "@mui/material";
import styles from "./CommunityLoader.module.css"

export const CommunityLoader = () => {
    return <div className={styles.loader_container}>
        <CircularProgress/>
    </div>;
}
 
export default CommunityLoader;