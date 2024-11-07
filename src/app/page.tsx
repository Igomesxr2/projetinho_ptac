"use client"
import Header from "./components/Header";
import styles from './styles/page.module.css'
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';


export default function Home() {

  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <div className={styles.content}>
      <Header />
      <p>Teste</p>
    </div>
  );
}
