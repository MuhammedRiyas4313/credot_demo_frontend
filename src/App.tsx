import RootProvider from "./providers/providers";
import Layout from "./routes/Layout";

function App() {
  return (
    <RootProvider>
      <Layout />;
    </RootProvider>
  );
}

export default App;
