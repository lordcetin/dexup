'use client'
export default function DashboardLayout({
  children,
  control,
  coingecko,
  cronjobs,
  users,
  earning
}:{
  children:React.ReactNode,
  control:React.ReactNode,
  coingecko:React.ReactNode,
  cronjobs:React.ReactNode,
  users:React.ReactNode,
  earning:React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div style={{display:'flex', flex:1, marginBottom:12}}>{control}</div>
      <div style={{ display: "flex" }} className="gap-x-4 max-md:flex-col">
        <div style={{ display:"flex", flexDirection: "column" }}>
          <div>{coingecko}</div>
        </div>
        <div style={{display: "flex",flex:1}} className="max-md:mt-4">{cronjobs}</div>
      </div>
      <div style={{ display: "flex" }} className="gap-x-4 max-md:flex-col">
        <div style={{ display:"flex", flexDirection: "column" }}>
          <div>{earning}</div>
        </div>
        <div style={{display: "flex",flex:1}}>{users}</div>
      </div>
    </div>
  )
}