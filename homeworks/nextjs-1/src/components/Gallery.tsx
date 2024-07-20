import { useState } from "react";
import type { Avatar } from "@/types";
import styles from "@/styles/Gallery.module.css";
import ImageContainer from "./ImageContainer";
import Adder from "./Adder";

export default function Gallery({ data }: { data: Array<Avatar> }) {
  const [avatars, setAvatars] = useState(data);

  async function handleAdderClick() {
    try {
      const avatar = await getUniqueAvatar(avatars);
      setAvatars([...avatars, avatar]);
    } catch (e) {
      console.log('an error occured');
    }
  }

  async function handleRefreshClick(key: number) {
    try {
      const avatar: Avatar = await getUniqueAvatar(avatars);
      setAvatars(avatars?.map(a => {
        if (a.id === key) {
          return avatar;
        }
        return a;
      }));
    } catch (e) {
      console.log('an error occured');
    }
  }

  async function handleRefreshAllClick() {
    try {
      const res = await fetch(`https://tinyfac.es/api/data?limit=${avatars.length}&quality=0`);
      const data = await res.json();
      if (!data) {
        throw new Error('data cannot be parsed');
      }
      setAvatars(data);
    } catch (e) {
      console.log('an error occured');
    }
  }

  return (
    <div className={styles.gallery}>
      {avatars?.map((avatar) => 
        <ImageContainer key={avatar.id} avatar={avatar} onRefreshClick={handleRefreshClick} />
      )}
      <Adder onAdderClick={handleAdderClick}/>
      <button className={styles['refresh-all-btn']} onClick={handleRefreshAllClick}>
        Refresh All
      </button>
    </div>
  )
}

async function getUniqueAvatar(avatars: Array<Avatar>, batchSize: number = 10) {
  while (true) {
    const res = await fetch(`https://tinyfac.es/api/data?limit=${batchSize}&quality=0`);
    const data = await res.json();
    if (!data) {
      throw new Error('data cannot be parsed');
    }
    for (const av of data) {
      if (!avatars.find(a => a.id === av.id)) {
        return av;
      }
    }
  }
}