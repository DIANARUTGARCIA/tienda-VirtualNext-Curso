import { createContext} from 'react'

interface ContexProps {
   isMenuOpen: boolean;
   //Metodos
   toggleSideMenu: ()=> void
}

export const UiContext = createContext({} as ContexProps)