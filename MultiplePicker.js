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
        return (
            <View style={{flex: 1}}>
                <View>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => this.onOpen()}>
                        <View style={styles.button}>
                            <Text>{`Selected ${count}`}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.dropdown, open ? {} : {opacity:0}]}>
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
                        <TouchableOpacity
                            activeOpacity={.75}
                            onPress={() => this.onOpen()}
                            >
                            <View style={[styles.buttonClose, count > 0 ? {backgroundColor: 'green'}: {}]}>
                                <Text style={styles.buttonCloseText}>
                                    {count > 0 ? 'Select' : 'Close'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#fff',
        position: 'absolute',
        top: 50,
        zIndex: 3,
       // opacity: 1,
    },
    title: {
        padding: 15,
        flexGrow: 1,
    },
    buttonClose: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: 50,
        backgroundColor:'red'
    },
    buttonCloseText: {
        color: '#fff',
    }
});
