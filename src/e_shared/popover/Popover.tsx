import styles from "./Popover.module.css";
import "../../app/globals.css";
import { useEffect, useRef } from "react";

interface Props {
  content: string;
  bg?: "white" | "black";
  closed?: boolean
}

const Popover = ({ content, bg, closed = true}: Props) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = popoverRef.current?.parentElement;

    if(!parent || !popoverRef.current) return;
    
    popoverRef.current.style.setProperty('--triangle-color', `${bg === 'white' ? '#ffffff' : '#000000'}`)
    
    const handleMouseOver = () => {
      popoverRef.current?.style.setProperty('display', 'block');
    };

    const handleMouseLeave = () => {
      popoverRef.current?.style.setProperty('display', 'none');
    };

    parent?.addEventListener("mouseover", handleMouseOver);
    parent?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent?.removeEventListener("mouseover", handleMouseOver);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={popoverRef}
      style={bg === "white" ? { background: "#ffffff" } : { background: "#000000" }}
      className={styles.popover}
    >
      <p style={bg === "white" ? { color: "#000000" } : { color: "#ffffff" }}>{content}</p>
    </div>
  );
};

export default Popover;
