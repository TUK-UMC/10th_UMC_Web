import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

export default function ContextPage () {
    
    return (
        <ThemeProvider className = 'flex flex-col items-center justify-center min-h-screen'>
          <div>
             <Navbar />
             <main className = "flex-1 w-full">
                <ThemeContent />
             </main>
          </div>
        </ThemeProvider>
    );
}