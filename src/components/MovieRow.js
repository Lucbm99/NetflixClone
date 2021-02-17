import React, {useState} from 'react';
import './MovieRow.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default ({title,items}) => {
    const [scrollX, setScrollX] = useState(0);

    //diminuir o margin left até 0
    const handleLeftArrow = () =>  {
        //cada clique será metade da tela do cara -- facilita no celular
        let valor_scroll = scrollX + Math.round(window.innerWidth / 2);
        
        //limite
        if(valor_scroll > 0) {
            valor_scroll = 0;
        }
        setScrollX(valor_scroll);
    }


    const handleRightArrow = () => {
        let valor_scroll = scrollX - Math.round(window.innerWidth / 2);
        //largura total da lista completa
        let listW = items.results.length * 150;

        if((window.innerWidth - listW) > valor_scroll) {
            valor_scroll = (window.innerWidth - listW) - 60;
        }
        setScrollX(valor_scroll);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=> (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}