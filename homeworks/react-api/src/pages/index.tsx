import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FormEvent, useContext, useEffect, useReducer, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { createContext, Dispatch } from "react";
import { TodoProvider } from './TodoProvider';
import { TodoApp } from './TodoApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </>
  );
}

