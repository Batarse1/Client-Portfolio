import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <main className={styles.background}>
      <h2>Error 404</h2>
      <p>Lo sentimos, pero el recurso que busca no existe.</p>
    </main>
  );
}

export default NotFound;
