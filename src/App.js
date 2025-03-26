import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <Box>
      <Header />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </Box>
  );
}

export default App;
