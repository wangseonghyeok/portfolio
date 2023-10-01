import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
            <header id="header" className="header">
                <h1>
                    <Link to="/"></Link>
                </h1>
            </header>
        </>
    );
}
