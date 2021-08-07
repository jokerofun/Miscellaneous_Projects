class List extends Component {
    state = {
        shoppingProducts: [
            {id: 'some-id-for-apple', value: 'apple'},
            {id: 'tomato-id', value: 'tomato'},
            {id: 'greg', value: 'orange'}
        ]
    }

    render() {
        const {shoppingProducts} = this.state;

        return (
            <ul>
                {
                 shoppingProducts.map(product => (
                    <li key={product.id}>
                        {product}
                    </li>
                    ))
                }
            </ul>
        );
    }
}