import styles from './style.module.scss'

export default function Title({ text }) {
  return (
    <div className={styles.title_box}>
      <h1 className="text-[24px] ">{text}</h1>
      <div className="bg-[red] w-[100px] h-[5px]"></div>
    </div>
  )
}
