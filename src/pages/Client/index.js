import React, { useState, useEffect } from 'react';
import { Keyboard , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';

import { 
	Container, SubmitButton, Form, Input, Row, FormButtons
} from './styles';

Client.navigationOptions = {
	title: ""
}

export default function Client(props) {

	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [document, setDocument] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [note, setNote] = useState('');

	useEffect(() => {
		let title = '';
		try {
			const { client } = props.navigation.state.params;
			title = "Editar cliente";
			setId(client.id);
			setName(client.name);
			setEmail(client.email);
			setDocument(client.document);
			setNote(client.note);
			setPhone(client.phone);
		}
		catch (e) {
			title = "Adicionar cliente";
		}

		Client.navigationOptions = {
			title: title
		}
	}, [props]);

	async function submit() {
		Keyboard.dismiss();
		setLoading(true);

		const client = {
			id: id ? id : new Date().getTime(),
			name: name,
			document: document,
			email: email,
			phone: phone,
			note: note
		}

		let clients = await AsyncStorage.getItem('clients');
		clients = JSON.parse(clients);
		if (id) {
			clients = clients.filter(client => client.id !== id);
		}

		await AsyncStorage.setItem('clients', JSON.stringify([...clients, client]));

		setLoading(false)
	}

	return (
		<Container>
			<Form>
				<Row>
					<Input 
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Nome"
						value={ name }
						onChangeText={(text) => setName(text)}
					/>
				</Row>
				<Row>
					<Input 
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="CPF"
					value={ document }
					onChangeText={(text) => setDocument(text)}
					/>
				</Row>
				<Row>
					<Input 
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="E-mail"
					value={ email }
					onChangeText={(text) => setEmail(text)}
					/>
				</Row>
				<Row>
					<Input 
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Telefone"
						value={ phone }
						onChangeText={(text) => setPhone(text)}
						returnKeyType="send"
						onSubmitEditing={submit}
					/>
				</Row>
				<FormButtons>
					<SubmitButton loading={loading} onPress={submit}>
						{
						loading ? <ActivityIndicator color="#fff" /> 
							: <Icon name="check" size={20} color="#fff"/>
						}
					</SubmitButton>
				</FormButtons>
			</Form>
		</Container>
	);
};