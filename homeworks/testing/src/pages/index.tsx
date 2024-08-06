import Head from "next/head";
import TodoApp from "@/components/TodoApp/TodoApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoApp />
    </>
  );
}
