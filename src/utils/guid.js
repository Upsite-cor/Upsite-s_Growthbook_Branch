import 'react-native-get-random-values'
import { v4 } from 'uuid';

const generateId = () =>{
    return v4();
}

export {generateId}