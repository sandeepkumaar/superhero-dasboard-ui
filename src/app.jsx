import { Outlet, Link } from "react-router-dom";
import { Button } from '@/components/ui/button.jsx'


export default function App() {

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="header sticky top-0 z-50 row-span-1 h-16 mb-4 bg-primary text-primary-foreground">
        <div className="flex">
          <h5 className="scroll-m-20 tracking-tight p-4">
            <Button className="text-lg text-primary-foreground" variant="link"><Link to='/dashboard'>Dashboard</Link></Button>
          </h5>
          <h5 className="scroll-m-20 tracking-tight p-4">
            <Button className="text-lg text-primary-foreground" variant="link"><Link to='/superhero-table'>Heroes</Link></Button>
          </h5>
        </div>
      </header>
      <main className="main flex-1 pb-8 container ">
        <Outlet/>
      </main>
    </div>
  );
}

