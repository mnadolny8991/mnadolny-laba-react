import styles from '@/styles/Home.module.css';

export function Search({ onValueChange }: { onValueChange: (e: any) => void}) {
  return (
    <div className={styles['search']}>
      <label htmlFor="search-value">Search</label><br />
      <input 
        className={styles['search__input']} 
        onChange={e => onValueChange(e)}
        id='search-value'
      />
    </div>
  );
}