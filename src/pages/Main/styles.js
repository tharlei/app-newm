import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
	padding: 30px 30px 15px 30px;
`;

export const Form = styled.View`
	flex-direction: row;
	border-bottom-width: 1px;
	border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
	placeHolderTextColor: '#999',
})`
	flex: 1;
	height: 40px;
	background: #eee;
	border-radius: 4px;
	padding: 0 15px;
	border: 1px solid #eee;
	margin-right: 12px;
`;

export const SubmitButton = styled(RectButton)`
	width: 70px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	padding: 0 12px;
	background: #28a745;
	opacity: ${props => (props.loading ? 0.7 : 1)}
`;

export const Name = styled.Text`
	font-size: 14px;
	color: #333;
	font-weight: bold;
	text-align: center;
`;

export const SmallInfo = styled.Text`
	font-size: 12px;
`;

export const Note = styled.Text`
	font-size: 11px;
	margin-top: 10px;
	text-align: justify;
`;

export const EditButton = styled(RectButton)`
	border-radius: 4px;
	padding: 10px;
	background: #6c757d;
`;

export const DeleteButton = styled(RectButton)`
	padding: 10px;
	border-radius: 4px;
	background: #dc3545;
`;

export const Badge = styled.Text`
	margin-top: 30px;
	padding: 5%;
	border-radius: 4px;
	background: #ffc107;
	color: #fff;
`;

export const ContainerList = styled.View`
`;

export const List = styled.FlatList`
	margin: 0 0 15% 0;
`;

export const Client = styled.View`
	padding: 30px;
	border: 1px solid #eee;
`;

export const Row = styled.View`
	flex-direction: row;
`;

export const Info = styled.View`
	width: 80%;
	min-height: 100px;
	max-width: 80%;
`;

export const ClientButtons = styled.View`
	max-width: 20%;
	justify-content: space-around;
	margin-left: 20px;
`;