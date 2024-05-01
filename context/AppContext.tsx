/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, ReactNode, useState, useEffect} from 'react';

interface UserProfile{
  id:    string   
  userId: string   
  token: string
  name:  string
  image: string
  count: number
  history: any
}

type AppContextType = {
  // Burada state veya fonksiyonların tanımlarını ekleyin
  isOpenSidebar: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isWallet: boolean;
  setIsWallet: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;
  baseCoinId:string;
  setBaseCoinId:React.Dispatch<React.SetStateAction<string>>;
  tokenBSymbol:string;
  setBTokenSymbol:React.Dispatch<React.SetStateAction<string>>;
  tokenQSymbol:string;
  setQTokenSymbol:React.Dispatch<React.SetStateAction<string>>;
  netchain:string;
  setChain:React.Dispatch<React.SetStateAction<string>>;
  details: boolean;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  editModal: boolean;
  setEditDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  networkId:string;
  setNetworkId:React.Dispatch<React.SetStateAction<string>>;
  networkShort:string;
  setNetworkShort:React.Dispatch<React.SetStateAction<string>>;
  networkSymbol:string;
  setNetworkSymbol:React.Dispatch<React.SetStateAction<string>>;
  isChart: string[] | any;
  setIsChart:React.Dispatch<React.SetStateAction<string[] | any>>;
  selectedProfileID:string;
  setSelectedProfileID:React.Dispatch<React.SetStateAction<string>>;
  littleMovieDatas: UserProfile | string[] | any;
  setLittleMovieDatas:React.Dispatch<React.SetStateAction<UserProfile | string[] | any>>;
  globalPlayedSeconds: any;
  setGlobalPlayedSeconds:React.Dispatch<React.SetStateAction<any>>;
  movie: any;
  setMovie:React.Dispatch<React.SetStateAction<any>>;
  val:any;
  setVal:React.Dispatch<React.SetStateAction<any>>;
  search:any;
  setSearch:React.Dispatch<React.SetStateAction<any>>;
  searchmodal: boolean;
  setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  showsearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showAccountMenu: boolean;
  setShowAccountMenu: React.Dispatch<React.SetStateAction<boolean>>;

};

const AppContext = createContext<AppContextType | any | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isOpenSidebar, setSidebarToggle] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [isActive, setActive] = useState('gainers');
  const [isMuted, setMute] = useState(true);
  const [networkId, setNetworkId] = useState('');
  const [networkShort, setNetworkShort] = useState('');
  const [networkSymbol, setNetworkSymbol] = useState('');
  const [baseCoinId, setBaseCoinId] = useState('');
  const [quoteCoinId, setQuoteCoinId] = useState('');
  const [tokenBSymbol, setBTokenSymbol] = useState('');
  const [tokenQSymbol, setQTokenSymbol] = useState('');
  const [netchain, setChain] = useState('');
  const [details,setOpenDetails] = useState(false);
  const [editModal,setEditDetailsModal] = useState(false);
  const [isChart, setIsChart] = useState<string[] | any>([]);
  const [selectedProfileID, setSelectedProfileID] = useState<string>('');
  const [selectedProfileDetails, setSelectedProfileDetails] = useState<UserProfile | string[] | any>([]);
  const [littleMovieDatas, setLittleMovieDatas] = useState<UserProfile | string[] | any>([]);
  const [globalPlayedSeconds, setGlobalPlayedSeconds] = useState<any>([]);
  const [movie, setMovie] = useState<any>([]);
  const [val,setVal] = useState<any>(false);
  const [searchmodal,setSearchModal] = useState(false);
  const [search,setSearch] = useState<Record<string, any>[]>([]);
  const [showSearch,setShowSearch] = useState(false);
  const [showAccountMenu,setShowAccountMenu] = useState(false);


  return (
    <AppContext.Provider
    value={{ 
      isMuted,
      networkId,
      setNetworkId,
      networkShort,
      setNetworkShort,
      networkSymbol,
      setNetworkSymbol,
      setBTokenSymbol,
      setQTokenSymbol,
      tokenBSymbol,
      tokenQSymbol,
      setMute,
      isActive,
      setActive,
      isOpenSidebar,
      setSidebarToggle,
      isWallet,
      setIsWallet,
      baseCoinId, setBaseCoinId,
      quoteCoinId, setQuoteCoinId,
      netchain,setChain,
      details,setOpenDetails,
      editModal,setEditDetailsModal,
      isChart,setIsChart,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
