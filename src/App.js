import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista total 
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque (featured)
      let originals = list.filter(i=>i.slug === 'originals');

      //pegar o numero aleatorio e diminuir 1, visto que o array não termina no 10
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));

      //pegar aleatoriamente um nome
      let chosen = originals[0].items.results[randomChosen];

      //informacoes adicionais
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }
    

    loadAll();
  }, []);


  //monitoramento da própria página 
  useEffect(()=> {
    //monitorar o scroll da tela - acima de algum valor - setar como true
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    //remoção quando sair da página 
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  return (
    <div className="page">

    <Header black={blackHeader} />

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }
      
      {/* Header
      destaque
      as listas
      Rodapé básico */}
      <section className="lists">
        {movieList.map((item, key)=> (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> pela B7 Web. <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org.
      </footer>
      
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando"></img>
        </div>
      }
    </div>
  )
}