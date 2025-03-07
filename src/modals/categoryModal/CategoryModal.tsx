import { categoryList, ICategoryList } from "@/e_shared/constants/categories";
import styles from "./CategoryModal.module.css";
import "../../app/globals.css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CategoryType } from "@/e_shared/types/types";
import { useAddTaskForm } from "@/store/addTaskForm/addTaskForm";

interface Props {
  classes?: string;
  setCategoryState: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      isSelected: boolean;
    }>
  >;
  handleChange: (value: ICategoryList) => void;
  value?: string;
}

const CategoryModal = ({ value, classes, setCategoryState, handleChange }: Props) => {
  const categoryRef = useRef<HTMLUListElement | null>(null);
  const setRefs = useAddTaskForm((state)=> state.setRefs);

  useEffect(() => {
    if(categoryRef.current){
      setRefs(categoryRef.current);
    }
    const timeOut = setTimeout(() => {
      const handleCLickOutside = (e: MouseEvent) => {
        e.stopPropagation();
        if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
          setCategoryState((prev) => ({ isOpen: false, isSelected: prev.isSelected }));
        }
      };

      document.addEventListener("click", handleCLickOutside);
      return () => {
        document.removeEventListener("click", handleCLickOutside);
      };
    }, 0);

    return ()=>{
      clearTimeout(timeOut);
    }
  }, []);

  return (
    <ul ref={categoryRef} className={`${styles.category_dropdown_container} ${classes ?? ""}`}>
      {categoryList.map((category) => {
        return (
          <li
            onClick={() => handleChange(category)}
            className={
              value === category.value
                ? `${styles.category_dropdown_list_item} ${styles.active}`
                : styles.category_dropdown_list_item
            }
            key={category.value}
          >
            {category.label.icon()}
            <span>{category.label.text}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryModal;
