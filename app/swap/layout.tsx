
export default function SwapLayout({
  children,
  chart,
  comments,
  details,
  iframes,
  traders,
  shortdetail,
}:{
  children:React.ReactNode,
  chart:React.ReactNode,
  comments:React.ReactNode,
  details:React.ReactNode,
  iframes:React.ReactNode
  traders:React.ReactNode
  shortdetail:React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div style={{display:'flex', flex:1}}>{shortdetail}</div>
      <div style={{ display: "flex" }} className="gap-x-2 max-md:flex-col">
        <div style={{ display:"flex", flexDirection: "column" }}>
          <div>{details}</div>
          <div>{chart}</div>
        </div>
        <div style={{display: "flex",flex:1}}>{iframes}</div>
      </div>
      <div style={{ display: "flex" }} className="gap-x-2 max-md:flex-col">
        <div style={{ display:"flex", flexDirection: "column" }}>
          <div>{traders}</div>
        </div>
        <div style={{display: "flex",flex:1}}>{comments}</div>
      </div>
    </div>
  )
}