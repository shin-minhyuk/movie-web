import styles from './style.module.scss'

export default function DetailSectionLayout({ children }) {
  return (
    <div className={styles.home_inner}>
      <div>{children}</div>
    </div>
  )
}
