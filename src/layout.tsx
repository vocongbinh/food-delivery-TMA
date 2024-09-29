
import { TonConnectButton } from '@tonconnect/ui-react'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='flex flex-col gap-4 container'>
        <TonConnectButton className='self-end'/>
        <Outlet/>
    </div>
  )
}

export default Layout