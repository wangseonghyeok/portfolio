import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
            <header id="header" className="header">
                <gnb>
                    <Link to="/"></Link>
                </gnb>
            </header>
        </>
    );
}
