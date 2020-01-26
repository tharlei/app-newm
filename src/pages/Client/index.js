import React, { useState, useEffect } from 'react';
import { Keyboard , ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';

import { 
	Container, SubmitButton, Form, Input, Row, FormButtons, InputArea, InputMask
} from './styles';

export default function Client({ navigation }) {

	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [document, setDocument] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [phone, setPhone] = useState('');
	const [note, setNote] = useState('');

	useEffect(() => {
		try {
			const { client } = navigation.state.params;
			setId(client.id);
			setName(client.name);
			setEmail(client.email);
			setDocument(client.document);
			setNote(client.note);
			setPhone(client.phone);
			setBirthday(client.birthday);
			setZipcode(client.zipcode);
		}
		catch (e) {
		}
	}, [navigation]);

	/**
	 * FUNÇÃO PARA SALVAR OS DADOS NO FORMULÁRIO DO CLIENTE
	 */

	async function submit() {
		Keyboard.dismiss();
		setLoading(true);

		const client = {
			id: id ? id : new Date().getTime(),
			name: name,
			document: document,
			email: email,
			zipcode: zipcode,
			birthday: birthday,
			phone: phone,
			note: note
		}

		const res = verifyInputs(client);
		if (!res.status) {
			Alert.alert(res.title, res.message)
			setLoading(false);
			return;
		}

		let clients = await AsyncStorage.getItem('clients');
		clients = JSON.parse(clients);

		if (id) clients = clients.filter(client => client.id !== id);

		await AsyncStorage.setItem('clients', JSON.stringify([...clients, client]));

		if (!id) return navigation.goBack();

		Alert.alert('Cliente atualizado', `O cliente ${client.name} foi editado com sucesso.`)

		setLoading(false);
	}

	function verifyInputs(client) {
		let response = { status: true };

		let translate = {
			name: 'nome',
			document: 'CPF',
			zipcode: 'CEP',
			birthday: 'data de nascimento',
			email: 'e-mail',
			phone: 'telefone'
		}

		Object.keys(client).forEach(key => {
			if (!client[key] && !['id', 'note'].includes(key) && response.status) {
				response = {
					title: 'Campo vazio',
					message: `Obrigatório ${translate[key]}.`,
					status: false
				}
			}

			if (key == 'document' && !validCpf(client['document']) && response.status) {
				response = {
					title: 'CPF inválido',
					message: `Por favor digite numero de CPF válido.`,
					status: false
				}
			}
		});

		return response;
	}

	function validCpf(cpf) {
		cpf = cpf.replace(/[^\d]+/g,'');	

		let groupInvalidDocument = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"]

		if (cpf.length != 11 || groupInvalidDocument.includes(cpf)) return false;

		let add = 0;	
		for (i=0; i < 9; i ++) add += parseInt(cpf.charAt(i)) * (10 - i);	

		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11) rev = 0;	
		if (rev != parseInt(cpf.charAt(9))) return false;	

		add = 0;	
		for (i = 0; i < 10; i ++) add += parseInt(cpf.charAt(i)) * (11 - i);

		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)	rev = 0;	
		if (rev != parseInt(cpf.charAt(10))) return false;		
		
		return true;   
	}

	return (
		<Container>
			<Form>
				<Row>
					<Input 
						autoCorrect={ false }
						placeholder="Nome"
						value={ name }
						onChangeText={(text) => setName(text.replace(/[^a-zA-Z\u00C0-\u00FF ]/g, ''))}
					/>
				</Row>
				<Row>
					<InputMask 
						placeholder="CPF"
						type={'cpf'}
						value={ document }
						onChangeText={(text) => setDocument(text)}
					/>
				</Row>
				<Row>
					<Input 
						autoCorrect={ false }
						autoCapitalize="none"
						placeholder="E-mail"
						value={ email }
						onChangeText={(text) => setEmail(text)}
					/>
				</Row>
				<Row>
					<InputMask 
						type={'zip-code'}
						placeholder="CEP"
						value={ zipcode }
						onChangeText={(text) => setZipcode(text)}
					/>
				</Row>
				<Row>
					<InputMask 
						type={'datetime'}
						options={{
						  format: 'DD/MM/YYYY'
						}}
						placeholder="Data de nascimento"
						value={ birthday }
						onChangeText={(text) => setBirthday(text)}
					/>
				</Row>
				<Row>
					<InputMask 
						placeholder="Telefone"
						type={'cel-phone'}
						options={{
							maskType: 'BRL',
							withDDD: true,
							dddMask: '(99) '
						}}
						value={ phone }
						onChangeText={(text) => setPhone(text)}
					/>
				</Row>
				<Row>
					<InputArea 
						autoCorrect={ false }
						multiline={ true }
						numberOfLines ={ 4 }
						maxLength={ 300 }
						placeholder="Observações"
						value={ note }
						onChangeText={(text) => setNote(text)}
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

Client.navigationOptions = {
	title: "Manipulando cliente"
}