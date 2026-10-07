import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function MainLayout({children}){

return(

<>

<Navbar/>

<div className="container py-4">

{children}

</div>

<Footer/>

</>

);

}