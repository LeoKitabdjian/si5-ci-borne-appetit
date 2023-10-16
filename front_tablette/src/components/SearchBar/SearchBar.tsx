import React from 'react';
import styles from './SearchBar.module.sass';

interface SearchBarProps {
    updateSearch: (key: string) => void;
}

interface SearchBarState {
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props: SearchBarProps) {
        super(props);
        this.state = {};
    }

    search = (event: any) => {
        let searchValue = event.target.value
        this.props.updateSearch(searchValue)
    }

    render = () => <>
        <section className={styles.SearchBar}>
            <input type="text" onInput={this.search}/>
            <img src="/images/search.svg" alt=""/>
        </section>
        <div className={styles.Keyboard}>
            Ceci est un clavier
        </div>
    </>;
}

export default SearchBar;
