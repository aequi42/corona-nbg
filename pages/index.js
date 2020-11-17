import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Chart, transform } from "../components/chart";
import { useCoronaData } from "../components/useCoronaData";

export default function Home() {
  const data = useCoronaData();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Corona in Nürnberg</h1>
        <p>test</p>
        {data.length && <Chart data={transform(data)} />}

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
