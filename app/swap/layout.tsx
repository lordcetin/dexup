
export default function SwapLayout({
  children,
  chart,
  comments,
  details,
  iframes,
  honeypot,
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
  honeypot:React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div style={{display:'flex', flex:1}}>{shortdetail}</div>
      <div style={{ display: "flex" , flexDirection:'column'}} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
        <div style={{ display:"flex", flex:1 }} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
          <div>{details}</div>
          <div>{chart}</div>
          <div>{comments}</div>
        </div>
        <div style={{ display:"flex", flex:1 }} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
          <div>{iframes}</div>
          <div>{traders}</div>
        </div>
      </div>
    </div>
  )
}