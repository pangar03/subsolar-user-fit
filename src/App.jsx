import { SubsolarProvider, useSubsolar } from "./contexts/SubsolarContext";
import QuizCard from "./components/QuizCard/quizCard";
import ResultCard from "./components/ResultCard/ResultCard";
import Simulator from "./components/Simulator/Simulator";

function AppScreens() {
    const { screen } = useSubsolar();
    // if (screen === "quiz") return <QuizCard />;
    // if (screen === "result") return <ResultCard />;
    if (screen === "simulator") return <Simulator />;
}
function App() {
    return (
        <>
            <SubsolarProvider>
                <AppScreens />
            </SubsolarProvider>
        </>
    );
}

export default App;
