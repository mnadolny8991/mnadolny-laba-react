import Image from "next/image";
import type { Avatar } from "@/types";
import styles from "@/styles/Gallery.module.css";

export default function ImageContainer({ avatar, onRefreshClick}: 
  { 
    avatar: Avatar, 
    onRefreshClick: (id: number) => void
  }) {
  return (
    <div className={styles['image-container']} onClick={() => onRefreshClick(avatar.id)}>
      <Image
        src={avatar?.url}
        width={240}
        height={240}
        alt="avatar"
        className={`${styles.avatar} ${styles.tile}`}
      />
      <button className={styles['refresh-btn']}>
        <Image
          src="/refresh.svg"
          width={100}
          height={104}
          alt="refresh image"
          className={styles['refresh-btn__img']}
        />
      </button> 
    </div>
  );
}