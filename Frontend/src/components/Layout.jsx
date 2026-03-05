import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Movie Night Picker</p>
          <h1>Pick the perfect movie</h1>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
