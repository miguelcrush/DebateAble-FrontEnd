import type { NextPage } from 'next'
import { signOut, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {

  const { data: session } = useSession();

  const getApi = async () =>{
    var resp = await fetch("api/debates", {
      method:"POST",
      body: JSON.stringify({
        title:"Test"
      })
    });
  }

  if(session){
    return (
      <>
        Signed in as {session.user?.email}<br/>
        <button onClick={()=>{signOut()}}>Sign Out</button>
        <button onClick={()=>{getApi()}}>Test</button>
      </>
    )
  }
  else{
    return (
      <>
        Not signed in<br/>
        <button onClick={()=>{signIn()}}>Sign In</button>
      </>
    )
  }
}

export default Home
