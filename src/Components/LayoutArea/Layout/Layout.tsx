import Divider from "@mui/material/Divider";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    return (
        
        <div className="Layout">
            <Header />
            <Divider variant="middle"/>
            <main>
                <Routing />
            </main>
            <Divider variant="middle"/>
            <Footer />
        </div>
    );
}

export default Layout;
