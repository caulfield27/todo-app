import styles from "./Loader.module.css";

interface Props {
  size: "xs" | "s" | "m" | "l";
  color?: "primary" | "secondary";
}

const generateStyle = (size: string, color: string | undefined) => {
  const style: { [key: string]: string } = {};
  switch (size) {
    case "xs":
      style["width"] = "15px";
      break;
    case "s":
      style["width"] = "25px";
      break;
    case "m":
      style["width"] = "40px";
      break;
    case "l":
      style["width"] = "50px";
      break;
    default:
      style["width"] = "50px";
  }
  switch (color) {
    case "secondary":
      style["background"] = "conic-gradient(#0000 10%,#ffffff) content-box";
      break;
    default:
      style["background"] = "conic-gradient(#0000 10%,#f03355) content-box";
  }

  return style;
};

const Loader = ({ size, color }: Props) => {
  return (
    <div className={styles.loader_wrapper}>
      <div style={generateStyle(size, color)} className={styles.loader} />
    </div>
  );
};

export default Loader;
