
import { AppProviders } from "@/components/app/AppProviders";
import { AppWithTracking } from "@/components/app/AppWithTracking";

function App() {
  return (
    <AppProviders>
      <AppWithTracking />
    </AppProviders>
  );
}

export default App;
