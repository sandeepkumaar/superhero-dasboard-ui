import { Outlet } from "react-router-dom";


//export async function action({ request }) {
//  console.log("App Action Called ::");
//  let formData = await request.formData();
//  let publisher = formData.get("publisher");
//  let { data: heroesByGender } = await fetchHeroesByProperty("gender", {
//    publisher,
//  });
//  let { data: heroesByAlignment } = await fetchHeroesByProperty("alignment", {
//    publisher,
//  });
//  let { data: heroesByRace } = await fetchHeroesByProperty("race", {
//    publisher,
//  });
//  return {
//    heroesByGender,
//    heroesByAlignment,
//    heroesByRace,
//  };
//}

export default function App() {

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="header sticky top-0 z-50 row-span-1 h-16 p-4 mb-4 bg-primary text-primary-foreground">
        <h4 className="scroll-m-20 text-xl tracking-tight">Super Hero App</h4>
      </header>
      <main className="main flex-1 pb-8 container ">
        <Outlet/>
      </main>
    </div>
  );
}

/*
*/
