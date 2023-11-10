import React from 'react';
import styles from './SearchBar.module.sass';
import {MagnifyingGlass} from "@phosphor-icons/react";
import {withTranslation} from "react-i18next";

interface SearchBarProps {
    t: any;
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

    tabletteId = sessionStorage.getItem('clientId');

    render = () => <>
        <section className={styles.Heading}>
            <section className={styles.SearchBar}>
                <input type="text" onInput={this.search}/>
                <MagnifyingGlass/>
            </section>
            <section className={styles.TabletteData}>
                {this.props.t('ordering.tabletteData', {number: this.tabletteId})}
            </section>
        </section>
    </>;
}

export default withTranslation()(SearchBar);
