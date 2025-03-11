import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from './Filters.module.css';
import { filterList } from './data';

const Filters = () => {
    
    return <div role="button" className={styles.filters_container}>
        <FilterAltIcon/>
        <span>Фильтры</span>
        <ul>
            {filterList.map((elem)=> <li value={elem.value}>{elem.label}</li>)} 
        </ul>
    </div>;
}   
 
export default Filters;