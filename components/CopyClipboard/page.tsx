import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
  address:any
};

function CopyClipboard({address}: Props) {
  const [copied,setCopied] = useState<boolean>(false);
  useEffect(() => {
    if(copied){
      toast.success("Address copied!")
    }
  },[copied])
  return (
  <CopyToClipboard text={address} onCopy={() => setCopied(true)}><button type="button" className="slashed-zero outline-none flex items-center gap-x-1 text-xs bg-brandblack p-1 rounded-md hover:bg-brandblack/50">{address?.slice(0,5) + '...' + address?.slice(38)} <MdContentCopy className='transition-all hover:scale-75'/></button></CopyToClipboard>
  );
}

export default CopyClipboard;
