import React ,{useContext,useEffect}from 'react'
import OwnerContext from '../../store/AuthOwner'
import ClientContext from '../../store/AuthClient'
import Header from './Header';
import ClientHeader from './ClientHeader';
// import './HeaderLayout.css'
import './Header.css'
import OwnerHeader from './OwnerHeader';
function HeaderLayout( props) {
    const ClientCtx=useContext(ClientContext);
    const OwnerCtx=useContext(OwnerContext);
    const loginned=(OwnerCtx.isAuth||ClientCtx.isAuth)
    useEffect(()=>{
    console.log(ClientCtx.isAuth+ "client is loged in");

    },[]);
    // console.log(NotLoggedIn)
  return (
    <>
       <div className='Nav-header'>
     <div className='Mealify'>Mealify</div>
     {OwnerCtx.isAuth&&<OwnerHeader/>}
     {ClientCtx.isAuth&&<ClientHeader/>}
     {!OwnerCtx.isAuth&&!ClientCtx.isAuth&&<Header/>}
     </div>
     </>
  )
}

export default HeaderLayout