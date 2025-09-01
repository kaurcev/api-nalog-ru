import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useAppContext } from "../Application";
import ApiDocs from "../components/ApiDocs";

export default function DocsView() {
    const { setTitle } = useAppContext();
    useEffect(() => {
        setTitle("Docs")
    }, [setTitle])
    return (
        <>
            <Header />
            <main>
                <ApiDocs />
            </main>
            <Footer />
        </>
    )
}