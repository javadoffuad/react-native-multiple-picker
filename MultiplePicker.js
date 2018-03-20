import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class MultiplePicker extends Component {
    state = {
        open: false,
        data: this.props.data || [],
        count: 0,
    };

    onOpen() {
        this.setState({
            open: !this.state.open
        });
    }

    onSelect(item) {
        const newState = Object.assign([], this.state.data);
        let {count} = this.state;
        let {onChange} = this.props;

        const index = newState.findIndex(menu => menu.id === item.id)

        newState.splice(index, 1, {
            ...item,
            selected: item.selected ? false : true,
        });

        this.setState({
            data: newState,
            count: item.selected ? count - 1 : count + 1,
        }, () => onChange && onChange(this.getActiveItems()));
    }

    getActiveItems() {
        return  this.state.data.filter(item =>
                    item.selected === true
                ).map(item => item.id);
    }

    render() {
        const {open, data, count} = this.state;

        console.warn('------', open)

        return (
            <View>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => this.onOpen()}>
                    <View style={styles.button}>
                        <Text>{`Selected ${count}`}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.dropdown, open ? {} : {display:'none'}]}>
                    {
                        data.map((item, index) =>
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.7}
                                onPress={() => this.onSelect(item)}>
                                <Text style={[styles.title, item.selected ? {color:'red'} : {}]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
       // backgroundColor:'red',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
        //paddingHorizontal: vertical(15)
    },
    dropdown: {
        width: '100%',
        backgroundColor: 'blue',
        position: 'absolute',
        top: 50,
        zIndex: 3,
    },
    title: {
        padding: 15
    }
});
