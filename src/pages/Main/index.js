import React, { useState, useEffect } from 'react';
import { Keyboard , ActivityIndicator, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';

import { 
	Container, List, Client, EditButton, DeleteButton, Name, Badge, ClientButtons,
	SmallInfo, Note, SubmitButton, Input, Form, Info, Row, ContainerList
} from './styles';

function Main({ isFocused, navigation }) {

	const [loading, setLoading] = useState(false);
	const [clients, setClients] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (isFocused) readClients();
	}, [isFocused]);

	/**
	 * FUNÇÃO QUE EXCLUSIVAMENTE ATUALIZA INFORMAÇÕES DA LISTA
	 * SALVANDO NO ESTADO PERMANENTE PARA BUSCA E PARA EXIBIÇÃO PAGINADA
	 */
	async function readClients() {
		if (!loading) setLoading(true);
		let storage = await AsyncStorage.getItem('clients');
		if (storage) {
			storage = JSON.parse(storage);
			setClients(storage);
		}
		setLoading(false);
		return storage;
	}

	/**
	 * FUNÇÃO EXECUTADA TODA VEZ QUE DIGITA ALGO NO CAMPO DE BUSCA
	 * E REALIZA FILTRAGEM PELO NOME E EMAIL DA LISTA COM TEXTO DIGITADO
	 */
	async function handleSearch(text) {
		setSearch(text);
		let filtersClients = await readClients();
		setLoading(true);
		if (text && filtersClients.length) {
			filtersClients = filtersClients.filter(client =>
				client.name.toLowerCase().includes(text.toLowerCase()) 
				|| client.email.toLowerCase().includes(text.toLowerCase())
			);
		}
		setClients(filtersClients);
		setLoading(false)
	}

	/**
	 * FUNÇÃO PARA CRIAR CARREGAMENTO DINAMICO DA LISTA DE CLIENTES
	 */
	async function remove(id) {
		let clients = await readClients();
		setLoading(true)
		clients = clients.filter(client => client.id !== id);
		await AsyncStorage.setItem('clients', JSON.stringify(clients));
		setClients(clients);
		setLoading(false)
	}

	/**
	 * FUNÇÃO PARA CRIAR CARREGAMENTO DINAMICO DA LISTA DE CLIENTES
	 */
	function moreItems() {
		const perPage = 10;
		const start = page * perPage;
		setPage(page+1);
		const end = page * perPage - 1;
	
		const newList = clients.slice(start, end);
		setClients([...clients, ...newList]);
	}

	/**
	 * Função para exibir alerta de confirmação para exclusão do registro.
	 */
	function confirmRemove(client) {
		Alert.alert(
			`Excluir cliente`,
			`Deseja realmente excluir ${client.name}?`,
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{text: 'OK', onPress: () => remove(client.id)},
			],
			{cancelable: false},
		);
	}

  return (
	<>
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
				loading && 
					<ActivityIndicator size={80} color="#222" />
			}
			{
				(clients.length == 0 && !loading) && 
					<Badge>
						Nenhum cliente { search ? 'encontrado' : 'adicionado' }... 
					</Badge>
			}
		</Container>
		<ContainerList>
		{
			(clients.length > 0 && !loading) && 
				<List 
					data={clients}
					keyExtractor={client => client.id}
					onEndReached={moreItems}
					renderItem= {({ item }) => (
						<Client>
							<Row>
								<Name>{item.name}</Name>
							</Row>
							<Row>
								<Info>
									<SmallInfo>CPF: {item.document}</SmallInfo>
									<SmallInfo>CEP: {item.zipcode}</SmallInfo>
									<SmallInfo>Aniversário: {item.birthday}</SmallInfo>
									<SmallInfo>{item.email}</SmallInfo>
									<SmallInfo>{item.phone}</SmallInfo>
									<Note>{item.note || 'Nenhuma observação inserida...' }</Note>
								</Info>
								<ClientButtons>
									<EditButton onPress={() => {
										navigation.navigate('Client', { client: item });
									}}>
										<Icon name="edit" size={20} color="#fff"/>
									</EditButton>
									<DeleteButton onPress={() => confirmRemove(item)}>
										<Icon name="remove-circle" size={20} color="#fff"/>
									</DeleteButton>
								</ClientButtons>
							</Row>
						</Client>
					)}
				/>
		}
		</ContainerList>
	</>
  );
};

Main.navigationOptions = {
	title: "Clientes",
}

export default withNavigationFocus(Main);