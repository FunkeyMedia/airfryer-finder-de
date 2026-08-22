"use client";
type ErrorProps={error:Error&{digest?:string};reset:()=>void};
export default function GlobalError({reset}:ErrorProps){return <html lang="de"><body><main style={{maxWidth:720,margin:"80px auto",padding:24,fontFamily:"system-ui"}}><h1>Da ist etwas zu heiß geworden.</h1><p>Die Seite konnte gerade nicht geladen werden. Bitte versuche es noch einmal.</p><button onClick={reset} style={{padding:"12px 18px",border:0,borderRadius:10,background:"#073763",color:"white",fontWeight:700}}>Erneut versuchen</button></main></body></html>}
