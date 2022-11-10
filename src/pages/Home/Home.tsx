import "./Home.css"
import ColorPicker from "./components/ColorPicker/ColorPicker";
import AddButton from "./components/AddButton/AddButton";
import ColorsListPlaceholder from "./components/ColorsListPlaceholder/ColorsListPlaceholder";
// create a new component called Home
const Home = () => {

    return (
        <div className="app-layout">
        <h1 className="title">My Favorite Colors</h1>
        <div className="color-form"> <ColorPicker/> <AddButton/> </div>
        <div className="colors-section">
            <ColorsListPlaceholder/>
        </div>
        </div>
    );
    };

export default Home;