import { type ChurchData } from '@/app/church/interfaces';
import { icupApi } from '@/lib/axios';


// TODO : primero se debe trabajar en el login 
export const createChurch = async (formData:ChurchData ): Promise<any> => {
  try {
    const {data} = await icupApi.post('/churches', formData)
    console.log(data);
    
  } catch (error) {
    console.log(error);
    
  }
  
}