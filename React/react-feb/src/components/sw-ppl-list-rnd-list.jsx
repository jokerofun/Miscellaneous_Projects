import React from 'react';
import RandomList from './components/random-list';
import StarWarsPeopleList from './components/star-wars-people-list';

class StarWarsPeopleListAndRandomList extends React.Component {
    state = {
        randomList: [
            1,
            2,
            3,
            4
        ],
        page: 1,
    };
    
    setNextPage = () => {
        this.setState((prevState)=> ({
            page: prevState.page + 1,
        }));
    }
    
        render() {
        const {randomList, page} = this.state;
    
            return (
                <React.Fragment>
                    <button onClick={this.setNextPage}>Load next page</button>
                    <StarWarsPeopleList page={page} />
                    {/* <RandomList randomList={randomList} /> */}
                </React.Fragment>
            );
        }
    
        componentDidMount(){
            // this.setState((prevState) => ({
            //     randomList: [...prevState.randomList, 5]
            // }));
        }
    }
    export default StarWarsPeopleListAndRandomList;