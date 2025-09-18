import NavBar from "./NavBar";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <ListBox />
        <WatchedBox />
      </main>
    </>
  );
}
