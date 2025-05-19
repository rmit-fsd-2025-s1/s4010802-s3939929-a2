import Link from "next/link";
import Navigation from "../components/Navigation";

export default function Home() {
    return (
        <>
            <Navigation />
            <div className="container">
                <h1>Welcome to the TT Webpage</h1>
                <p>Select an option below:</p>
                <ul>
                    <li>
                        <Link href="/admin" className="button">
                            Admin Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/course" className="button">
                            Manage Courses
                        </Link>
                    </li>
                    <li>
                        <Link href="/user" className="button">
                            Manage Users
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
