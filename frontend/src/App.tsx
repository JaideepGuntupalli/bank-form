import { Toaster } from "./components/ui/toaster";
import { ProfileForm } from "./parts/form";

function App() {
    return (
        <section className="container h-screen py-10">
            <ProfileForm />
            <Toaster />
        </section>
    );
}

export default App;
