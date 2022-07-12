import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <img
            className='w-44 object-contain cursor-pointer'
            src='https://links.papareact.com/yvf'
            alt='logo'
          />
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5'>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Follow</h3>
        </div>{' '}
      </div>
      <div></div>
    </header>
  )
}

export default Header
