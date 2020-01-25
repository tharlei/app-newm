import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
	flex: 1;
	padding: 30px;
`;

export const Form = styled.View`
	padding-bottom: 20px;
	border-bottom-width: 1px;
	border-color: #eee;
`;

export const Row = styled.View`
	padding-bottom: 20px;
	width: 100%;
`;

export const Input = styled.TextInput.attrs({
	placeHolderTextColor: '#999',
})`
	height: 40px;
	background: #eee;
	border-radius: 4px;
	padding: 0 15px;
	border: 1px solid #eee;
`;

export const FormButtons = styled.View`
	flex-direction: row;
	padding: 20px 0 20px;
	width: 100%;
	justify-content: space-around;
	align-items: center;

`;

export const SubmitButton = styled(RectButton)`
	width: 70px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	padding: 0 12px;
	background: #17a2b8;
	opacity: ${props => (props.loading ? 0.7 : 1)}
`;

export const List = styled.FlatList`
	margin-top: 20px;
`;

export const Client = styled.View`
	align-items: center;
	margin: 0 20px 30px;
`;

export const Name = styled.Text`
	font-size: 14px;
	color: #333;
	font-weight: bold;
	margin-top: 4px;
	text-align: center;
`;

export const Email = styled.Text`
`;

export const Phone = styled.Text`
`;

export const Document = styled.Text`
`;

export const Note = styled.Text`
`;

export const EditButton = styled(RectButton)`
	width: 80px;
	height: 40px;
	border-radius: 4px;
	padding: 0 12px;
	background: #6c757d;
`;

export const DeleteButton = styled(RectButton)`
	width: 80px;
	height: 40px;
	border-radius: 4px;
	padding: 0 12px;
	background: #dc3545;
`;