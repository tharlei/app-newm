import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.ScrollView`
	flex: 1;
	padding: 30px;
`;

export const Form = styled.View`
	padding-bottom: 20px;
	border-bottom-width: 1px;
	border-color: #eee;
	overflow: scroll;
	height: 100%;
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

export const InputMask = styled(TextInputMask).attrs({
	placeHolderTextColor: '#999',
})`
	height: 40px;
	background: #eee;
	border-radius: 4px;
	padding: 0 15px;
	border: 1px solid #eee;
`;

export const InputArea = styled.TextInput.attrs({
	placeHolderTextColor: '#999',
})`
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