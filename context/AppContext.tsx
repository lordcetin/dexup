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
  littleanimeId:string;
  setLittleMovieId:React.Dispatch<React.SetStateAction<string>>;
  movieUrl:string;
  setMovieUrl:React.Dispatch<React.SetStateAction<string>>;
  networkId:string;
  setNetworkId:React.Dispatch<React.SetStateAction<string>>;
  networkShort:string;
  setNetworkShort:React.Dispatch<React.SetStateAction<string>>;
  networkSymbol:string;
  setNetworkSymbol:React.Dispatch<React.SetStateAction<string>>;
  selectedProfileID:string;
  setSelectedProfileID:React.Dispatch<React.SetStateAction<string>>;
  selectedProfileDetails: UserProfile | string[] | any;
  setSelectedProfileDetails:React.Dispatch<React.SetStateAction<UserProfile | string[] | any>>;
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
  const [movieUrl, setMovieUrl] = useState('');
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
      setMute,
      isActive,
      setActive,
      isOpenSidebar,
      setSidebarToggle,
      isWallet,
      setIsWallet,
      baseCoinId, setBaseCoinId,
      quoteCoinId, setQuoteCoinId
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
