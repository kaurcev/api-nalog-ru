import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../Application";

export default function E404View() {
    const { setTitle } = useAppContext();
    useEffect(() => {
        setTitle("Страница не найдена")
    }, [setTitle])
    return (
        <>
            <Header />
            <main>
                <h1>404</h1>
                <p>Данная страница удалена или не существовала вовсе.</p>
                <Link to="/">На главную</Link>
            </main>
            <Footer />
        </>
    )
}