import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/SignIn/Signin';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { SendMoney } from './pages/SendMoney/SendMoney';
import Drawer from './components/Drawer';
import { Home } from './pages/Home/Home';
import CurrencyExchange from './pages/CurrencyExchange/CurrencyExchange';
import ExpenseTracker from './Expense Tracker/pages/ExpenseTracker';



function App() {


  return (
    <BrowserRouter>
    <Drawer/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup  />}></Route>
        <Route path="/signin" element={<Signin  />}></Route>
        <Route path="/dashboard" element={<Dashboard  />}></Route>
        <Route path="/send" element={<SendMoney  />}></Route>
        <Route path="/exchange" element = {<CurrencyExchange />}></Route>
        <Route path="/budget" element = {<ExpenseTracker />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
