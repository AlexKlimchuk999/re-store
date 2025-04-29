import { Routes, Route, Link } from 'react-router-dom';
import ShopHeader from '../shop-header/shop-header';
import Home from '../pages/home'
import Card from '../pages/card'

const App = () => {
    return(
        <main role="main" className='container'>
            <ShopHeader numItems={5} total={210}/>
            <nav>
                <Link to="/">Home</Link> | <Link to="/card">Card</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/card" element={<Card />} />
            </Routes>
        </main>
    ) 
}

export default App;