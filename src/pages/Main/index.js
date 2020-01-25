import React, { useState, useEffect } from 'react';
import { Keyboard , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';

import { 
	Container, List, Client, EditButton, DeleteButton, Name, 
	Document, Phone, Note, Email, SubmitButton, Input, Form
} from './styles';

export default function Main({ navigation }) {

	const [loading, setLoading] = useState(false);
	const [clients, setClients] = useState([]);
	const [search, setSearch] = useState([]);

	useEffect(() => {
		readClients();
	}, []);

	async function readClients() {
		const storage = await AsyncStorage.getItem('clients');
		if (storage) {
			let storageClients = JSON.parse(storage);
			setClients(storageClients);
			return storageClients;
		}
	}

	async function handleSearch(text) {
		setLoading(true)
		setSearch(text);
		let clients = await readClients();
		if (text) {
			clients = clients.filter(client =>
				client.name.toLowerCase().includes(text.toLowerCase())
			);
		}
		setClients(clients);
		setLoading(false)
	}

	async function remove(id) {
		setLoading(true)
		let clients = await readClients();
		console.tron.log(clients);
		clients = clients.filter(client => client.id !== id);
		await AsyncStorage.setItem('clients', JSON.stringify(clients));
		await readClients();
		setLoading(false)
	}

  return (
	<Container>
		<Form>
			<Input 
				autoCorrect={false}
				autoCapitalize="none"
				placeholder="Procurar cliente..."
				value={ search }
				onChangeText={(text) => handleSearch(text)}
			/>
			<SubmitButton onPress={() => {
				navigation.navigate('Client');
			}}>
				<Icon name="add" size={20} color="#fff"/>
			</SubmitButton>
		</Form>
		{
			loading ? <ActivityIndicator size={80} color="#222" /> 
			 : (
				<List 
					data={clients}
					keyExtractor={client => client.email}
					renderItem= {({ item }) => (
						<Client>
							<Name>{item.name}</Name>
							<Document>CPF: {item.document}</Document>
							<Email>{item.email}</Email>
							<Phone>{item.phone}</Phone>
							<Note>{item.Note}</Note>
							<EditButton onPress={() => {
								navigation.navigate('Client', { client: item });
							}}>
								<Icon name="edit" size={20} color="#fff"/>
							</EditButton>
							<DeleteButton onPress={() => remove(item.id)}>
								<Icon name="remove-circle" size={20} color="#fff"/>
							</DeleteButton>
						</Client>
					)}
				/>
			 )
		}
	</Container>
  );
};

Main.navigationOptions = {
	title: "Clientes",
}