import styles from "@/styles/Gallery.module.css";
import Image from "next/image";

export default function Adder(props: { onAdderClick: () => void }) {
  return (
    <button className={`${styles.tile} ${styles.adder}`} onClick={props.onAdderClick}>
      <Image
        src="/add.svg"
        width={70}
        height={70}
        alt="add sign"
        className={styles['adder__img']}
      />
    </button>
  );
}